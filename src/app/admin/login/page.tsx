"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Loader2, AlertTriangle, Shield } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Check if user is authenticated and redirect
        const session = await getSession();
        if (session) {
          router.push("/admin/dashboard");
          router.refresh();
        }
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary-600 p-4 rounded-full inline-block mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-stone-600">Holy Land Tour Management System</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg border border-stone-200 p-8"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-stone-900 mb-2">
              Sign In to Dashboard
            </h2>
            <p className="text-stone-600 text-sm">
              Access your admin dashboard to manage tour registrations and
              bookings
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">Login Failed</span>
              </div>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="admin@holylandtour.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  {...register("password")}
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" />
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            {isSubmitting ? "Signing In..." : "Sign In to Dashboard"}
          </button>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800 font-medium text-sm">
                Secure Access
              </span>
            </div>
            <p className="text-blue-700 text-xs">
              This portal is restricted to authorized Holy Land Tour
              administrators only. All login attempts are logged for security
              purposes.
            </p>
          </div>
        </form>

        {/* Demo Credentials (Remove in production) */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-center">
            <p className="text-yellow-800 font-medium text-sm mb-2">
              Demo Credentials
            </p>
            <p className="text-yellow-700 text-xs">
              Email: admin@holylandtour.com
              <br />
              Password: admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-stone-500 text-sm">
          <p>© 2025 Holy Land Tour Admin System</p>
        </div>
      </div>
    </div>
  );
}
