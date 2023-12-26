import { useState } from 'react';

type Props = {
  defaultSlippage: string;
  defaultDeadline: string;
};

export const useBorrowSettings = ({
  defaultDeadline,
  defaultSlippage,
}: Props) => {
  const [deadlineValue, setDeadlineValue] = useState(defaultDeadline);
  const [slippageValue, setSlippageValue] = useState(defaultSlippage);

  const getDeadline = () => {
    const numVal = parseInt(deadlineValue);

    if(isNaN(numVal) || numVal < 1) return null

    return numVal
  };

  const getSlippage = () => {
    const numVal = parseFloat(slippageValue);

    if(isNaN(numVal) || numVal < 0) return null

    return numVal
  };

  const getValidSettings = () => {
    const slippage = getSlippage()
    const deadline = getDeadline()

    if(!slippage || !deadline) return null

    return {
      slippage,
      deadline
    }
  }

  return {
    deadlineValue,
    slippageValue,
    setDeadlineValue,
    setSlippageValue,
    getValidSettings
  };
};
