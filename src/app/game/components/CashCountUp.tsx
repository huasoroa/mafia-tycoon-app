"use client";

import { useEffect, useState } from "react";

import { CountUp } from "countup.js";

const CashCountUp = ({ cash }: { cash: number }) => {
  const [counter, updateCounter] = useState<CountUp | undefined>();

  useEffect(() => {
    if (counter) {
      counter.update(cash);
      return;
    }
    const newCounter = new CountUp("cash-counter", cash, {
      startVal: cash,
      duration: 0.3,
    });

    updateCounter(newCounter);
  }, [cash]);

  return <span id="cash-counter" />;
};

export default CashCountUp;
