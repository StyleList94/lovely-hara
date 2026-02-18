import { useState } from 'react';
import { delay, wrap } from 'motion';

import { ScrambleText as MotionScrambleText } from 'motion-plus/react';

type Props = {
  texts: string[];
  duration?: number;
  interval?: number;
};

const ScrambleTextCycle = ({ texts, duration = 1, interval = 0.05 }: Props) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  return (
    <MotionScrambleText
      as="span"
      duration={duration}
      interval={interval}
      chars="!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▀▄■□▪▫●○◆◇◈◊※†‡"
      onComplete={() => {
        delay(
          () =>
            setCurrentTextIndex(wrap(0, texts.length, currentTextIndex + 1)),
          2,
        );
      }}
    >
      {texts[currentTextIndex]}
    </MotionScrambleText>
  );
};

export default ScrambleTextCycle;
