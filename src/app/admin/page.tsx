"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
    Upload, FileText, Download, Trash2, Search, Loader2, File, Image, 
    Video, Archive, Code, Music, AlertCircle, RefreshCw, X, CheckCircle,
    Lock, LogOut, LayoutDashboard, Database
} from "lucide-react";
import styles from "./admin.module.css";

interface ArchiveFile {
    id: string;
    filename: string;
    content_type: string;
    size: number;
    created_at: string;
}

type NotificationType = "success" | "error" | "info";

interface Notification {
    id: string;
    type: NotificationType;
    message: string;
}

export default function AdminDashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [files, setFiles] = useState<ArchiveFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load session from localStorage
    useEffect(() => {
        const savedAuth = localStorage.getItem("wow_admin_auth");
        if (savedAuth) {
            setIsLoggedIn(true);
        }
    }, []);

    const addNotification = useCallback((type: NotificationType, message: string) => {
        const id = crypto.randomUUID();
        setNotifications((prev: Notification[]) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setNotifications((prev: Notification[]) => prev.filter((n: Notification) => n.id !== id));
        }, 4000);
    }, []);

    const fetchFiles = useCallback(async () => {
        const auth = localStorage.getItem("wow_admin_auth");
        if (!auth) return;

        try {
            setLoading(true);
            const res = await fetch("/api/archive", {
                headers: { 'Authorization': `Bearer ${auth}` }
            });
            if (res.status === 401) {
                handleLogout();
                throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
            }
            if (!res.ok) throw new Error("파일 목록 조회 실패");
            const data = await res.json();
            setFiles(Array.isArray(data) ? data : []);
        } catch (error: any) {
            addNotification("error", error.message);
        } finally {
            setLoading(false);
        }
    }, [addNotification]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchFiles();
        }
    }, [isLoggedIn, fetchFiles]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password) {
            localStorage.setItem("wow_admin_auth", password);
            setIsLoggedIn(true);
            addNotification("success", "관리자 로그인 성공");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("wow_admin_auth");
        setIsLoggedIn(false);
        setPassword("");
        setFiles([]);
    };

    const handleUpload = async (fileToUpload: File | null) => {
        const auth = localStorage.getItem("wow_admin_auth");
        if (!fileToUpload || !auth) return;

        if (fileToUpload.size > 50 * 1024 * 1024) {
            addNotification("error", "파일 크기는 50MB 이하여야 합니다.");
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", fileToUpload);
            const res = await fetch("/api/archive", { 
                method: "POST", 
                body: formData,
                headers: { 'Authorization': `Bearer ${auth}` }
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({ error: "업로드 실패" })) as { error?: string };
                throw new Error(errData.error || "업로드 실패");
            }

            addNotification("success", `"${fileToUpload.name}" 업로드 완료!`);
            await fetchFiles();
        } catch (error: any) {
            addNotification("error", error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (file: ArchiveFile) => {
        const auth = localStorage.getItem("wow_admin_auth");
        if (!auth || !confirm(`"${file.filename}"을(를) 삭제하시겠습니까?`)) return;

        try {
            setDeletingId(file.id);
            const res = await fetch(`/api/archive?id=${file.id}`, { 
                method: "DELETE",
                headers: { 'Authorization': `Bearer ${auth}` }
            });

            if (res.status === 401) {
                handleLogout();
                throw new Error("인증 오류");
            }
            if (!res.ok) throw new Error("삭제 실패");

            addNotification("success", `"${file.filename}" 삭제 완료`);
            setFiles((prev: ArchiveFile[]) => prev.filter((f: ArchiveFile) => f.id !== file.id));
        } catch (error: any) {
            addNotification("error", error.message);
        } finally {
            setDeletingId(null);
        }
    };

    // Helper functions for icons/formatting
    const getFileIcon = (contentType: string) => {
        if (contentType?.startsWith("image/")) return <Image size={18} />;
        if (contentType?.startsWith("video/")) return <Video size={18} />;
        if (contentType?.includes("zip") || contentType?.includes("tar")) return <Archive size={18} />;
        if (contentType?.includes("pdf") || contentType?.includes("word")) return <FileText size={18} />;
        return <File size={18} />;
    };

    const formatSize = (bytes: number) => {
        if (!bytes) return "0 B";
        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${(bytes / Math.pow(k, i)).toFixed(1)} ${["B", "KB", "MB", "GB"][i]}`;
    };

    if (!isLoggedIn) {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginCard}>
                    <div className={styles.loginIcon}><Lock size={32} /></div>
                    <h1>관리자 로그인</h1>
                    <p>자료실 관리를 위해 관리자 비밀번호를 입력해주세요.</p>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <input 
                            type="password" 
                            placeholder="비밀번호" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required 
                        />
                        <button type="submit">로그인</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminPage}>
            {/* Notification Stack */}
            <div className={styles.notificationStack}>
                {notifications.map(n => (
                    <div key={n.id} className={`${styles.notification} ${styles[`notif_${n.type}`]}`}>
                        <span>{n.message}</span>
                        <button onClick={() => setNotifications((p: Notification[]) => p.filter((x: Notification) => x.id !== n.id))}><X size={14} /></button>
                    </div>
                ))}
            </div>

            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <div className={styles.brand}>
                        <LayoutDashboard size={24} />
                        <span>Admin Console</span>
                    </div>
                    <nav className={styles.nav}>
                        <div className={`${styles.navItem} ${styles.active}`}><Database size={18} /> 자료실 관리</div>
                    </nav>
                    <button className={styles.logoutBtn} onClick={handleLogout}><LogOut size={18} /> 로그아웃</button>
                </aside>

                <main className={styles.main}>
                    <header className={styles.mainHeader}>
                        <h1>자료실 관리</h1>
                        <div className={styles.stats}>전체 파일: {files.length}</div>
                    </header>

                    <div className={styles.controls}>
                        <div className={styles.search}>
                            <Search size={18} />
                            <input 
                                type="text" 
                                placeholder="파일명 검색..." 
                                value={searchQuery}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <label className={styles.uploadBtn}>
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                onChange={e => handleUpload(e.target.files?.[0] || null)}
                                disabled={uploading}
                            />
                            {uploading ? <Loader2 className={styles.spin} size={18} /> : <Upload size={18} />}
                            {uploading ? "업로드 중..." : "새 파일 업로드"}
                        </label>
                    </div>

                    <div className={styles.tableWrap}>
                        {loading ? (
                            <div className={styles.loading}><Loader2 className={styles.spin} /> 로딩 중...</div>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>파일명</th>
                                        <th>용량</th>
                                        <th>등록일</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.filter(f => f.filename.toLowerCase().includes(searchQuery.toLowerCase())).map(file => (
                                        <tr key={file.id}>
                                            <td className={styles.fileNameCell}>
                                                {getFileIcon(file.content_type)}
                                                <span>{file.filename}</span>
                                            </td>
                                            <td>{formatSize(file.size)}</td>
                                            <td>{new Date(file.created_at).toLocaleDateString()}</td>
                                            <td className={styles.actions}>
                                                <a href={`/api/archive/download?id=${file.id}`} download className={styles.downloadLink}><Download size={16} /></a>
                                                <button 
                                                    onClick={() => handleDelete(file)}
                                                    className={styles.deleteBtn}
                                                    disabled={deletingId === file.id}
                                                >
                                                    {deletingId === file.id ? <Loader2 className={styles.spin} size={16} /> : <Trash2 size={16} />}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
