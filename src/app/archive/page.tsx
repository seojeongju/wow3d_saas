"use client";

import React, { useState, useEffect } from "react";
import { Upload, File, Download, Trash2, Search, Loader2 } from "lucide-react";

interface ArchiveFile {
    id: string;
    filename: string;
    content_type: string;
    size: number;
    created_at: string;
}

export default function ArchivePage() {
    const [files, setFiles] = useState<ArchiveFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/archive");
            if (res.ok) {
                const data = await res.json();
                setFiles(data);
            }
        } catch (error) {
            console.error("Failed to fetch files:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/archive", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                await fetchFiles();
            } else {
                alert("업로드 실패");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("업로드 중 오류가 발생했습니다.");
        } finally {
            setUploading(false);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const filteredFiles = files.filter((file) =>
        file.filename.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 selection:bg-purple-500/30">
            <div className="max-w-6xl mx-auto space-y-12 pt-20">
                {/* Header Section */}
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        디지털 자료실
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Cloudflare D1 & R2 기반의 안전하고 빠른 파일 저장소입니다.
                    </p>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="파일 이름 검색..."
                            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <label className="relative group cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                        <div className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/20">
                            {uploading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Upload className="w-5 h-5" />
                            )}
                            {uploading ? "업로드 중..." : "파일 업로드"}
                        </div>
                    </label>
                </div>

                {/* File Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="h-48 bg-white/5 animate-pulse rounded-3xl border border-white/5" />
                        ))
                    ) : filteredFiles.length > 0 ? (
                        filteredFiles.map((file) => (
                            <div
                                key={file.id}
                                className="group relative p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
                                        <File className="w-8 h-8" />
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <a
                                            href={`/api/archive/download?id=${file.id}`}
                                            className="p-2 hover:bg-green-500/20 rounded-xl transition-colors text-green-400"
                                            title="다운로드"
                                        >
                                            <Download className="w-5 h-5" />
                                        </a>
                                        <button
                                            onClick={async () => {
                                                if (confirm("정말 삭제하시겠습니까?")) {
                                                    await fetch(`/api/archive?id=${file.id}`, { method: "DELETE" });
                                                    fetchFiles();
                                                }
                                            }}
                                            className="p-2 hover:bg-red-500/20 rounded-xl transition-colors text-red-400"
                                            title="삭제"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg truncate mb-1" title={file.filename}>
                                        {file.filename}
                                    </h3>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{formatSize(file.size)}</span>
                                        <span>{new Date(file.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="inline-block p-6 bg-white/5 rounded-full mb-4">
                                <File className="w-12 h-12 text-gray-600" />
                            </div>
                            <p className="text-gray-500 text-xl font-medium">검색 결과가 없거나 파일이 비어 있습니다.</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
        </div>
    );
}
