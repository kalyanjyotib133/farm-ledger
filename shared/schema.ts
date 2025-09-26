import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, numeric, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Animals table for livestock registry
export const animals = pgTable("animals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tagId: text("tag_id").notNull().unique(),
  species: text("species").notNull(),
  breed: text("breed"),
  birthDate: timestamp("birth_date"),
  weight: numeric("weight", { precision: 8, scale: 2 }),
  location: text("location"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

// Drugs table with MRL information
export const drugs = pgTable("drugs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  activeIngredient: text("active_ingredient").notNull(),
  category: text("category").notNull(),
  withdrawalPeriodMilk: integer("withdrawal_period_milk"),
  withdrawalPeriodMeat: integer("withdrawal_period_meat"),
  mrlLimitMilk: numeric("mrl_limit_milk", { precision: 10, scale: 4 }),
  mrlLimitMeat: numeric("mrl_limit_meat", { precision: 10, scale: 4 }),
  dosageForm: text("dosage_form"),
  manufacturer: text("manufacturer"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Drug administrations table
export const drugAdministrations = pgTable("drug_administrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  animalId: varchar("animal_id").notNull().references(() => animals.id),
  drugId: varchar("drug_id").notNull().references(() => drugs.id),
  dosage: numeric("dosage", { precision: 10, scale: 4 }).notNull(),
  dosageUnit: text("dosage_unit").notNull(),
  administrationDate: timestamp("administration_date").notNull(),
  administeredBy: text("administered_by").notNull(),
  reason: text("reason"),
  withdrawalDeadlineMilk: timestamp("withdrawal_deadline_milk"),
  withdrawalDeadlineMeat: timestamp("withdrawal_deadline_meat"),
  notes: text("notes"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// MRL violations table
export const mrlViolations = pgTable("mrl_violations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  animalId: varchar("animal_id").notNull().references(() => animals.id),
  drugId: varchar("drug_id").notNull().references(() => drugs.id),
  administrationId: varchar("administration_id").references(() => drugAdministrations.id),
  violationType: text("violation_type").notNull(),
  detectedLevel: numeric("detected_level", { precision: 10, scale: 4 }),
  mrlLimit: numeric("mrl_limit", { precision: 10, scale: 4 }),
  testDate: timestamp("test_date").notNull(),
  severity: text("severity").notNull(),
  status: text("status").notNull().default("open"),
  resolvedAt: timestamp("resolved_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Insert schemas for forms
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAnimalSchema = createInsertSchema(animals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDrugSchema = createInsertSchema(drugs).omit({
  id: true,
  createdAt: true,
});

export const insertDrugAdministrationSchema = createInsertSchema(drugAdministrations).omit({
  id: true,
  createdAt: true,
});

export const insertMrlViolationSchema = createInsertSchema(mrlViolations).omit({
  id: true,
  createdAt: true,
});

// Types for TypeScript
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAnimal = z.infer<typeof insertAnimalSchema>;
export type Animal = typeof animals.$inferSelect;

export type InsertDrug = z.infer<typeof insertDrugSchema>;
export type Drug = typeof drugs.$inferSelect;

export type InsertDrugAdministration = z.infer<typeof insertDrugAdministrationSchema>;
export type DrugAdministration = typeof drugAdministrations.$inferSelect;

export type InsertMrlViolation = z.infer<typeof insertMrlViolationSchema>;
export type MrlViolation = typeof mrlViolations.$inferSelect;
