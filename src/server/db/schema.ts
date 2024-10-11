import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `hsr_crime_${name}`);

export const users = createTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

// ===== AUTH =====
export const accounts = createTable(
  "account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = createTable("session", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = createTable(
  "authenticator",
  {
    credentialID: text("credential_id").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("provider_account_id").notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credential_device_type").notNull(),
    credentialBackedUp: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

/**
 *  Tables for the Game
 *
 *
 */

export const characters = createTable("characters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull().default(15),
  gender: text("gender", { enum: ["male", "female"] })
    .notNull()
    .default("male"),
  cash: integer("cash").notNull().default(100),
  bank: integer("bank").notNull().default(500),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const userToCharactersRelations = relations(users, ({ many }) => ({
  characters: many(characters),
}));

export const charactersToUsersRelations = relations(characters, ({ one }) => ({
  user: one(users, {
    fields: [characters.userId],
    references: [users.id],
  }),
}));

export const jobs = createTable("jobs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  salary: integer("salary").notNull().default(0),
  type: text("type", { enum: ["legal", "illegal"] }).notNull(),
});

export const jobsRelations = relations(jobs, ({ many }) => ({
  usersToJobs: many(usersToJobs),
}));

export const properties = createTable("properties", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  type: text("type", { enum: ["legal", "illegal"] }).notNull(),
  price: integer("price").notNull().default(0),
  revenue: integer("revenue").notNull().default(0),
  upkeep: integer("upkeep").notNull().default(0),
});

export const propertiesRelations = relations(properties, ({ many }) => ({
  usersToProperties: many(usersToProperties),
}));

export const usersToJobs = createTable(
  "users_to_jobs",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    jobId: text("job_id")
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
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    propertyId: text("property_id")
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
