"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const PlayerPanel = ({ character }: { character: any }) => {
  const [cash, setCash] = useState<number>(character.cash);
  return (
    <div key={character.id} className="flex flex-col gap-2">
      <h3 className="text-lg font-bold">{character.name}</h3>
      <p className="text-sm">Age: {character.age}</p>
      <p className="text-sm">Gender: {character.gender}</p>
      <p className="text-sm">Money: {cash}</p>
      <p className="text-sm">Bank: {character.bank}</p>
      <Button
        variant={"outline"}
        onClick={() => setCash((prevCash) => prevCash + 100)}
      >
        Add money
      </Button>
    </div>
  );
};

export default PlayerPanel;
