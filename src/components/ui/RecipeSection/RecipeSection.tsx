import * as stylex from '@stylexjs/stylex';
import { colors, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface RecipeSectionProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const styles = stylex.create({
  section: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.border,
    ':last-child': {
      borderBottomWidth: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },
  },
  sectionHeading: {
    margin: `0 0 ${spacing.md} 0`,
    color: colors.textPrimary,
    fontSize: '1.2rem',
  },
});

export default function RecipeSection({ children, title, className }: RecipeSectionProps) {
  const stylexProps = stylex.props(styles.section);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      <h3 {...stylex.props(styles.sectionHeading)}>{title}</h3>
      {children}
    </div>
  );
}
