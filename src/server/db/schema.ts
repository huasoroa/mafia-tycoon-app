import { relations } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  primaryKey,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `hsr_crime_${name}`);

export const users = createTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull().default(15),
  gender: text("gender", { enum: ["male", "female"] })
    .notNull()
    .default("male"),
  money: integer("money").notNull().default(100),
});

export const jobs = createTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  salary: integer("salary").notNull().default(0),
  type: text("type", { enum: ["legal", "illegal"] }).notNull(),
});

export const jobsRelations = relations(jobs, ({ many }) => ({
  usersToJobs: many(usersToJobs),
}));

export const properties = createTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  type: text("type", { enum: ["legal", "illegal"] }).notNull(),
  price: integer("price").notNull().default(0),
  revenue: integer("revenue").notNull().default(0),
});

export const propertiesRelations = relations(properties, ({ many }) => ({
  usersToProperties: many(usersToProperties),
}));

export const usersToJobs = createTable(
  "users_to_jobs",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.jobId] }),
  })
);

export const usersToJobsRelations = relations(usersToJobs, ({ one }) => ({
  job: one(jobs, {
    fields: [usersToJobs.jobId],
    references: [jobs.id],
  }),
  user: one(users, {
    fields: [usersToJobs.userId],
    references: [users.id],
  }),
}));

export const usersToProperties = createTable(
  "users_to_properties",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    propertyId: uuid("property_id")
      .notNull()
      .references(() => properties.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.propertyId] }),
  })
);

export const usersToPropertiesRelations = relations(
  usersToProperties,
  ({ one }) => ({
    property: one(properties, {
      fields: [usersToProperties.propertyId],
      references: [properties.id],
    }),
    user: one(users, {
      fields: [usersToProperties.userId],
      references: [users.id],
    }),
  })
);
