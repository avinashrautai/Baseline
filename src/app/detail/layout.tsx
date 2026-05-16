import { AppShell } from "@/components/layout/app-shell";

export const metadata = {
  title: "Project Detail",
};

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
