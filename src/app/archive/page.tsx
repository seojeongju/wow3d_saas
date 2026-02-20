"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Upload, FileText, Download, Trash2, Search, Loader2, File, Image, Video, Archive, Code, Music, AlertCircle, RefreshCw, X, CheckCircle } from "lucide-react";
import styles from "./archive.module.css";

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

function getFileIcon(contentType: string) {
    if (contentType?.startsWith("image/")) return <Image className={styles.fileIconSvg} />;
    if (contentType?.startsWith("video/")) return <Video className={styles.fileIconSvg} />;
    if (contentType?.startsWith("audio/")) return <Music className={styles.fileIconSvg} />;
    if (contentType?.includes("zip") || contentType?.includes("tar") || contentType?.includes("rar")) return <Archive className={styles.fileIconSvg} />;
    if (contentType?.includes("pdf") || contentType?.includes("word") || contentType?.includes("text")) return <FileText className={styles.fileIconSvg} />;
    if (contentType?.includes("json") || contentType?.includes("javascript") || contentType?.includes("html")) return <Code className={styles.fileIconSvg} />;
    return <File className={styles.fileIconSvg} />;
}

function getFileCategory(contentType: string): string {
    if (contentType?.startsWith("image/")) return "이미지";
    if (contentType?.startsWith("video/")) return "동영상";
    if (contentType?.startsWith("audio/")) return "오디오";
    if (contentType?.includes("zip") || contentType?.includes("tar") || contentType?.includes("rar")) return "압축파일";
    if (contentType?.includes("pdf")) return "PDF";
    if (contentType?.includes("word") || contentType?.includes("document")) return "문서";
    if (contentType?.includes("spreadsheet") || contentType?.includes("excel")) return "스프레드시트";
    if (contentType?.includes("text")) return "텍스트";
    if (contentType?.includes("json") || contentType?.includes("javascript") || contentType?.includes("html")) return "코드";
    return "파일";
}

function formatSize(bytes: number): string {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatDate(dateStr: string): string {
    try {
        return new Date(dateStr).toLocaleDateString("ko-KR", {
            year: "numeric", month: "2-digit", day: "2-digit"
        });
    } catch {
        return "-";
    }
}

export default function ArchivePage() {
    const [files, setFiles] = useState<ArchiveFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const addNotification = useCallback((type: NotificationType, message: string) => {
        const id = crypto.randomUUID();
        setNotifications(prev => [...prev, { id, type, message }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    }, []);

    const fetchFiles = useCallback(async () => {
        try {
            setLoading(true);
            setApiError(null);
            const res = await fetch("/api/archive");
            if (!res.ok) {
                const text = await res.text();
                throw new Error(`서버 오류 (${res.status}): ${text.slice(0, 100)}`);
            }
            const data = await res.json();
            setFiles(Array.isArray(data) ? data : []);
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "알 수 없는 오류";
            setApiError(msg);
            addNotification("error", `파일 목록을 불러오지 못했습니다: ${msg}`);
        } finally {
            setLoading(false);
        }
    }, [addNotification]);

    useEffect(() => {
        fetchFiles();
    }, [fetchFiles]);

    const handleUpload = async (fileToUpload: File | null) => {
        if (!fileToUpload) return;
        if (fileToUpload.size > 50 * 1024 * 1024) {
            addNotification("error", "파일 크기는 50MB 이하여야 합니다.");
            return;
        }
        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", fileToUpload);
            const res = await fetch("/api/archive", { method: "POST", body: formData });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({ error: "업로드 실패" })) as { error?: string };
                throw new Error(errData.error || "업로드 실패");
            }
            addNotification("success", `"${fileToUpload.name}" 업로드 완료!`);
            await fetchFiles();
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "업로드 오류";
            addNotification("error", msg);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (file: ArchiveFile) => {
        if (!confirm(`"${file.filename}"을(를) 삭제하시겠습니까?`)) return;
        try {
            setDeletingId(file.id);
            const res = await fetch(`/api/archive?id=${file.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("삭제 실패");
            addNotification("success", `"${file.filename}" 삭제 완료`);
            setFiles(prev => prev.filter(f => f.id !== file.id));
        } catch {
            addNotification("error", "파일 삭제 중 오류가 발생했습니다.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); };
    const handleDragLeave = () => setIsDragOver(false);
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    };

    const filteredFiles = files.filter(f =>
        f.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.page}>
            {/* Notification Stack */}
            <div className={styles.notificationStack}>
                {notifications.map(n => (
                    <div key={n.id} className={`${styles.notification} ${styles[`notification_${n.type}`]}`}>
                        {n.type === "success" && <CheckCircle size={16} />}
                        {n.type === "error" && <AlertCircle size={16} />}
                        {n.type === "info" && <AlertCircle size={16} />}
                        <span>{n.message}</span>
                        <button className={styles.notifClose} onClick={() => setNotifications(p => p.filter(x => x.id !== n.id))}>
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.container}>
                {/* Page Header */}
                <header className={styles.pageHeader}>
                    <div className={styles.headerIcon}>
                        <Archive size={32} />
                    </div>
                    <div>
                        <h1 className={styles.pageTitle}>자료실 <span className={styles.pageTitleAccent}>게시판</span></h1>
                        <p className={styles.pageDesc}>사내 자료를 안전하게 보관하고 팀과 공유하세요.</p>
                    </div>
                    <div className={styles.headerStats}>
                        <div className={styles.statBadge}>
                            <span className={styles.statNum}>{files.length}</span>
                            <span className={styles.statLabel}>전체 파일</span>
                        </div>
                    </div>
                </header>

                {/* API Error Banner */}
                {apiError && (
                    <div className={styles.errorBanner}>
                        <AlertCircle size={18} />
                        <span>API 연결 오류: {apiError}</span>
                        <button className={styles.retryBtn} onClick={fetchFiles}>
                            <RefreshCw size={14} /> 재시도
                        </button>
                    </div>
                )}

                {/* Control Bar */}
                <div className={styles.controlBar}>
                    <div className={styles.searchWrap}>
                        <Search className={styles.searchIcon} size={18} />
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="파일명으로 검색..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className={styles.searchClear} onClick={() => setSearchQuery("")}>
                                <X size={14} />
                            </button>
                        )}
                    </div>
                    <div className={styles.controlActions}>
                        <button className={styles.refreshBtn} onClick={fetchFiles} disabled={loading} title="새로고침">
                            <RefreshCw size={16} className={loading ? styles.spin : ""} />
                        </button>
                        <label className={`${styles.uploadBtn} ${uploading ? styles.uploadBtnLoading : ""}`}>
                            <input
                                ref={fileInputRef}
                                type="file"
                                className={styles.fileInput}
                                onChange={e => handleUpload(e.target.files?.[0] || null)}
                                disabled={uploading}
                            />
                            {uploading ? <Loader2 size={18} className={styles.spin} /> : <Upload size={18} />}
                            {uploading ? "업로드 중..." : "파일 업로드"}
                        </label>
                    </div>
                </div>

                {/* Drag & Drop Zone */}
                <div
                    className={`${styles.dropZone} ${isDragOver ? styles.dropZoneActive : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Upload size={20} />
                    <span>파일을 여기에 드래그하여 업로드</span>
                </div>

                {/* File Table */}
                <div className={styles.tableCard}>
                    {loading ? (
                        <div className={styles.loadingWrap}>
                            <Loader2 size={36} className={styles.spin} />
                            <p>파일 목록을 불러오는 중...</p>
                        </div>
                    ) : filteredFiles.length > 0 ? (
                        <table className={styles.fileTable}>
                            <thead>
                                <tr>
                                    <th className={styles.thFile}>파일명</th>
                                    <th className={styles.thType}>유형</th>
                                    <th className={styles.thSize}>크기</th>
                                    <th className={styles.thDate}>등록일</th>
                                    <th className={styles.thAction}>작업</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFiles.map(file => (
                                    <tr key={file.id} className={styles.fileRow}>
                                        <td className={styles.tdFile}>
                                            <div className={styles.fileInfo}>
                                                <div className={styles.fileIconWrap}>
                                                    {getFileIcon(file.content_type)}
                                                </div>
                                                <span className={styles.fileName} title={file.filename}>
                                                    {file.filename}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={styles.tdType}>
                                            <span className={styles.typeTag}>{getFileCategory(file.content_type)}</span>
                                        </td>
                                        <td className={styles.tdSize}>{formatSize(file.size)}</td>
                                        <td className={styles.tdDate}>{formatDate(file.created_at)}</td>
                                        <td className={styles.tdAction}>
                                            <a
                                                href={`/api/archive/download?id=${file.id}`}
                                                className={styles.actionBtn}
                                                title="다운로드"
                                                download
                                            >
                                                <Download size={16} />
                                            </a>
                                            <button
                                                className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                                                onClick={() => handleDelete(file)}
                                                disabled={deletingId === file.id}
                                                title="삭제"
                                            >
                                                {deletingId === file.id
                                                    ? <Loader2 size={16} className={styles.spin} />
                                                    : <Trash2 size={16} />
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}><File size={40} /></div>
                            <h3 className={styles.emptyTitle}>
                                {searchQuery ? "검색 결과가 없습니다" : "등록된 파일이 없습니다"}
                            </h3>
                            <p className={styles.emptyDesc}>
                                {searchQuery
                                    ? `"${searchQuery}"에 해당하는 파일을 찾을 수 없습니다.`
                                    : "상단의 파일 업로드 버튼으로 첫 번째 파일을 등록해보세요."}
                            </p>
                            {searchQuery && (
                                <button className={styles.emptyClearBtn} onClick={() => setSearchQuery("")}>
                                    검색어 지우기
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className={styles.footerInfo}>
                    <span>최대 파일 크기: 50MB</span>
                    <span>•</span>
                    <span>Cloudflare R2로 안전하게 저장됩니다</span>
                    {filteredFiles.length > 0 && searchQuery && (
                        <>
                            <span>•</span>
                            <span>{filteredFiles.length}개 파일 검색됨</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
