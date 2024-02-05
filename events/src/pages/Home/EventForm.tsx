import styles from './styles.module.css';
import TextInput from '../../components/Form/TextInput';
import TextArea from '../../components/Form/TextArea';
import SelectInput from '../../components/Form/SelectInput';
import { useEventForm } from '../../hooks/useEventForm';
import Button from '../../components/Button/Button';

export default function EventForm() {
  const {
    formData,
    errors,
    handleChange,
    addTicket,
    removeTicket,
    handleSubmit,
  } = useEventForm();

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
      <h2 className={styles.formTitle}>Create Event</h2>
      <TextInput
        name="name"
        value={formData.name}
        onChange={handleChange}
        label="Event Name"
        required
        error={errors.name}
      />
      <TextInput
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        label="Event Date"
        required
        error={errors.date}
      />
      <TextArea
        name="description"
        value={formData.description}
        onChange={handleChange}
        label="Event Description"
        required
        error={errors.description}
      />
      {formData.tickets.map((ticket, index) => (
        <div key={index} className={styles.ticketSection}>
          <h3>Ticket {index + 1}</h3>
          <TextInput
            name={`tickets[${index}].name`}
            label="Ticket Name"
            value={ticket.name}
            onChange={(e) => handleChange(e, index)}
            required
            error={errors[`tickets[${index}].name`]}
          />
          <SelectInput
            name={`tickets[${index}].type`}
            label="Ticket Type"
            value={ticket.type}
            onChange={(e) => handleChange(e, index)}
            options={[
              { value: 'adult', label: 'Adult' },
              { value: 'family', label: 'Family' },
              { value: 'child', label: 'Child' },
            ]}
            required
            error={errors[`tickets[${index}].type`]}
          />
          <TextInput
            name={`tickets[${index}].price`}
            type="number"
            min={0}
            label="Ticket Price"
            value={ticket.price}
            onChange={(e) => handleChange(e, index)}
            required
            error={errors[`tickets[${index}].price`]}
          />
          <TextInput
            name={`tickets[${index}].bookingFee`}
            type="number"
            label="Booking Fee"
            min={0}
            value={ticket.bookingFee}
            onChange={(e) => handleChange(e, index)}
            required
            error={errors[`tickets[${index}].bookingFee`]}
          />
          <SelectInput
            name={`tickets[${index}].availability`}
            label="Ticket Availability"
            value={ticket.availability}
            onChange={(e) => handleChange(e, index)}
            options={[
              { value: 'available', label: 'Available' },
              { value: 'sold out', label: 'Sold Out' },
            ]}
            required
            error={errors[`tickets[${index}].availability`]}
          />
          {formData.tickets.length > 1 && (
            <Button onClick={() => removeTicket(index)} color="danger">
              Remove Ticket
            </Button>
          )}
        </div>
      ))}
      <div className={styles.btnGroup}>
        <Button onClick={addTicket}>Add Another Ticket</Button>
        <Button type="submit">Submit Event</Button>
      </div>
    </form>
  );
}
