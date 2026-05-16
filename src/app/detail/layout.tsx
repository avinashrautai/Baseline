import { AppShell } from "@/components/layout/app-shell";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
