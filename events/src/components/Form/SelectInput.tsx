import styles from './styles.module.css';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  name?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  options: Option[];
  required?: boolean;
  error?: string;
}

export default function SelectInput({
  name,
  value,
  onChange,
  label,
  options,
  required = false,
  error,
}: SelectInputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${styles.formControl} ${error ? styles.isInvalid : ''}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className={styles.invalidFeedback}>{error}</div>}
    </div>
  );
}
