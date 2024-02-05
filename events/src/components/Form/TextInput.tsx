import styles from './styles.module.css';

interface TextInputProps {
  name?: string;
  type?: 'text' | 'date' | 'number';
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  min?: number;
}

export default function TextInput({
  name,
  type = 'text',
  value,
  onChange,
  label,
  required = false,
  error,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        autoComplete="off"
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`${styles.formControl} ${error ? styles.isInvalid : ''}`}
        {...rest}
      />
      {error && <div className={styles.invalidFeedback}>{error}</div>}
    </div>
  );
}
