export interface TicketType {
  name: string;
  type: 'adult' | 'family' | 'child';
  price: number;
  bookingFee: number;
  availability: 'available' | 'sold out';
}

export interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  tickets: TicketType[];
}

export interface ValidationErrors {
  [key: string]: string;
}
