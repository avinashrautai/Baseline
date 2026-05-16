import { AppShell } from "@/components/layout/app-shell";

export const metadata = {
  title: "Focus",
};

export default function FocusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
