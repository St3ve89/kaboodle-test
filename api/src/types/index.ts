export interface Ticket {
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
  tickets: Ticket[];
}
