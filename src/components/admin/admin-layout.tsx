"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Hotel,
  FileText,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  ChevronDown,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Overview and statistics",
  },
  {
    name: "Registrations",
    href: "/admin/registrations",
    icon: Users,
    description: "Tour registrations management",
  },
  {
    name: "Hotel Bookings",
    href: "/admin/hotel-bookings",
    icon: Hotel,
    description: "Accommodation bookings",
  },
  {
    name: "Reports",
    href: "/admin/reports",
    icon: FileText,
    description: "Generate and download reports",
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "Booking trends and insights",
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "System configuration",
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-stone-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <div className="flex items-center justify-between h-16 px-6 border-b border-stone-200">
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Admin Portal
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="mt-8 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-100 text-primary-700 border-l-4 border-primary-600"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-stone-500">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:w-72 lg:flex lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-stone-200 shadow-sm">
          <div className="flex items-center gap-3 px-6 h-16 border-b border-stone-200">
            <div className="bg-primary-600 p-2 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Holy Land Admin
              </h2>
              <p className="text-xs text-stone-500">Tour Management System</p>
            </div>
          </div>

          <nav className="flex-1 mt-8 px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-primary-100 text-primary-700 shadow-sm"
                      : "text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-primary-600"
                        : "text-stone-500 group-hover:text-stone-700"
                    }`}
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div
                      className={`text-xs ${
                        isActive ? "text-primary-600" : "text-stone-500"
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-stone-200">
            <div className="flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-lg">
              <div className="bg-primary-600 p-2 rounded-full">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-stone-900 truncate">
                  {session?.user?.name}
                </div>
                <div className="text-xs text-stone-500 truncate">
                  {session?.user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <header className="bg-white border-b border-stone-200 shadow-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>
                <h1 className="text-xl font-semibold text-stone-900">
                  {navigation.find((item) => item.href === pathname)?.name ||
                    "Admin Dashboard"}
                </h1>
                <p className="text-sm text-stone-500">
                  {navigation.find((item) => item.href === pathname)
                    ?.description || "Manage your Holy Land tour"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors">
                <Bell className="w-5 h-5 text-stone-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <div className="bg-primary-600 p-1 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-stone-900 text-sm hidden md:block">
                    {session?.user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-stone-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-stone-200">
                      <div className="font-medium text-stone-900">
                        {session?.user?.name}
                      </div>
                      <div className="text-sm text-stone-500">
                        {session?.user?.email}
                      </div>
                      <div className="text-xs text-primary-600 mt-1 capitalize">
                        {session?.user?.role || "Admin"}
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/admin/profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors text-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleSignOut();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-sm text-stone-700"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </div>
  );
}
