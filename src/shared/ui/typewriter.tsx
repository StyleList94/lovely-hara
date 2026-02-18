import { useState, type CSSProperties } from 'react';
import { delay, wrap } from 'motion';

import {
  Typewriter as MotionTypewriter,
  type TypingSpeed,
} from 'motion-plus/react';

type Props = {
  texts: string[];
  speed?: number | TypingSpeed;
  backspace?: 'character' | 'word' | 'all';
};

const cursor: CSSProperties = {
  width: '1.5rem',
  height: '0.25rem',
};

const Typewriter = ({ texts, speed, backspace = 'character' }: Props) => {
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
      replace="type"
      backspace={backspace}
      cursorBlinkRepeat={3}
    >
      {texts[currentTextIndex]}
    </MotionTypewriter>
  );
};

export default Typewriter;
