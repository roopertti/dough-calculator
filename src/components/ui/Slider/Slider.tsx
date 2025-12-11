import * as stylex from '@stylexjs/stylex';
import { colors, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface SliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  helperText?: string;
  showValue?: boolean;
  className?: string;
}

const styles = stylex.create({
  sliderGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    display: 'block',
    marginBottom: spacing.sm,
    color: colors.textPrimary,
    fontWeight: 500,
  },
  value: {
    marginLeft: spacing.sm,
    fontWeight: 600,
  },
  helperText: {
    color: colors.textSecondary,
    fontSize: '0.9rem',
    fontWeight: 400,
    marginLeft: spacing.sm,
  },
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    backgroundColor: colors.border,
    outline: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    '::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      appearance: 'none',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: colors.primary,
      cursor: 'pointer',
    },
    '::-moz-range-thumb': {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: colors.primary,
      cursor: 'pointer',
      borderWidth: 0,
    },
  },
});

export default function Slider({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  helperText,
  showValue = true,
  className,
}: SliderProps) {
  const stylexProps = stylex.props(styles.sliderGroup);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      <label htmlFor={id} {...stylex.props(styles.label)}>
        {label}
        {showValue && (
          <span {...stylex.props(styles.value)}>
            {value}
            {unit}
          </span>
        )}
        {helperText && <span {...stylex.props(styles.helperText)}>{helperText}</span>}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        {...stylex.props(styles.slider)}
      />
    </div>
  );
}
