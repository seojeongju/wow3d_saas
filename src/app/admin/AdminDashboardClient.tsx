"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Upload, FileText, Download, Trash2, Search, Loader2, File, ImageIcon,
    Video, Archive, X, Lock, LogOut, LayoutDashboard, Database, CheckCircle2, AlertCircle
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
    displayName: string,
    auth: string,
    onProgress: (pct: number) => void
): Promise<void> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("display_name", displayName);
        formData.append("admin_token", auth);

        xhr.open("POST", "/api/archive");
        xhr.setRequestHeader("Authorization", `Bearer ${auth}`);
        xhr.setRequestHeader("X-Admin-Token", auth);

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
    const [sessionChecking, setSessionChecking] = useState(true);
    const [password, setPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [files, setFiles] = useState<ArchiveFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        setDisplayName("");
        setSelectedFile(null);
        setUploadError("");
    }, []);

    const validateSession = useCallback(async (token: string): Promise<boolean> => {
        const res = await fetch("/api/archive/auth", {
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Admin-Token": token,
            },
        });
        return res.ok;
    }, []);

    useEffect(() => {
        const savedAuth = localStorage.getItem(AUTH_KEY);
        if (!savedAuth) {
            setSessionChecking(false);
            return;
        }

        void validateSession(savedAuth).then((valid) => {
            if (valid) {
                setIsLoggedIn(true);
            } else {
                localStorage.removeItem(AUTH_KEY);
            }
            setSessionChecking(false);
        });
    }, [validateSession]);

    const fetchFiles = useCallback(async () => {
        const auth = localStorage.getItem(AUTH_KEY);
        if (!auth) return;

        try {
            setLoading(true);
            const res = await fetch("/api/archive");
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
    }, [addNotification]);

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
                localStorage.removeItem(AUTH_KEY);
                if (res.status === 503) {
                    throw new Error("서버 관리자 비밀번호가 설정되지 않았습니다. Cloudflare Pages 시크릿(ADMIN_PASSWORD)을 확인해주세요.");
                }
                throw new Error(await parseApiError(res, "로그인에 실패했습니다."));
            }

            const normalizedPassword = password.trim();
            localStorage.setItem(AUTH_KEY, normalizedPassword);
            setIsLoggedIn(true);
            addNotification("success", "관리자 로그인 성공");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "로그인 중 오류가 발생했습니다.";
            setLoginError(message);
        } finally {
            setLoginLoading(false);
        }
    };

    const handleFileSelect = (fileList: FileList | null) => {
        const file = fileList?.[0];
        if (!file) return;

        if (file.size > MAX_UPLOAD_BYTES) {
            addNotification("error", "100MB 이하 파일만 업로드할 수 있습니다.");
            return;
        }
        if (file.size === 0) {
            addNotification("error", "빈 파일은 업로드할 수 없습니다.");
            return;
        }

        setSelectedFile(file);
        setUploadError("");

        if (!displayName.trim()) {
            const nameWithoutExt = file.name.replace(/\.[^.]+$/, "");
            setDisplayName(nameWithoutExt);
        }
    };

    const handleUpload = async () => {
        const auth = localStorage.getItem(AUTH_KEY);
        const title = displayName.trim();

        if (!auth) {
            handleLogout();
            return;
        }
        if (!title) {
            setUploadError("자료명을 입력해주세요.");
            return;
        }
        if (!selectedFile) {
            setUploadError("업로드할 파일을 선택해주세요.");
            return;
        }

        const sessionValid = await validateSession(auth);
        if (!sessionValid) {
            handleLogout();
            addNotification("error", "세션이 만료되었습니다. 다시 로그인해주세요.");
            return;
        }

        try {
            setUploading(true);
            setUploadProgress(0);
            setUploadError("");

            await uploadWithProgress(selectedFile, title, auth, setUploadProgress);

            addNotification("success", `"${title}" 업로드 완료`);
            setDisplayName("");
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            await fetchFiles();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "업로드 중 오류가 발생했습니다.";
            setUploadError(message);
            addNotification("error", message);

            if (message.includes("인증")) {
                handleLogout();
            }
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (file: ArchiveFile) => {
        const auth = localStorage.getItem(AUTH_KEY);
        if (!auth || !confirm(`"${file.filename}"을(를) 삭제하시겠습니까?`)) return;

        try {
            setDeletingId(file.id);
            const res = await fetch(`/api/archive?id=${file.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${auth}`,
                    "X-Admin-Token": auth,
                },
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

    if (sessionChecking) {
        return (
            <div className={styles.loginPage}>
                <Loader2 className={styles.spin} size={32} />
            </div>
        );
    }

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

                    <section className={styles.uploadForm}>
                        <h2 className={styles.uploadFormTitle}>새 자료 등록</h2>
                        <div className={styles.uploadFormGrid}>
                            <label className={styles.field}>
                                <span className={styles.fieldLabel}>자료명 *</span>
                                <input
                                    type="text"
                                    placeholder="예: 헬퍼C플러스 조립영상(3차)"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    disabled={uploading}
                                />
                                <span className={styles.fieldHint}>자료실에 표시될 이름입니다. 확장자는 선택한 파일에서 자동 적용됩니다.</span>
                            </label>

                            <label className={styles.field}>
                                <span className={styles.fieldLabel}>파일 선택 *</span>
                                <div className={styles.filePickerRow}>
                                    <button
                                        type="button"
                                        className={styles.filePickerBtn}
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                    >
                                        <Upload size={16} />
                                        파일 찾기
                                    </button>
                                    <span className={styles.selectedFileName}>
                                        {selectedFile ? `${selectedFile.name} (${formatSize(selectedFile.size)})` : "선택된 파일 없음"}
                                    </span>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className={styles.hiddenInput}
                                    disabled={uploading}
                                    onChange={(e) => handleFileSelect(e.target.files)}
                                />
                            </label>
                        </div>

                        {uploading && (
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${uploadProgress}%` }} />
                            </div>
                        )}

                        {uploadError && <p className={styles.uploadErrorText}>{uploadError}</p>}

                        <button
                            type="button"
                            className={styles.submitUploadBtn}
                            onClick={handleUpload}
                            disabled={uploading || !displayName.trim() || !selectedFile}
                        >
                            {uploading ? <Loader2 className={styles.spin} size={18} /> : <CheckCircle2 size={18} />}
                            {uploading ? `업로드 중... ${uploadProgress}%` : "업로드"}
                        </button>
                    </section>

                    <div className={styles.controls}>
                        <div className={styles.search}>
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="자료명 검색..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.tableWrap}>
                        {loading ? (
                            <div className={styles.loading}><Loader2 className={styles.spin} /> 로딩 중...</div>
                        ) : filteredFiles.length === 0 ? (
                            <div className={styles.emptyState}>
                                <Archive size={40} />
                                <p>등록된 파일이 없습니다.</p>
                                <span>위 양식에서 자료명과 파일을 입력한 뒤 업로드하세요.</span>
                            </div>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>자료명</th>
                                        <th>용량</th>
                                        <th>등록일</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFiles.map((file) => (
                                        <tr key={file.id}>
                                            <td className={styles.fileNameCell} data-label="자료명">
                                                {getFileIcon(file.content_type)}
                                                <span title={file.filename}>{file.filename}</span>
                                            </td>
                                            <td data-label="용량">{formatSize(file.size)}</td>
                                            <td data-label="등록일">{new Date(file.created_at).toLocaleDateString("ko-KR")}</td>
                                            <td className={styles.actions} data-label="관리">
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
