import { TicketType } from '../../types';
import styles from './styles.module.css';

export default function Ticket({
  name,
  type,
  price,
  bookingFee,
  availability,
}: TicketType) {
  const currencySymbol = '£';
  return (
    <div
      className={`${styles.ticketSelector} ${
        availability === 'sold out' ? styles.soldOut : ''
      }`}
    >
      <div className={styles.ticketLabels}>
        <span className={styles.ticketLabel}>
          {name} - {type}
        </span>
        <span className={styles.ticketLabelDesc}>
          <span className={styles.displayPriceValue}>
            {currencySymbol}
            {price.toFixed(2)}
          </span>
          <em className={styles.displayPriceBookingFee}>
            + {currencySymbol}
            {bookingFee.toFixed(2)} booking fee
          </em>
        </span>
      </div>
      <div className={styles.ticketCounter}>
        <span
          className={
            availability === 'sold out'
              ? styles.labelDanger
              : styles.labelAvailable
          }
        >
          {availability}
        </span>
      </div>
    </div>
  );
}
