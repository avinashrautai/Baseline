import { AppShell } from "@/components/layout/app-shell";

export const metadata = {
  title: "Search",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
