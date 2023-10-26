import { ReactElement, useState } from 'react';

type UseMultiStepFormResult = {
  currentStepIndex: number;
  step: ReactElement;
  steps: ReactElement[];
  isFirstStep: boolean;
  isLastStep: boolean;
  goTo: (index: number) => void;
  next: () => void;
  back: () => void;
};
export function useMultiStepForm(steps: ReactElement[]): UseMultiStepFormResult {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  function next() {
    setCurrentStepIndex((i: number) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i: number) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
