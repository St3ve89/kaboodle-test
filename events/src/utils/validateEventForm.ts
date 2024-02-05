import { Event, ValidationErrors } from '../types';

export function validateEventForm(formData: Event): {
  formIsValid: boolean;
  errors: ValidationErrors;
} {
  let formIsValid = true;
  const errors: ValidationErrors = {};

  if (!formData.name.trim()) {
    formIsValid = false;
    errors['name'] = 'Event name is required.';
  }

  if (!formData.date.trim()) {
    formIsValid = false;
    errors['date'] = 'Event date is required.';
  } else if (new Date(formData.date) < new Date()) {
    formIsValid = false;
    errors['date'] = 'Event date cannot be in the past.';
  }

  if (!formData.description.trim()) {
    formIsValid = false;
    errors['description'] = 'Event description is required.';
  }

  formData.tickets.forEach((ticket, index) => {
    if (!ticket.name.trim()) {
      formIsValid = false;
      errors[`tickets[${index}].name`] = 'Ticket name is required.';
    }
    if (ticket.price <= 0) {
      formIsValid = false;
      errors[`tickets[${index}].price`] =
        'Ticket price must be greater than 0.';
    }
    if (ticket.bookingFee < 0) {
      formIsValid = false;
      errors[`tickets[${index}].bookingFee`] =
        'Booking fee cannot be negative.';
    }
  });

  return { formIsValid, errors };
}
