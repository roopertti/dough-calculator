import * as stylex from '@stylexjs/stylex';
import { colors, radius, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface InputProps {
  id: string;
  label: string;
  type?: 'text' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
  className?: string;
}

const styles = stylex.create({
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    display: 'block',
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    fontWeight: 500,
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.sm,
    fontSize: '1rem',
    backgroundColor: colors.bgPrimary,
    color: colors.textPrimary,
    fontFamily: 'inherit',
    ':focus': {
      outline: 'none',
      borderColor: colors.primary,
    },
  },
  helperText: {
    display: 'block',
    marginTop: spacing.xs,
    color: colors.textSecondary,
    fontSize: '0.9rem',
  },
});

export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  min,
  max,
  step,
  helperText,
  className,
}: InputProps) {
  const stylexProps = stylex.props(styles.inputGroup);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        min={min}
        max={max}
        step={step}
        {...stylex.props(styles.input)}
      />
      {helperText && <span {...stylex.props(styles.helperText)}>{helperText}</span>}
    </div>
  );
}
