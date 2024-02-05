import fs from 'fs';
import { randomBytes } from 'crypto';
import { generateUniqueId, readEventsData, writeEventsData } from '../../utils';
import { Event } from '../../types';

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Test Event',
    date: '2023-01-01',
    description: 'This is a sample event for testing.',
    tickets: [
      {
        name: 'General Admission',
        type: 'adult',
        price: 100.0,
        bookingFee: 10.0,
        availability: 'available',
      },
      {
        name: 'Family Pack',
        type: 'family',
        price: 250.0,
        bookingFee: 20.0,
        availability: 'sold out',
      },
      {
        name: 'Child Ticket',
        type: 'child',
        price: 50.0,
        bookingFee: 5.0,
        availability: 'available',
      },
    ],
  },
];

jest.mock('fs');
jest.mock('crypto');

describe('Utility Functions', () => {
  beforeEach(() => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockImplementation(() =>
      JSON.stringify(mockEvents)
    );
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    (randomBytes as jest.Mock).mockReturnValue({ toString: () => 'uniqueId' });
    jest.clearAllMocks();
  });
  describe('readEventsData', () => {
    it('reads and parses the events data from a file', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockEvents)
      );

      const events = await readEventsData();
      expect(events).toEqual(mockEvents);
      expect(fs.existsSync).toHaveBeenCalledWith(expect.any(String));
      expect(fs.readFileSync).toHaveBeenCalledWith(expect.any(String), 'utf8');
    });

    it('returns an empty array if the file does not exist', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const events = await readEventsData();
      expect(events).toEqual([]);
    });
  });

  describe('writeEventsData', () => {
    it('writes the events data to a file', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

      await writeEventsData(mockEvents);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        expect.any(String),
        JSON.stringify(mockEvents, null, 2),
        'utf8'
      );
    });
  });

  describe('generateUniqueId', () => {
    it('generates a unique ID', () => {
      const mockId = '1234567890abcdef';
      (randomBytes as jest.Mock).mockReturnValue({ toString: () => mockId });

      const id = generateUniqueId();
      expect(id).toBe(mockId);
      expect(randomBytes).toHaveBeenCalledWith(16);
    });
  });
});
