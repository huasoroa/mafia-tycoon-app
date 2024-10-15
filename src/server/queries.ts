import { db } from "./db";

export const getCharacters = async () => {
  return await db.query.characters.findMany();
};

export const getUsers = async () => {
  return await db.query.users.findMany();
};

export const getJobsByCharacter = async (characterId: string) => {
  const result = await db.query.characters.findMany({
    columns: {},
    with: {
      charactersToJobs: {
        columns: {},
        with: { job: true },
      },
    },
    where: (characters, { eq }) => eq(characters.id, characterId),
  });

  const jobs = result.flatMap(({ charactersToJobs }) =>
    charactersToJobs.map(({ job }) => job)
  );

  return jobs;
};

export const getAllJobs = async () => {
  return await db.query.jobs.findMany();
};

export const getProperties = async () => {
  return await db.query.properties.findMany();
};
