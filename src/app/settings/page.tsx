"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { ListItem } from "@/components/ui/list-item";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { LoadingScreen } from "@/components/ui/loading";
import { useQuery } from "@/hooks/use-query";
import { getProfile, signOut } from "@/lib/supabase/queries";
import { useRouter } from "next/navigation";
import {
  Bell,
  Shield,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Mail,
  Key,
  Trash2,
} from "lucide-react";

export default function SettingsPage() {
  const { data: profile, loading } = useQuery(getProfile, []);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  if (loading) return <LoadingScreen />;

  const initials = profile?.name
    ? profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences."
      />

      <div className="px-5 md:px-8 md:max-w-2xl space-y-12 pb-12">
        {/* Profile */}
        <section>
          <SectionHeader title="Profile" className="mb-4" />
          <Card variant="default" padding="md">
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar
                  fallback={initials}
                  src={profile?.avatar_url ?? undefined}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium text-foreground">{profile?.name}</p>
                  <p className="text-caption text-muted">{profile?.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-caption text-muted mb-1.5 block">Name</label>
                  <Input defaultValue={profile?.name ?? ""} />
                </div>
                <div>
                  <label className="text-caption text-muted mb-1.5 block">Email</label>
                  <Input
                    defaultValue={profile?.email ?? ""}
                    icon={<Mail className="h-4 w-4" />}
                    disabled
                  />
                </div>
                <Button size="sm" className="mt-2">Save</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Appearance */}
        <section>
          <SectionHeader title="Appearance" className="mb-4" />
          <Card variant="default" padding="sm">
            <CardContent>
              <div className="divide-y divide-border-subtle">
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Moon className="h-4 w-4 text-muted/60" />
                    <span className="text-body text-foreground">Dark mode</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-muted/60" />
                    <span className="text-body text-foreground">Notifications</span>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* General */}
        <section>
          <SectionHeader title="General" className="mb-4" />
          <Card variant="default" padding="sm">
            <CardContent>
              <ListItem
                icon={<Globe className="h-4 w-4" />}
                title="Language"
                trailing={<span className="text-caption text-muted">English</span>}
                showChevron
              />
              <ListItem
                icon={<Key className="h-4 w-4" />}
                title="Change password"
                showChevron
              />
              <ListItem
                icon={<Shield className="h-4 w-4" />}
                title="Security"
                showChevron
              />
              <ListItem
                icon={<HelpCircle className="h-4 w-4" />}
                title="Help & Support"
                showChevron
              />
            </CardContent>
          </Card>
        </section>

        {/* Danger */}
        <section>
          <Card variant="default" padding="sm">
            <CardContent>
              <ListItem
                icon={<LogOut className="h-4 w-4" />}
                title="Sign out"
                destructive
                onClick={handleSignOut}
              />
              <ListItem
                icon={<Trash2 className="h-4 w-4" />}
                title="Delete account"
                destructive
              />
            </CardContent>
          </Card>
        </section>

        <p className="text-center text-caption text-muted/40 pb-4">
          Baseline v1.0.0
        </p>
      </div>
    </motion.div>
  );
}
