import { useEffect, useRef } from 'react';

import { scrambleText } from 'motion-plus-dom';

type Props = {
  texts: string[];
  duration?: number;
  interval?: number;
  delay?: number;
};

const ScrambleTextCycle = ({
  texts,
  duration = 1,
  interval = 0.05,
  delay = 2000,
}: Props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current as HTMLSpanElement;
    let currentIndex = 0;
    let controls: ReturnType<typeof scrambleText> | null = null;

    const runScramble = () => {
      el.textContent = texts[currentIndex];
      controls = scrambleText(el, {
        chars: '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡',
        duration,
        interval,
      });
    };

    runScramble();

    const timer = setInterval(() => {
      controls?.stop();
      currentIndex = (currentIndex + 1) % texts.length;
      runScramble();
    }, delay);

    return () => {
      clearInterval(timer);
      controls?.stop();
    };
  }, [texts, duration, interval, delay]);

  return <span ref={ref} />;
};

export default ScrambleTextCycle;
