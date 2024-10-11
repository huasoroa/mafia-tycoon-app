import { db } from "./db";

export const getCharacters = async () => {
  return await db.query.characters.findMany();
};

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getJobs = async () => {
  return await db.query.jobs.findMany();
};

export const getProperties = async () => {
  return await db.query.properties.findMany();
};
