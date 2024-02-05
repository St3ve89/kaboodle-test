import { useNavigate, useParams } from 'react-router-dom';
import { Event, TicketType, ValidationErrors } from '../types';
import { useEffect, useState } from 'react';
import useEvents from './useEvents';
import { validateEventForm } from '../utils/validateEventForm';

const defaultTicket: TicketType = {
  name: '',
  type: 'adult',
  price: 0,
  bookingFee: 0,
  availability: 'available',
};

export const useEventForm = (initialEvent?: Event) => {
  const { eventId } = useParams();
  const { fetchEventById, addEvent, updateEvent, selectedEvent } = useEvents();
  const [formData, setFormData] = useState<Event>({
    id: '',
    name: '',
    date: '',
    description: '',
    tickets: [defaultTicket],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (eventId) {
      fetchEventById(eventId);
    } else if (initialEvent) {
      setFormData(initialEvent);
    }
  }, [eventId, fetchEventById, initialEvent]);

  useEffect(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
    }
  }, [selectedEvent]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index = 0
  ) => {
    const { name, value } = event.target;
    if (name.startsWith('tickets')) {
      const fieldName = name.split('.')[1];
      const updatedTickets = formData.tickets.map((ticket, idx) =>
        idx === index ? { ...ticket, [fieldName]: value } : ticket
      );
      setFormData({ ...formData, tickets: updatedTickets });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    const updatedErrors = { ...errors };
    if (index !== undefined && name.startsWith('tickets')) {
      delete updatedErrors[`tickets[${index}].${name.split('.')[1]}`];
    } else {
      delete updatedErrors[name];
    }
    setErrors(updatedErrors);
  };

  const addTicket = () => {
    setFormData({ ...formData, tickets: [...formData.tickets, defaultTicket] });
  };

  const removeTicket = (index: number) => {
    const filteredTickets = formData.tickets.filter((_, idx) => idx !== index);
    setFormData({ ...formData, tickets: filteredTickets });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { formIsValid, errors } = validateEventForm(formData);

    if (!formIsValid) {
      setErrors(errors);
      return;
    }

    const payload = {
      ...formData,
      tickets: formData.tickets.map((ticket) => ({
        ...ticket,
        price: Number(ticket.price),
        bookingFee: Number(ticket.bookingFee),
      })),
    };

    try {
      if (eventId) {
        await updateEvent(eventId, payload);
      } else {
        await addEvent(payload);
      }

      navigate('/events');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    addTicket,
    removeTicket,
    handleSubmit,
  };
};
