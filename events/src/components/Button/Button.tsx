import styles from './styles.module.css';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  color?: 'primary' | 'danger';
}

export default function Button({
  children,
  type = 'button',
  onClick,
  className = '',
  color = 'primary',
}: ButtonProps) {
  const colorClass = styles[color];
  return (
    <button
      type={type}
      className={`${styles.button} ${colorClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
