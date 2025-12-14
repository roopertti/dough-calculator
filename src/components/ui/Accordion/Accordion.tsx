import * as stylex from '@stylexjs/stylex';
import { animations, colors, easing, radius, spacing } from '../../../styles/tokens.stylex';
import Collapsible from '../Collapsible/Collapsible';

export interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

const styles = stylex.create({
  accordion: {
    marginBottom: spacing.lg,
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.bgSecondary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.md,
    cursor: 'pointer',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    textAlign: 'left',
    transition: `all ${animations.durationFast} ${easing.standard}`,
    ':hover': {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    ':focus': {
      outline: `2px solid ${colors.primary}`,
      outlineOffset: '2px',
    },
  },
  title: {
    flex: 1,
  },
  chevron: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `transform ${animations.durationNormal} ${easing.standard}`,
  },
  chevronOpen: {
    transform: 'rotate(180deg)',
  },
  content: {
    padding: `${spacing.lg} 0`,
  },
});

export default function Accordion({
  title,
  isOpen,
  onToggle,
  children,
  className,
}: AccordionProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  const accordionProps = stylex.props(styles.accordion);

  return (
    <div
      {...accordionProps}
      className={className ? `${accordionProps.className} ${className}` : accordionProps.className}
    >
      <button
        type="button"
        {...stylex.props(styles.header)}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
      >
        <span {...stylex.props(styles.title)}>{title}</span>
        <svg
          {...stylex.props(styles.chevron, isOpen && styles.chevronOpen)}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Collapsible isOpen={isOpen}>
        <div {...stylex.props(styles.content)}>{children}</div>
      </Collapsible>
    </div>
  );
}
