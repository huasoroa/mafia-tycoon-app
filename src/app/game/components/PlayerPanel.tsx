"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import BankCountUp from "./BankCountUp";
import CashCountUp from "./CashCountUp";
import { SelectCharacter } from "@/server/db/schema";
import { toast } from "sonner";

const PlayerPanel = ({ character }: { character: SelectCharacter }) => {
  const [cash, setCash] = useState<number>(character.cash);
  const [animateMoney, setAnimateMoney] = useState<boolean>(false);
  const [bank, setBank] = useState<number>(character.bank);
  const [animateBank, setAnimateBank] = useState<boolean>(false);

  const handleAddMoneyClick = () => {
    setCash((prevCash) => prevCash + 100);
    setAnimateMoney(true);
  };

  const handleMoveToBankClick = () => {
    const currentCash = cash;
    setBank((prevBank) => prevBank + currentCash);
    setAnimateBank(true);
    setCash(0);
    toast.message("Money moved to bank", {
      description: `You have ${bank + currentCash} in your bank`,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Player</h2>
      <div className="grid grid-cols-2 pl-4 border-l-2 border-gray-500 h-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{character.name}</h3>
          <p className="text-sm">HP: {character.hp}</p>
          <Progress value={66} />
          <p className="text-sm">XP: {character.xp}</p>
          <Progress value={25} />
          <p className="text-sm">Age: {character.age}</p>
          <p className="text-sm">Gender: {character.gender}</p>
          <p
            className={`text-sm transition-colors ${animateMoney ? "animate-pulse text-green-800" : ""
              }`}
            onAnimationIteration={() => setAnimateMoney(false)}
          >
            Money: <CashCountUp cash={cash} />
          </p>
          <p
            className={`text-sm transition-colors ${animateBank ? "animate-pulse text-green-800" : ""
              }`}
            onAnimationIteration={() => setAnimateBank(false)}
          >
            Bank: <BankCountUp bank={bank} />
          </p>
          <Button variant={"outline"} onClick={handleAddMoneyClick}>
            Add money
          </Button>
          <Button
            variant={"outline"}
            onClick={handleMoveToBankClick}
            disabled={cash === 0}
          >
            Move money to bank
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
