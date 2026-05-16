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
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Moon,
  Smartphone,
  Mail,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <PageHeader title="Settings" subtitle="Manage your account and preferences." />

      <div className="px-5 md:px-8 space-y-8 pb-8">
        {/* Profile */}
        <section>
          <SectionHeader title="Profile" className="mb-4" />
          <Card variant="default" padding="md">
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Avatar fallback="AR" size="lg" />
                <div className="flex-1">
                  <p className="text-body font-medium text-foreground">Alex Reed</p>
                  <p className="text-body-sm text-muted">alex@baseline.app</p>
                </div>
                <Button variant="secondary" size="sm">Edit</Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-body-sm text-muted mb-1.5 block">
                    Display Name
                  </label>
                  <Input defaultValue="Alex Reed" />
                </div>
                <div>
                  <label className="text-body-sm text-muted mb-1.5 block">
                    Email
                  </label>
                  <Input defaultValue="alex@baseline.app" icon={<Mail className="h-4 w-4" />} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Preferences */}
        <section>
          <SectionHeader title="Preferences" className="mb-4" />
          <Card variant="default" padding="sm">
            <CardContent>
              <div className="divide-y divide-border-subtle">
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Moon className="h-4 w-4 text-muted" />
                    <span className="text-body text-foreground">Dark mode</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Bell className="h-4 w-4 text-muted" />
                    <span className="text-body text-foreground">Push notifications</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-4 w-4 text-muted" />
                    <span className="text-body text-foreground">Haptic feedback</span>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted" />
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
                trailing={<span className="text-body-sm text-muted">English</span>}
                showChevron
              />
              <ListItem
                icon={<Palette className="h-4 w-4" />}
                title="Appearance"
                trailing={<span className="text-body-sm text-muted">Dark</span>}
                showChevron
              />
              <ListItem
                icon={<Shield className="h-4 w-4" />}
                title="Privacy & Security"
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

        {/* Danger Zone */}
        <section>
          <Card variant="default" padding="sm">
            <CardContent>
              <ListItem
                icon={<LogOut className="h-4 w-4" />}
                title="Sign out"
                destructive
              />
            </CardContent>
          </Card>
        </section>

        {/* App version */}
        <div className="text-center py-4">
          <p className="text-caption text-muted/60">Baseline v1.0.0</p>
        </div>
      </div>
    </motion.div>
  );
}
