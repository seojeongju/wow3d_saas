"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Upload, FileText, Download, Trash2, Search, Loader2, File, ImageIcon,
    Video, Archive, X, Lock, LogOut, LayoutDashboard, Database, CloudUpload, CheckCircle2, AlertCircle
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

type UploadStatus = "pending" | "uploading" | "done" | "error";

interface UploadItem {
    id: string;
    file: File;
    progress: number;
    status: UploadStatus;
    error?: string;
}

const MAX_UPLOAD_BYTES = 100 * 1024 * 1024;
const AUTH_KEY = "wow_admin_auth";

async function parseApiError(res: Response, fallback: string): Promise<string> {
    try {
        const data = await res.json() as { error?: string };
        return data.error || fallback;
    } catch {
        return fallback;
    }
}

function uploadWithProgress(
    file: File,
    auth: string,
    onProgress: (pct: number) => void
): Promise<void> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", file);

        xhr.open("POST", "/api/archive");
        xhr.setRequestHeader("Authorization", `Bearer ${auth}`);

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                onProgress(Math.round((e.loaded / e.total) * 100));
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                onProgress(100);
                resolve();
                return;
            }
            try {
                const data = JSON.parse(xhr.responseText) as { error?: string };
                reject(new Error(data.error || `업로드 실패 (${xhr.status})`));
            } catch {
                reject(new Error(`업로드 실패 (${xhr.status})`));
            }
        };

        xhr.onerror = () => reject(new Error("네트워크 오류가 발생했습니다."));
        xhr.onabort = () => reject(new Error("업로드가 취소되었습니다."));
        xhr.send(formData);
    });
}

export default function AdminDashboardClient() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [files, setFiles] = useState<ArchiveFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploadQueue, setUploadQueue] = useState<UploadItem[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isUploading = uploadQueue.some((item) => item.status === "uploading" || item.status === "pending");

    useEffect(() => {
        const savedAuth = localStorage.getItem(AUTH_KEY);
        if (savedAuth) {
            setIsLoggedIn(true);
        }
    }, []);

    const addNotification = useCallback((type: NotificationType, message: string) => {
        const id = crypto.randomUUID();
        setNotifications((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 5000);
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(AUTH_KEY);
        setIsLoggedIn(false);
        setPassword("");
        setFiles([]);
        setUploadQueue([]);
    }, []);

    const fetchFiles = useCallback(async () => {
        const auth = localStorage.getItem(AUTH_KEY);
        if (!auth) return;

        try {
            setLoading(true);
            const res = await fetch("/api/archive", {
                headers: { Authorization: `Bearer ${auth}` },
            });
            if (res.status === 401) {
                handleLogout();
                throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
            }
            if (!res.ok) {
                throw new Error(await parseApiError(res, "파일 목록 조회 실패"));
            }
            const data = await res.json();
            setFiles(Array.isArray(data) ? data : []);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "파일 목록 조회 중 오류가 발생했습니다.";
            addNotification("error", message);
        } finally {
            setLoading(false);
        }
    }, [addNotification, handleLogout]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchFiles();
        }
    }, [isLoggedIn, fetchFiles]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setLoginLoading(true);

        try {
            const res = await fetch("/api/archive/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: password.trim() }),
            });

            if (!res.ok) {
                throw new Error(await parseApiError(res, "로그인에 실패했습니다."));
            }

            localStorage.setItem(AUTH_KEY, password.trim());
            setIsLoggedIn(true);
            addNotification("success", "관리자 로그인 성공");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.";
            setLoginError(message);
        } finally {
            setLoginLoading(false);
        }
    };

    const enqueueFiles = useCallback((fileList: FileList | File[]) => {
        const incoming = Array.from(fileList);
        if (incoming.length === 0) return;

        const auth = localStorage.getItem(AUTH_KEY);
        if (!auth) return;

        const valid: UploadItem[] = [];
        for (const file of incoming) {
            if (file.size > MAX_UPLOAD_BYTES) {
                addNotification("error", `"${file.name}" — 100MB 이하 파일만 업로드할 수 있습니다.`);
                continue;
            }
            if (file.size === 0) {
                addNotification("error", `"${file.name}" — 빈 파일은 업로드할 수 없습니다.`);
                continue;
            }
            valid.push({
                id: crypto.randomUUID(),
                file,
                progress: 0,
                status: "pending",
            });
        }

        if (valid.length === 0) return;

        setUploadQueue((prev) => [...prev, ...valid]);

        void (async () => {
            let successCount = 0;

            for (const item of valid) {
                setUploadQueue((prev) =>
                    prev.map((q) => (q.id === item.id ? { ...q, status: "uploading", progress: 0 } : q))
                );

                try {
                    await uploadWithProgress(item.file, auth, (pct) => {
                        setUploadQueue((prev) =>
                            prev.map((q) => (q.id === item.id ? { ...q, progress: pct } : q))
                        );
                    });

                    setUploadQueue((prev) =>
                        prev.map((q) => (q.id === item.id ? { ...q, status: "done", progress: 100 } : q))
                    );
                    successCount += 1;
                } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : "업로드 실패";
                    setUploadQueue((prev) =>
                        prev.map((q) => (q.id === item.id ? { ...q, status: "error", error: message } : q))
                    );
                    addNotification("error", `"${item.file.name}" — ${message}`);
                }
            }

            if (successCount > 0) {
                addNotification("success", `${successCount}개 파일 업로드 완료`);
                await fetchFiles();
            }

            setTimeout(() => {
                setUploadQueue((prev) => prev.filter((q) => q.status === "uploading" || q.status === "pending"));
            }, 4000);
        })();
    }, [addNotification, fetchFiles]);

    const handleDelete = async (file: ArchiveFile) => {
        const auth = localStorage.getItem(AUTH_KEY);
        if (!auth || !confirm(`"${file.filename}"을(를) 삭제하시겠습니까?`)) return;

        try {
            setDeletingId(file.id);
            const res = await fetch(`/api/archive?id=${file.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${auth}` },
            });

            if (res.status === 401) {
                handleLogout();
                throw new Error("인증 오류");
            }
            if (!res.ok) {
                throw new Error(await parseApiError(res, "삭제 실패"));
            }

            addNotification("success", `"${file.filename}" 삭제 완료`);
            setFiles((prev) => prev.filter((f) => f.id !== file.id));
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "삭제 중 오류가 발생했습니다.";
            addNotification("error", message);
        } finally {
            setDeletingId(null);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (isUploading) return;
        enqueueFiles(e.dataTransfer.files);
    };

    const getFileIcon = (contentType: string) => {
        if (contentType?.startsWith("image/")) return <ImageIcon size={18} />;
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

    const filteredFiles = files.filter((f) =>
        f.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!isLoggedIn) {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginCard}>
                    <div className={styles.loginIcon}><Lock size={32} /></div>
                    <h2>관리자 로그인</h2>
                    <p>자료실 관리를 위해 관리자 비밀번호를 입력해주세요.</p>
                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loginLoading}
                            required
                        />
                        {loginError && <p className={styles.loginError}>{loginError}</p>}
                        <button type="submit" disabled={loginLoading}>
                            {loginLoading ? <Loader2 className={styles.spin} size={18} /> : "로그인"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.adminPage}>
            <div className={styles.notificationStack}>
                {notifications.map((n) => (
                    <div key={n.id} className={`${styles.notification} ${styles[`notif_${n.type}`]}`}>
                        <span>{n.message}</span>
                        <button onClick={() => setNotifications((p) => p.filter((x) => x.id !== n.id))}><X size={14} /></button>
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

                    <div
                        className={`${styles.dropZone} ${isDragging ? styles.dropZoneActive : ""} ${isUploading ? styles.dropZoneDisabled : ""}`}
                        onDragOver={(e) => { e.preventDefault(); if (!isUploading) setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
                    >
                        <CloudUpload size={36} />
                        <p className={styles.dropTitle}>파일을 끌어다 놓거나 클릭하여 업로드</p>
                        <p className={styles.dropHint}>PDF, 문서, 이미지, 영상, ZIP 등 · 최대 100MB · 여러 파일 동시 업로드 가능</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className={styles.hiddenInput}
                            disabled={isUploading}
                            onChange={(e) => {
                                if (e.target.files) enqueueFiles(e.target.files);
                                e.target.value = "";
                            }}
                        />
                    </div>

                    {uploadQueue.length > 0 && (
                        <div className={styles.uploadQueue}>
                            {uploadQueue.map((item) => (
                                <div key={item.id} className={styles.uploadItem}>
                                    <div className={styles.uploadItemHeader}>
                                        <span className={styles.uploadFileName}>{item.file.name}</span>
                                        <span className={styles.uploadFileSize}>{formatSize(item.file.size)}</span>
                                        {item.status === "done" && <CheckCircle2 size={16} className={styles.uploadDoneIcon} />}
                                        {item.status === "error" && <AlertCircle size={16} className={styles.uploadErrorIcon} />}
                                        {item.status === "uploading" && <Loader2 size={16} className={styles.spin} />}
                                    </div>
                                    {(item.status === "uploading" || item.status === "done") && (
                                        <div className={styles.progressBar}>
                                            <div className={styles.progressFill} style={{ width: `${item.progress}%` }} />
                                        </div>
                                    )}
                                    {item.error && <p className={styles.uploadErrorText}>{item.error}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.controls}>
                        <div className={styles.search}>
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="파일명 검색..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className={styles.uploadBtn}
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? <Loader2 className={styles.spin} size={18} /> : <Upload size={18} />}
                            {isUploading ? "업로드 중..." : "파일 선택"}
                        </button>
                    </div>

                    <div className={styles.tableWrap}>
                        {loading ? (
                            <div className={styles.loading}><Loader2 className={styles.spin} /> 로딩 중...</div>
                        ) : filteredFiles.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Archive size={40} />
                                <p>등록된 파일이 없습니다.</p>
                                <span>위 영역에 파일을 드래그하여 업로드하세요.</span>
                            </div>
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
                                    {filteredFiles.map((file) => (
                                        <tr key={file.id}>
                                            <td className={styles.fileNameCell}>
                                                {getFileIcon(file.content_type)}
                                                <span title={file.filename}>{file.filename}</span>
                                            </td>
                                            <td>{formatSize(file.size)}</td>
                                            <td>{new Date(file.created_at).toLocaleDateString("ko-KR")}</td>
                                            <td className={styles.actions}>
                                                <a href={`/api/archive/download?id=${file.id}`} download className={styles.downloadLink} title="다운로드"><Download size={16} /></a>
                                                <button
                                                    onClick={() => handleDelete(file)}
                                                    className={styles.deleteBtn}
                                                    disabled={deletingId === file.id}
                                                    title="삭제"
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
