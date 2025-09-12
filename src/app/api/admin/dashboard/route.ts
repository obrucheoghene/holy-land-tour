import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { registrations, hotelBookings } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get total registrations
    const totalRegistrationsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(registrations);

    // Get total hotel bookings
    const totalHotelBookingsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(hotelBookings);

    // Get total revenue from registrations
    const registrationRevenueResult = await db
      .select({
        total: sql<number>`sum(cast(registration_fee as decimal))`,
      })
      .from(registrations)
      .where(eq(registrations.paymentStatus, "paid"));

    // Get total revenue from hotel bookings
    const hotelRevenueResult = await db
      .select({
        total: sql<number>`sum(cast(total_amount as decimal))`,
      })
      .from(hotelBookings)
      .where(eq(hotelBookings.paymentStatus, "paid"));

    // Get pending payments count
    const pendingRegistrationsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(registrations)
      .where(eq(registrations.paymentStatus, "pending"));

    const pendingBookingsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(hotelBookings)
      .where(eq(hotelBookings.paymentStatus, "pending"));

    // Get recent registrations
    const recentRegistrations = await db
      .select()
      .from(registrations)
      .orderBy(desc(registrations.registrationDate))
      .limit(10);

    // Get recent hotel bookings
    const recentBookings = await db
      .select()
      .from(hotelBookings)
      .orderBy(desc(hotelBookings.bookingDate))
      .limit(10);

    // Calculate totals
    const totalRegistrations = totalRegistrationsResult[0]?.count || 0;
    const totalHotelBookings = totalHotelBookingsResult[0]?.count || 0;
    const registrationRevenue = registrationRevenueResult[0]?.total || 0;
    const hotelRevenue = hotelRevenueResult[0]?.total || 0;
    const totalRevenue = Number(registrationRevenue) + Number(hotelRevenue);
    const pendingRegistrations = pendingRegistrationsResult[0]?.count || 0;
    const pendingBookings = pendingBookingsResult[0]?.count || 0;
    const pendingPayments =
      Number(pendingRegistrations) + Number(pendingBookings);

    return NextResponse.json({
      totalRegistrations: Number(totalRegistrations),
      totalHotelBookings: Number(totalHotelBookings),
      totalRevenue,
      pendingPayments,
      recentRegistrations: recentRegistrations.map((reg) => ({
        id: reg.id,
        firstName: reg.firstName,
        lastName: reg.lastName,
        email: reg.email,
        registrationFee: reg.registrationFee,
        paymentStatus: reg.paymentStatus,
        registrationDate: reg.registrationDate,
      })),
      recentBookings: recentBookings.map((booking) => ({
        id: booking.id,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        roomType: booking.roomType,
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus,
        bookingDate: booking.bookingDate,
      })),
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
