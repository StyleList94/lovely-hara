import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect, useState } from 'react';

type Props = {
  texts: string[];
  speed?: number;
  className?: string;
};

const Typewriter = ({ texts, speed = 0.1, className = '' }: Props) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    texts[currentTextIndex].slice(0, latest),
  );

  useEffect(() => {
    const currentText = texts[currentTextIndex];

    if (isTyping) {
      let timerId: NodeJS.Timeout;
      const controls = animate(count, currentText.length, {
        type: 'tween',
        duration: currentText.length * speed,
        ease: 'linear',
        onComplete: () => {
          timerId = setTimeout(() => {
            animate(count, 0, {
              duration: currentText.length * speed * 0.5,
              ease: 'linear',
              onComplete: () => {
                setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                setIsTyping(true);
              },
            });
          }, 4000);
        },
        onStop: () => {
          clearTimeout(timerId);
        },
      });
      return () => {
        controls.stop();
      };
    }

    return () => {};
  }, [count, currentTextIndex, texts, speed, isTyping]);

  return (
    <span className={className}>
      <motion.span>{displayText}</motion.span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.94,
          repeat: Infinity,
          ease: 'anticipate',
          repeatType: 'reverse',
        }}
      >
        _
      </motion.span>
    </span>
  );
};

export default Typewriter;
