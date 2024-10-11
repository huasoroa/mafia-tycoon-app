import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { count } from "drizzle-orm/sql";
import { Confirm } from "enquirer";
import { Pool } from "pg";
import {
  characters,
  jobs,
  properties,
  users,
  usersToJobs,
  usersToProperties,
} from "./schema";

config({ path: [".env.local", ".env"] });

export const seedDatabase = async () => {
  console.log("Checking environment");
  console.log("🌎 - ", process.env.NODE_ENV);
  if (process.env.NODE_ENV !== "development") return;

  console.log("💾 - Seeding database");

  // Set up a connection pool
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL, // Ensure this is set in your .env.local file
  });

  const db = drizzle(pool);

  const usersCount = await db.select({ count: count() }).from(users);

  const amountOfUsers = Array.isArray(usersCount) ? usersCount[0].count : 0;

  if (amountOfUsers >= 1) {
    const shouldSeedQuestion = new Confirm({
      name: "question",
      message: "Database already seeded, do you want to seed again?",
    });

    const shouldSeed = await shouldSeedQuestion.run();

    if (!shouldSeed) return console.log("🚫 - Database already seeded");

    await db.delete(usersToProperties);
    await db.delete(usersToJobs);
    await db.delete(characters);
    await db.delete(properties);
    await db.delete(jobs);
    await db.delete(users);
  }

  console.log("👨🏻‍💻 - Seeding users");

  const [user] = await db
    .insert(users)
    .values([
      {
        email: "random.email@random.com",
      },
    ])
    .returning();

  console.log("🕴🏼 - Seeding characters");

  await db.insert(characters).values([
    {
      name: "Tony Soprano",
      age: 20,
      userId: user.id,
    },
  ]);

  console.log("🧑🏻‍🔧 - Seeding jobs");

  await db.insert(jobs).values([
    { name: "Store clerk", type: "legal", salary: 100 },
    { name: "Security Guard", type: "legal", salary: 150 },
    { name: "Taxi Driver", type: "legal", salary: 120 },
    { name: "Construction Worker", type: "legal", salary: 200 },
    { name: "Mechanic", type: "legal", salary: 150 },
    { name: "Bartender", type: "legal", salary: 80 },
  ]);

  console.log("🏡 - Seeding properties");

  await db.insert(properties).values([
    { name: "Pizzeria", type: "legal", revenue: 100 },
    { name: "Hotel", type: "legal", revenue: 150 },
    { name: "Bar", type: "legal", revenue: 80 },
    { name: "Weed farm", type: "illegal", revenue: 300 },
    { name: "Cocaine lockup", type: "illegal", revenue: 500 },
    { name: "Meth lab", type: "illegal", revenue: 400 },
  ]);

  console.log("✅ - finished seeding");
};

seedDatabase();
