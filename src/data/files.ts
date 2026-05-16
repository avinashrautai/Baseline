import { FileItem } from "@/types";

export const files: FileItem[] = [
  {
    id: "file_01",
    name: "Design-Tokens-v3.fig",
    type: "figma",
    size: "2.4 MB",
    uploadedBy: "usr_02",
    uploadedAt: "2024-06-12T14:00:00Z",
  },
  {
    id: "file_02",
    name: "Component-Audit.pdf",
    type: "pdf",
    size: "1.8 MB",
    uploadedBy: "usr_04",
    uploadedAt: "2024-06-10T09:00:00Z",
  },
  {
    id: "file_03",
    name: "Motion-Guidelines.md",
    type: "markdown",
    size: "24 KB",
    uploadedBy: "usr_03",
    uploadedAt: "2024-06-08T16:00:00Z",
  },
  {
    id: "file_04",
    name: "User-Research-Findings.pdf",
    type: "pdf",
    size: "4.2 MB",
    uploadedBy: "usr_06",
    uploadedAt: "2024-06-05T11:00:00Z",
  },
  {
    id: "file_05",
    name: "API-Specification.yaml",
    type: "yaml",
    size: "156 KB",
    uploadedBy: "usr_03",
    uploadedAt: "2024-05-28T10:00:00Z",
  },
];

export function getFilesByProject(projectId: string): FileItem[] {
  // In a real app this would filter by project
  return files;
}
