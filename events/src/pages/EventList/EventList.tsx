import { useState } from 'react';
import useEvents from '../../hooks/useEvents';
import EventCard from '../../components/EventCard/EventCard';
import TextInput from '../../components/Form/TextInput';
import styles from './styles.module.css';
import { Event } from '../../types';
import Button from '../../components/Button/Button';
import SelectInput from '../../components/Form/SelectInput';

export default function EventList() {
  const { events, isLoading, error, deleteEvent } = useEvents();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('date');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const sortEvents = (events: Event[]) => {
    return events.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const filteredAndSortedEvents = sortEvents(
    events.filter((event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <TextInput
          name="search"
          value={searchTerm}
          onChange={handleSearchChange}
          label="Search Events"
          placeholder="Type to search..."
        />
        <SelectInput
          value={sortField}
          label="Sort by:"
          onChange={(e) => setSortField(e.target.value as 'date' | 'name')}
          options={[
            { value: 'date', label: 'Sort by Date' },
            { value: 'name', label: 'Sort by Name' },
          ]}
        />
        <Button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort Order: {sortOrder.toUpperCase()}
        </Button>
      </div>

      <div className={styles.eventList}>
        {events.length === 0 ? (
          <div className={styles.noResults}>No events have been added yet.</div>
        ) : filteredAndSortedEvents.length > 0 ? (
          filteredAndSortedEvents.map((event) => (
            <EventCard key={event.id} event={event} onDelete={deleteEvent} />
          ))
        ) : (
          <div className={styles.noResults}>
            No events found matching your search.
          </div>
        )}
      </div>
    </>
  );
}
