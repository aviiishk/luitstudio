"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type HeadingElement = "h1" | "h2" | "h3";

interface AnimatedHeadlineProps {
  text: string;
  secondLineText?: string;
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

/**
 * Per-character stagger is driven by CSS keyframes (see .animated-headline-character
 * in globals.css), not Framer Motion components. A headline can produce 40+ characters,
 * and mounting that many motion.span instances competes with the hero's LCP paint for
 * main-thread time; plain spans with animation-delay give the identical effect for free.
 */
function AnimatedText({
  text,
  delay,
  active,
  keyPrefix,
}: {
  text: string;
  delay: number;
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
          const charDelay = delay + currentIndex * LETTER_STAGGER;

          return (
            <span
              key={`${keyPrefix}-${tokenIndex}-${index}`}
              className={`animated-headline-character motion-enhanced inline-block${
                active ? " is-active" : ""
              }`}
              style={{
                animationDuration: `${LETTER_DURATION}s`,
                animationDelay: `${charDelay}s`,
              }}
            >
              {character}
            </span>
          );
        })}
      </span>
    );
  });
}

export function AnimatedHeadline({
  text,
  secondLineText,
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
  const normalizedSecondLineText = secondLineText?.trim();
  const normalizedItalicText = italicText?.trim();
  const accessibleText = [
    normalizedText,
    normalizedSecondLineText,
    normalizedItalicText,
  ]
    .filter(Boolean)
    .join(" ");
  const secondLineDelay =
    delay + countCharacters(normalizedText) * LETTER_STAGGER;
  const italicBaseDelay = normalizedSecondLineText
    ? secondLineDelay + countCharacters(normalizedSecondLineText) * LETTER_STAGGER
    : delay + countCharacters(normalizedText) * LETTER_STAGGER;
  const italicDelay = italicBaseDelay + ITALIC_PAUSE;
  const Heading = as;

  const secondLineContent: ReactNode = normalizedSecondLineText ? (
    <>
      <br />
      <AnimatedText
        text={normalizedSecondLineText}
        delay={secondLineDelay}
        active={active}
        keyPrefix="second-line"
      />
    </>
  ) : null;

  const italicContent: ReactNode = normalizedItalicText ? (
    <>
      {" "}
      <em className={italicClassName}>
        <AnimatedText
          text={normalizedItalicText}
          delay={italicDelay}
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
          active={active}
          keyPrefix="regular"
        />
        {secondLineContent}
        {italicContent}
      </span>
    </Heading>
  );
}
