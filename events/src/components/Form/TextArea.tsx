import styles from './styles.module.css';

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  required?: boolean;
  error?: string;
}

export default function TextArea({
  name,
  value,
  onChange,
  label,
  required = false,
  error,
}: TextAreaProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`${styles.formControl} ${error ? styles.isInvalid : ''}`}
      ></textarea>
      {error && <div className={styles.invalidFeedback}>{error}</div>}
    </div>
  );
}
