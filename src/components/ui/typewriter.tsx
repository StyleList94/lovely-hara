import { useState, type CSSProperties } from 'react';
import { delay, wrap } from 'motion';

import {
  Typewriter as MotionTypewriter,
  type TypingSpeed,
} from 'motion-plus/react';

type Props = {
  texts: string[];
  speed?: number | TypingSpeed;
};

const cursor: CSSProperties = {
  width: '1.5rem',
  height: '0.25rem',
};

const Typewriter = ({ texts, speed }: Props) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  return (
    <MotionTypewriter
      as="span"
      cursorStyle={cursor}
      onComplete={() => {
        delay(
          () =>
            setCurrentTextIndex(wrap(0, texts.length, currentTextIndex + 1)),
          2,
        );
      }}
      speed={speed}
    >
      {texts[currentTextIndex]}
    </MotionTypewriter>
  );
};

export default Typewriter;
