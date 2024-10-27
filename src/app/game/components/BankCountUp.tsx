"use client";

import { useEffect, useState } from "react";

import { CountUp } from "countup.js";

const BankCountUp = ({ bank }: { bank: number }) => {
  const [counter, updateCounter] = useState<CountUp | undefined>();

  useEffect(() => {
    if (counter) {
      counter.update(bank);
      return;
    }
    const newCounter = new CountUp("bank-counter", bank, {
      startVal: bank,
      duration: 0.3,
    });

    updateCounter(newCounter);
  }, [bank]);

  return <span id="bank-counter" />;
};

export default BankCountUp;
