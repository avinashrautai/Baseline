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
import { Divider } from "@/components/ui/divider";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@/data";
import { ANIMATION, APP_CONFIG } from "@/constants";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Smartphone,
  Mail,
  Key,
  Download,
  Trash2,
  Monitor,
  Volume2,
  Eye,
  CreditCard,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: ANIMATION.duration.page }}
    >
      <PageHeader
        title="Settings"
        subtitle="Manage your account, preferences, and integrations."
      />

      <div className="px-5 md:px-8 space-y-10 pb-10">
        {/* ===== PROFILE SECTION ===== */}
        <section>
          <SectionHeader title="Profile" className="mb-4" />
          <Card variant="default" padding="md">
            <CardContent>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-subtle">
                <div className="relative">
                  <Avatar fallback={currentUser.initials} size="lg" />
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-foreground">
                    <User className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium text-foreground">{currentUser.name}</p>
                  <p className="text-body-sm text-muted">{currentUser.email}</p>
                  <Badge variant="primary" className="mt-1.5">
                    {currentUser.role}
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-body-sm font-medium text-foreground mb-1.5 block">
                    Display Name
                  </label>
                  <Input defaultValue={currentUser.name} />
                </div>
                <div>
                  <label className="text-body-sm font-medium text-foreground mb-1.5 block">
                    Email Address
                  </label>
                  <Input
                    defaultValue={currentUser.email}
                    icon={<Mail className="h-4 w-4" />}
                  />
                </div>
                <div>
                  <label className="text-body-sm font-medium text-foreground mb-1.5 block">
                    Role
                  </label>
                  <Input defaultValue={currentUser.role} disabled />
                </div>
                <div className="pt-2">
                  <Button size="sm">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== APPEARANCE SECTION ===== */}
        <section>
          <SectionHeader
            title="Appearance"
            subtitle="Customize how Baseline looks and feels."
            className="mb-4"
          />
          <Card variant="default" padding="sm">
            <CardContent>
              <div className="divide-y divide-border-subtle">
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-layer flex items-center justify-center">
                      <Moon className="h-4 w-4 text-muted" />
                    </div>
                    <div>
                      <span className="text-body text-foreground block">Dark mode</span>
                      <span className="text-caption text-muted">Always use dark theme</span>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-layer flex items-center justify-center">
                      <Monitor className="h-4 w-4 text-muted" />
                    </div>
                    <div>
                      <span className="text-body text-foreground block">Compact mode</span>
                      <span className="text-caption text-muted">Reduce spacing and padding</span>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-layer flex items-center justify-center">
                      <Eye className="h-4 w-4 text-muted" />
                    </div>
                    <div>
                      <span className="text-body text-foreground block">Reduced motion</span>
                      <span className="text-caption text-muted">Minimize animations</span>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== NOTIFICATIONS SECTION ===== */}
        <section>
          <SectionHeader
            title="Notifications"
            subtitle="Control how and when you receive updates."
            className="mb-4"
          />
          <Card variant="default" padding="sm">
            <CardContent>
              <div className="divide-y divide-border-subtle">
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-layer flex items-center justify-center">
                      <Bell className="h-4 w-4 text-muted" />
                    </div>
                    <div>
                      <span className="text-body text-foreground block">Push notifications</span>
                      <span className="text-caption text-muted">Desktop and mobile alerts</span>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-layer flex items-center justify-center">
                      <Mail className="h-4 w-4 text-muted" />
                    </div>
                    <div>
                      <span className="text-body text-foreground block">Email digest</span>
                      <span className="text-caption text-muted">Daily summary of activity</span>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-layer flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-muted" />
                    </div>
                    <div>
                      <span className="text-body text-foreground block">Haptic feedback</span>
                      <span className="text-caption text-muted">Vibrate on interactions</span>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-layer flex items-center justify-center">
                      <Volume2 className="h-4 w-4 text-muted" />
                    </div>
                    <div>
                      <span className="text-body text-foreground block">Sound effects</span>
                      <span className="text-caption text-muted">Audio cues for actions</span>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== GENERAL SECTION ===== */}
        <section>
          <SectionHeader title="General" className="mb-4" />
          <Card variant="default" padding="sm">
            <CardContent>
              <ListItem
                icon={<Globe className="h-4 w-4" />}
                title="Language"
                subtitle="App display language"
                trailing={<span className="text-body-sm text-muted">English (US)</span>}
                showChevron
              />
              <ListItem
                icon={<Palette className="h-4 w-4" />}
                title="Theme"
                subtitle="Color scheme preference"
                trailing={<span className="text-body-sm text-muted">Dark</span>}
                showChevron
              />
              <ListItem
                icon={<CreditCard className="h-4 w-4" />}
                title="Billing"
                subtitle="Manage subscription and payments"
                trailing={<Badge variant="accent">Pro</Badge>}
                showChevron
              />
            </CardContent>
          </Card>
        </section>

        {/* ===== SECURITY SECTION ===== */}
        <section>
          <SectionHeader
            title="Security"
            subtitle="Protect your account and data."
            className="mb-4"
          />
          <Card variant="default" padding="sm">
            <CardContent>
              <ListItem
                icon={<Key className="h-4 w-4" />}
                title="Change password"
                subtitle="Last changed 30 days ago"
                showChevron
              />
              <ListItem
                icon={<Shield className="h-4 w-4" />}
                title="Two-factor authentication"
                subtitle="Add an extra layer of security"
                trailing={<Badge variant="success">Enabled</Badge>}
                showChevron
              />
              <ListItem
                icon={<Download className="h-4 w-4" />}
                title="Export your data"
                subtitle="Download a copy of your account data"
                showChevron
              />
            </CardContent>
          </Card>
        </section>

        {/* ===== SUPPORT SECTION ===== */}
        <section>
          <SectionHeader title="Support" className="mb-4" />
          <Card variant="default" padding="sm">
            <CardContent>
              <ListItem
                icon={<HelpCircle className="h-4 w-4" />}
                title="Help & Documentation"
                subtitle="Guides, FAQs, and troubleshooting"
                trailing={<ExternalLink className="h-3.5 w-3.5 text-muted" />}
              />
              <ListItem
                icon={<Mail className="h-4 w-4" />}
                title="Contact Support"
                subtitle="Get in touch with our team"
                showChevron
              />
            </CardContent>
          </Card>
        </section>

        {/* ===== DANGER ZONE ===== */}
        <section>
          <Card variant="default" padding="sm">
            <CardContent>
              <ListItem
                icon={<LogOut className="h-4 w-4" />}
                title="Sign out"
                subtitle="Sign out of your account"
                destructive
              />
              <Divider className="my-1" />
              <ListItem
                icon={<Trash2 className="h-4 w-4" />}
                title="Delete account"
                subtitle="Permanently remove your account and data"
                destructive
              />
            </CardContent>
          </Card>
        </section>

        {/* App version */}
        <div className="text-center py-6">
          <p className="text-caption text-muted/50">
            {APP_CONFIG.name} v{APP_CONFIG.version}
          </p>
          <p className="text-caption text-muted/30 mt-1">
            Built with care
          </p>
        </div>
      </div>
    </motion.div>
  );
}
