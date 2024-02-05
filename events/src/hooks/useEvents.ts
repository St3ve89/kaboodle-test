import { useState, useEffect, useCallback } from 'react';
import { Event } from '../types';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/events`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
    setIsLoading(false);
  }, []);

  const fetchEventById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/api/events/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: Event = await response.json();
      setSelectedEvent(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addEvent = async (newEvent: Omit<Event, 'id'>) => {
    try {
      const response = await fetch(`${baseUrl}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setEvents((prevEvents) => [...prevEvents, data]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const updateEvent = async (id: string, updatedEvent: Partial<Event>) => {
    try {
      const response = await fetch(`${baseUrl}/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      fetchEvents(); // Refresh the events list to reflect the update
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    fetchEvents,
    fetchEventById,
    selectedEvent,
  };
}
