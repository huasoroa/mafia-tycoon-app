export type PlayerSkills = {
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
  luck: number;
};

export type PlayerCharacter = {
  name: string;
  age: number;
  gender: string;
  cash: number;
  bank: number;
  skills: PlayerSkills;
};

export const performActions = (
  playerSkill: PlayerSkills,
  taskDifficulty: number,
  taskType: "flat" | "skill",
  successThreshold?: number
) => {
  if (taskType === "skill") {
    const successRate = playerSkill.strength * taskDifficulty;
    // Skill success rate (e.g., Strength * difficulty)
    const skillSuccessRate = successRate; // Use successThreshold as the skill rate in this case
    const roll = Math.random(); // Roll a number between 0 and 1

    if (roll < skillSuccessRate) {
      return "Success";
    } else {
      return "Failure";
    }
  } else if (taskType === "flat") {
    // Flat success rate (e.g., 70% success rate)
    const flatSuccessRate = successThreshold ?? 0.5; // Use successThreshold as the flat rate in this case
    const roll = Math.random(); // Roll a number between 0 and 1

    if (roll < flatSuccessRate) {
      return "Success";
    } else {
      return "Failure";
    }
  }
};

export const moneyActions = [
  {
    name: "Beg",
    description: "You can beg for money",
    cooldown: 1000,
    effect: (player) => {
      return;
    },
  },
];

export const xpBrackets = [
  { minXp: 0, maxXp: 100, tiers: { "Tier 1": 1.0 } }, // 100% Tier 1
  {
    minXp: 101,
    maxXp: 500,
    tiers: { "Tier 1": 0.2, "Tier 2": 0.6, "Tier 3": 0.15, "Tier 4": 0.05 },
  },
  {
    minXp: 501,
    maxXp: 1000,
    tiers: { "Tier 2": 0.2, "Tier 3": 0.5, "Tier 4": 0.25, Epic: 0.05 },
  },
  {
    minXp: 1001,
    maxXp: 5000,
    tiers: { "Tier 3": 0.3, "Tier 4": 0.4, Epic: 0.25, Legendary: 0.05 },
  },
];
