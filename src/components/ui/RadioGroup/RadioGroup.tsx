import * as stylex from '@stylexjs/stylex';
import { colors, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const styles = stylex.create({
  radioGroupContainer: {
    marginBottom: spacing.lg,
  },
  groupLabel: {
    display: 'block',
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    fontWeight: 500,
  },
  radioGroup: {
    display: 'flex',
    gap: spacing.lg,
    flexWrap: 'wrap',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    cursor: 'pointer',
    fontWeight: 400,
    color: colors.textPrimary,
  },
  radioInput: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
});

export default function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  className,
}: RadioGroupProps) {
  const stylexProps = stylex.props(styles.radioGroupContainer);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {label && <div {...stylex.props(styles.groupLabel)}>{label}</div>}
      <div {...stylex.props(styles.radioGroup)}>
        {options.map((option) => (
          <label key={option.value} {...stylex.props(styles.radioLabel)}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              {...stylex.props(styles.radioInput)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
