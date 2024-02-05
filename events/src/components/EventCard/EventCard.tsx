import { Link } from 'react-router-dom';
import { Event } from '../../types';
import styles from './styles.module.css';

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link to={`/event/${event.id}`} className={styles.eventLink}>
      <div className={styles.card}>
        <h3 className={styles.title}>{event.name}</h3>
        <p className={styles.date}>
          {new Date(event.date).toLocaleDateString()}
        </p>
        <p className={styles.description}>{event.description}</p>
      </div>
    </Link>
  );
}
