"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type HeadingElement = "h1" | "h2" | "h3";

interface AnimatedHeadlineProps {
  text: string;
  italicText?: string;
  delay?: number;
  className?: string;
  italicClassName?: string;
  id?: string;
  as?: HeadingElement;
  animateOnView?: boolean;
}

const LETTER_DURATION = 0.55;
const LETTER_STAGGER = 0.022;
const ITALIC_PAUSE = 0.14;

function countCharacters(value: string) {
  return Array.from(value).filter((character) => !/\s/.test(character)).length;
}

function AnimatedText({
  text,
  delay,
  reducedMotion,
  active,
  keyPrefix,
}: {
  text: string;
  delay: number;
  reducedMotion: boolean;
  active: boolean;
  keyPrefix: string;
}) {
  let characterIndex = 0;

  return text.split(/(\s+)/).map((token, tokenIndex) => {
    if (/^\s+$/.test(token)) {
      return token;
    }

    return (
      <span
        key={`${keyPrefix}-word-${tokenIndex}`}
        className="inline-block whitespace-nowrap"
      >
        {Array.from(token).map((character, index) => {
          const currentIndex = characterIndex;
          characterIndex += 1;

          return (
            <motion.span
              key={`${keyPrefix}-${tokenIndex}-${index}`}
              className="animated-headline-character motion-enhanced inline-block"
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 20, filter: "blur(8px)", scale: 0.96 }
              }
              animate={
                active
                  ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
                  : { opacity: 0, y: 20, filter: "blur(8px)", scale: 0.96 }
              }
              transition={{
                duration: reducedMotion ? 0 : LETTER_DURATION,
                delay: reducedMotion
                  ? 0
                  : delay + currentIndex * LETTER_STAGGER,
                ease: "easeOut",
              }}
            >
              {character}
            </motion.span>
          );
        })}
      </span>
    );
  });
}

export function AnimatedHeadline({
  text,
  italicText,
  delay = 0,
  className,
  italicClassName,
  id,
  as = "h1",
  animateOnView = false,
}: AnimatedHeadlineProps) {
  const headingRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(headingRef, { once: true, amount: 0.4 });
  const reducedMotion = Boolean(shouldReduceMotion);
  const active = reducedMotion || !animateOnView || isInView;
  const normalizedText = text.trim();
  const normalizedItalicText = italicText?.trim();
  const accessibleText = [normalizedText, normalizedItalicText]
    .filter(Boolean)
    .join(" ");
  const italicDelay =
    delay + countCharacters(normalizedText) * LETTER_STAGGER + ITALIC_PAUSE;
  const Heading = as;

  const italicContent: ReactNode = normalizedItalicText ? (
    <>
      {" "}
      <em className={italicClassName}>
        <AnimatedText
          text={normalizedItalicText}
          delay={italicDelay}
          reducedMotion={reducedMotion}
          active={active}
          keyPrefix="italic"
        />
      </em>
    </>
  ) : null;

  return (
    <Heading id={id} className={className} aria-label={accessibleText}>
      <span ref={headingRef} aria-hidden="true">
        <AnimatedText
          text={normalizedText}
          delay={delay}
          reducedMotion={reducedMotion}
          active={active}
          keyPrefix="regular"
        />
        {italicContent}
      </span>
    </Heading>
  );
}
