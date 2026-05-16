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
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@/data";
import { APP_CONFIG } from "@/constants";
import {
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Mail,
  Key,
  Trash2,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences."
      />

      <div className="px-5 md:px-8 space-y-12 pb-12">
        {/* Profile */}
        <section>
          <SectionHeader title="Profile" className="mb-4" />
          <Card variant="default" padding="md">
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar fallback={currentUser.initials} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium text-foreground">{currentUser.name}</p>
                  <p className="text-caption text-muted">{currentUser.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-caption text-muted mb-1.5 block">Name</label>
                  <Input defaultValue={currentUser.name} />
                </div>
                <div>
                  <label className="text-caption text-muted mb-1.5 block">Email</label>
                  <Input defaultValue={currentUser.email} icon={<Mail className="h-4 w-4" />} />
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
                    <Palette className="h-4 w-4 text-muted/60" />
                    <span className="text-body text-foreground">Reduced motion</span>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notifications */}
        <section>
          <SectionHeader title="Notifications" className="mb-4" />
          <Card variant="default" padding="sm">
            <CardContent>
              <div className="divide-y divide-border-subtle">
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-muted/60" />
                    <span className="text-body text-foreground">Push notifications</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted/60" />
                    <span className="text-body text-foreground">Email digest</span>
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
                title="Two-factor auth"
                trailing={<Badge variant="success">On</Badge>}
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
              />
              <ListItem
                icon={<Trash2 className="h-4 w-4" />}
                title="Delete account"
                destructive
              />
            </CardContent>
          </Card>
        </section>

        {/* Version */}
        <p className="text-center text-caption text-muted/40 pb-4">
          {APP_CONFIG.name} v{APP_CONFIG.version}
        </p>
      </div>
    </motion.div>
  );
}
