import * as stylex from '@stylexjs/stylex';
import { useEffect, useRef, useState } from 'react';
import { animations, easing } from '../../../styles/tokens.stylex';

export interface CollapsibleProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

const styles = stylex.create({
  collapsible: {
    overflow: 'hidden',
    transition: `height ${animations.durationNormal} ${easing.decelerate}, opacity ${animations.durationNormal} ${easing.standard}`,
  },
  closed: {
    height: 0,
    opacity: 0,
  },
});

export default function Collapsible({ children, isOpen, className }: CollapsibleProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      // Measure the natural height of content
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);

      // After animation completes, remove fixed height to allow dynamic resizing
      const timer = setTimeout(() => {
        setHeight(undefined);
      }, 300); // Match animation duration

      return () => clearTimeout(timer);
    }
    // When closing, first set explicit height, then animate to 0
    const contentHeight = contentRef.current.scrollHeight;
    setHeight(contentHeight);

    // Force reflow to ensure height is applied before animating to 0
    requestAnimationFrame(() => {
      setHeight(0);
    });
  }, [isOpen]);

  const stylexProps = stylex.props(styles.collapsible, !isOpen && styles.closed);

  return (
    <div
      ref={contentRef}
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
      style={{
        height: height !== undefined ? `${height}px` : 'auto',
      }}
    >
      {children}
    </div>
  );
}
