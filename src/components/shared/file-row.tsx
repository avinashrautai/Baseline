"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FileItem } from "@/types";
import { getUserById } from "@/data";
import { formatRelativeTime } from "@/lib/format";
import { FileText, Image, File, Code } from "lucide-react";

interface FileRowProps {
  file: FileItem;
  className?: string;
}

export function FileRow({ file, className }: FileRowProps) {
  const uploader = getUserById(file.uploadedBy);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4 text-danger/70" />;
      case "figma":
        return <Image className="h-4 w-4 text-accent/70" />;
      case "markdown":
        return <Code className="h-4 w-4 text-primary/70" />;
      case "yaml":
        return <Code className="h-4 w-4 text-success/70" />;
      default:
        return <File className="h-4 w-4 text-muted/60" />;
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-100",
        "hover:bg-layer/30 cursor-pointer",
        className
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-layer/50 flex-shrink-0">
        {getFileIcon(file.type)}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-body text-foreground truncate">{file.name}</p>
        <p className="text-caption text-muted/60">
          {file.size} · {uploader?.name || "Unknown"}
        </p>
      </div>
    </div>
  );
}
