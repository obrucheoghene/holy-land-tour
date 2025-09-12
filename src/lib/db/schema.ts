import {
  pgTable,
  text,
  timestamp,
  uuid,
  decimal,
  integer,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";

// Registrations table
export const registrations = pgTable("registrations", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  dateOfBirth: text("date_of_birth"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country").default("United States"),
  emergencyContact: text("emergency_contact"),
  emergencyPhone: text("emergency_phone"),
  dietaryRestrictions: text("dietary_restrictions"),
  medicalConditions: text("medical_conditions"),
  registrationFee: decimal("registration_fee", {
    precision: 10,
    scale: 2,
  }).default("0.00"),
  paymentStatus: text("payment_status").default("pending"), // pending, paid, failed, refunded
  stripePaymentId: text("stripe_payment_id"),
  registrationDate: timestamp("registration_date").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hotel bookings table
export const hotelBookings = pgTable("hotel_bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  registrationId: uuid("registration_id").references(() => registrations.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  roomType: text("room_type").notNull(), // single, double, suite, etc.
  roomPrice: decimal("room_price", { precision: 10, scale: 2 }).notNull(),
  checkInDate: text("check_in_date").notNull(),
  checkOutDate: text("check_out_date").notNull(),
  numberOfNights: integer("number_of_nights").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: text("payment_status").default("pending"), // pending, paid, failed, refunded
  stripePaymentId: text("stripe_payment_id"),
  specialRequests: text("special_requests"),
  bookingDate: timestamp("booking_date").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Room types table
export const roomTypes = pgTable("room_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(), // Single Room, Double Room, Suite, etc.
  description: text("description"),
  amenities: jsonb("amenities"), // JSON array of amenities
  pricePerNight: decimal("price_per_night", {
    precision: 10,
    scale: 2,
  }).notNull(),
  maxOccupancy: integer("max_occupancy").default(1),
  availableRooms: integer("available_rooms").default(0),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  hashedPassword: text("hashed_password").notNull(),
  role: text("role").default("admin"), // admin, super_admin
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Email logs table
export const emailLogs = pgTable("email_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  recipient: text("recipient").notNull(),
  subject: text("subject").notNull(),
  emailType: text("email_type").notNull(), // registration_confirmation, booking_confirmation, etc.
  status: text("status").default("sent"), // sent, failed
  errorMessage: text("error_message"),
  sentAt: timestamp("sent_at").defaultNow(),
});

// Tour information table (for admin management)
export const tourInfo = pgTable("tour_info", {
  id: uuid("id").primaryKey().defaultRandom(),
  tourName: text("tour_name").notNull(),
  tourDate: text("tour_date").notNull(),
  registrationDeadline: text("registration_deadline"),
  registrationFee: decimal("registration_fee", {
    precision: 10,
    scale: 2,
  }).default("0.00"),
  maxParticipants: integer("max_participants"),
  currentParticipants: integer("current_participants").default(0),
  isActive: boolean("is_active").default(true),
  description: text("description"),
  itinerary: jsonb("itinerary"), // JSON array of sites and activities
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Types for TypeScript
export type Registration = typeof registrations.$inferSelect;
export type NewRegistration = typeof registrations.$inferInsert;

export type HotelBooking = typeof hotelBookings.$inferSelect;
export type NewHotelBooking = typeof hotelBookings.$inferInsert;

export type RoomType = typeof roomTypes.$inferSelect;
export type NewRoomType = typeof roomTypes.$inferInsert;

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;

export type EmailLog = typeof emailLogs.$inferSelect;
export type NewEmailLog = typeof emailLogs.$inferInsert;

export type TourInfo = typeof tourInfo.$inferSelect;
export type NewTourInfo = typeof tourInfo.$inferInsert;
