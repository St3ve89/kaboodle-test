import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useEvents from '../../hooks/useEvents';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import Ticket from '../../components/Ticket/Ticket';
import Button from '../../components/Button/Button';

export default function EventDetails() {
  const { eventId } = useParams();
  const { fetchEventById, deleteEvent, selectedEvent, isLoading } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId);
    }
  }, [eventId, fetchEventById]);

  const handleDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      navigate('/events');
    }
  };

  if (isLoading) return <div>Loading event details...</div>;
  if (!selectedEvent) return <div>No event found</div>;

  return (
    <div className={styles.container}>
      <h2>{selectedEvent.name}</h2>
      <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
      <p>{selectedEvent.description}</p>
      <h3>Tickets</h3>
      <ul>
        {selectedEvent.tickets.map((ticket) => (
          <li key={ticket.name}>
            <Ticket
              availability={ticket.availability}
              name={ticket.name}
              price={+ticket.price}
              type={ticket.type}
              bookingFee={+ticket.bookingFee}
            />
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <Link to={`/edit/${selectedEvent.id}`}>
          <Button>Edit</Button>
        </Link>

        <Button onClick={handleDelete} color="danger">
          Delete
        </Button>
      </div>
    </div>
  );
}
