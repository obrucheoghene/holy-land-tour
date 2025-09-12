"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/admin-layout";
import {
  Users,
  Hotel,
  DollarSign,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Mail,
  FileText,
  Download,
} from "lucide-react";

interface DashboardStats {
  totalRegistrations: number;
  totalHotelBookings: number;
  totalRevenue: number;
  pendingPayments: number;
  recentRegistrations: any[];
  recentBookings: any[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/admin/dashboard");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">
                Welcome to Your Dashboard
              </h1>
              <p className="text-primary-100 text-lg">
                Manage your Holy Land Tour registrations and bookings
              </p>
              <p className="text-primary-200 text-sm mt-2">
                Tour Date: March 15-25, 2025 •{" "}
                {50 - (stats?.totalRegistrations || 0)} spots remaining
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <MapPin className="w-12 h-12 text-white mb-2" />
                <div className="text-sm font-medium">Holy Land</div>
                <div className="text-xs text-primary-200">
                  Israel & Palestine
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-stone-900">
                  {stats?.totalRegistrations || 0}
                </div>
                <div className="text-sm text-stone-500">
                  Total Registrations
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+12%</span>
              <span className="text-stone-500">from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Hotel className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-stone-900">
                  {stats?.totalHotelBookings || 0}
                </div>
                <div className="text-sm text-stone-500">Hotel Bookings</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+8%</span>
              <span className="text-stone-500">from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-stone-900">
                  ${(stats?.totalRevenue || 0).toLocaleString()}
                </div>
                <div className="text-sm text-stone-500">Total Revenue</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+15%</span>
              <span className="text-stone-500">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-stone-900">
                  {stats?.pendingPayments || 0}
                </div>
                <div className="text-sm text-stone-500">Pending Payments</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-yellow-600 font-medium">
                Needs attention
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
