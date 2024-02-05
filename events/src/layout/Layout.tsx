import { ReactNode } from 'react';
import Navigation from '../components/Navigation/Navigation';
import styles from './styles.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navigation />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
