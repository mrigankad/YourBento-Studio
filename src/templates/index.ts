// Pre-built starter templates for Toonify Bento Builder
import type { GridCardData } from "../types";

export const TEMPLATE_DASHBOARD: GridCardData[] = [
    { id: "t1_1", type: "hero", title: "Welcome Back!", subtitle: "Here's your daily overview.", colSpan: 2, rowSpan: 2, buttonText: "View Reports", borderRadius: 16, iconId: "arrow", iconPosition: "top-left", lottieId: "schedule", bgColor: "card-bg-1" },
    { id: "t1_2", type: "stats", title: "Active Users", subtitle: "Currently online", colSpan: 1, rowSpan: 1, statValue: "1,284", borderRadius: 16, iconId: "chart", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-4" },
    { id: "t1_3", type: "stats", title: "Revenue", subtitle: "This month", colSpan: 1, rowSpan: 1, statValue: "$42.5k", borderRadius: 16, iconId: "chart", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-3" },
    { id: "t1_4", type: "checklist", title: "Tasks Today", subtitle: "8/12 completed", colSpan: 1, rowSpan: 2, borderRadius: 16, iconId: "none", iconPosition: "top-left", lottieId: "checklist", bgColor: "card-bg-1" },
    { id: "t1_5", type: "target", title: "Q3 Goals", subtitle: "78% achieved", colSpan: 1, rowSpan: 1, borderRadius: 16, iconId: "target", iconPosition: "top-left", lottieId: "target", bgColor: "card-bg-2" },
    { id: "t1_6", type: "contracts", title: "Pending Reviews", subtitle: "3 contracts awaiting signatures", colSpan: 2, rowSpan: 1, borderRadius: 16, iconId: "none", iconPosition: "top-left", lottieId: "contract", bgColor: "card-bg-4" },
];

export const TEMPLATE_PORTFOLIO: GridCardData[] = [
    { id: "t2_1", type: "hero", title: "Hey, I'm Alex", subtitle: "A creative developer who builds beautiful digital experiences.", colSpan: 3, rowSpan: 2, buttonText: "Contact Me", borderRadius: 24, iconId: "arrow", iconPosition: "top-left", lottieId: "schedule", bgColor: "card-bg-1" },
    { id: "t2_2", type: "action", title: "Projects", subtitle: "12 completed", colSpan: 1, rowSpan: 1, borderRadius: 50, iconId: "rocket", iconPosition: "center", lottieId: "none", bgColor: "card-bg-3" },
    { id: "t2_3", type: "stats", title: "GitHub Stars", subtitle: "Open source work", colSpan: 1, rowSpan: 1, statValue: "2.4k", borderRadius: 24, iconId: "star", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-2" },
    { id: "t2_4", type: "target", title: "Skills", subtitle: "React, TypeScript, Node, Figma", colSpan: 2, rowSpan: 1, borderRadius: 24, iconId: "globe", iconPosition: "top-left", lottieId: "target", bgColor: "card-bg-4" },
    { id: "t2_5", type: "contracts", title: "Experience", subtitle: "5 years building for the web", colSpan: 2, rowSpan: 1, borderRadius: 24, iconId: "none", iconPosition: "top-left", lottieId: "contract", bgColor: "card-bg-4" },
];

export const TEMPLATE_LANDING: GridCardData[] = [
    { id: "t3_1", type: "hero", title: "Build Faster, Ship Sooner", subtitle: "The only tool you need to create stunning layouts in minutes.", colSpan: 2, rowSpan: 2, buttonText: "Get Started Free", borderRadius: 20, iconId: "arrow", iconPosition: "top-left", lottieId: "schedule", bgColor: "card-bg-1" },
    { id: "t3_2", type: "action", title: "Lightning Fast", subtitle: "Sub-second load times", colSpan: 1, rowSpan: 1, borderRadius: 20, iconId: "zap", iconPosition: "center", lottieId: "none", bgColor: "card-bg-3" },
    { id: "t3_3", type: "action", title: "Zero Config", subtitle: "Works out of the box", colSpan: 1, rowSpan: 1, borderRadius: 20, iconId: "shield", iconPosition: "center", lottieId: "none", bgColor: "card-bg-2" },
    { id: "t3_4", type: "stats", title: "Users", subtitle: "And growing every day", colSpan: 1, rowSpan: 1, statValue: "50k+", borderRadius: 20, iconId: "heart", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-4" },
    { id: "t3_5", type: "stats", title: "Uptime", subtitle: "Enterprise-grade reliability", colSpan: 1, rowSpan: 1, statValue: "99.9%", borderRadius: 20, iconId: "shield", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-3" },
    { id: "t3_6", type: "contracts", title: "Trusted By Teams", subtitle: "From startups to Fortune 500", colSpan: 2, rowSpan: 1, borderRadius: 20, iconId: "none", iconPosition: "top-left", lottieId: "contract", bgColor: "card-bg-4" },
];

export const TEMPLATE_ADMIN: GridCardData[] = [
    { id: "t4_1", type: "stats", title: "Total Users", subtitle: "All time", colSpan: 1, rowSpan: 1, statValue: "14.2k", borderRadius: 12, iconId: "chart", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-white" },
    { id: "t4_2", type: "stats", title: "API Calls", subtitle: "Last 24 hours", colSpan: 1, rowSpan: 1, statValue: "892k", borderRadius: 12, iconId: "chart", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-white" },
    { id: "t4_3", type: "stats", title: "Error Rate", subtitle: "Last 7 days", colSpan: 1, rowSpan: 1, statValue: "0.02%", borderRadius: 12, iconId: "shield", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-3" },
    { id: "t4_4", type: "stats", title: "Avg Response", subtitle: "Server latency", colSpan: 1, rowSpan: 1, statValue: "42ms", borderRadius: 12, iconId: "zap", iconPosition: "top-left", lottieId: "none", bgColor: "card-bg-2" },
    { id: "t4_5", type: "checklist", title: "System Health", subtitle: "All operational", colSpan: 1, rowSpan: 2, borderRadius: 12, iconId: "none", iconPosition: "top-left", lottieId: "checklist", bgColor: "card-bg-1" },
    { id: "t4_6", type: "hero", title: "Admin Console", subtitle: "Manage your platform from a single view.", colSpan: 2, rowSpan: 2, buttonText: "Open Settings", borderRadius: 12, iconId: "arrow", iconPosition: "top-left", lottieId: "schedule", bgColor: "card-bg-4" },
    { id: "t4_7", type: "contracts", title: "Deployments", subtitle: "Last deployed 2hr ago", colSpan: 1, rowSpan: 1, borderRadius: 12, iconId: "none", iconPosition: "top-left", lottieId: "contract", bgColor: "card-bg-white" },
];

export const ALL_TEMPLATES: Record<string, { name: string; data: GridCardData[] }> = {
    dashboard: { name: "📊 Dashboard", data: TEMPLATE_DASHBOARD },
    portfolio: { name: "🎨 Portfolio", data: TEMPLATE_PORTFOLIO },
    landing: { name: "🚀 Landing Page", data: TEMPLATE_LANDING },
    admin: { name: "⚙️ Admin Panel", data: TEMPLATE_ADMIN },
};
