"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FileItem } from "@/types";
import { getUserById } from "@/data";
import { formatRelativeTime } from "@/lib/format";
import { FileText, Image, File, Code, MoreHorizontal } from "lucide-react";

interface FileRowProps {
  file: FileItem;
  className?: string;
}

export function FileRow({ file, className }: FileRowProps) {
  const uploader = getUserById(file.uploadedBy);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-danger" />;
      case "figma":
        return <Image className="h-4 w-4 text-accent" />;
      case "markdown":
        return <Code className="h-4 w-4 text-primary" />;
      case "yaml":
        return <Code className="h-4 w-4 text-success" />;
      default:
        return <File className="h-4 w-4 text-muted" />;
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors duration-100",
        "hover:bg-layer/50 active:bg-layer cursor-pointer group",
        className
      )}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-layer flex-shrink-0">
        {getFileIcon(file.type)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-body text-foreground truncate">{file.name}</p>
        <p className="text-caption text-muted">
          {file.size} · {uploader?.name || "Unknown"} · {formatRelativeTime(file.uploadedAt)}
        </p>
      </div>

      {/* Actions */}
      <button className="p-1.5 rounded-md text-muted opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-layer transition-all">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
