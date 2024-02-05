import request from 'supertest';
import app from '../../app';

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest
    .fn()
    .mockImplementation(() =>
      JSON.stringify([{ id: '1', name: 'Test Event' }])
    ),
  writeFileSync: jest.fn(),
}));

const newEvent = {
  name: 'New Event',
  date: '2023-01-01',
  description: 'A new test event',
  tickets: [
    {
      name: 'General Admission',
      type: 'adult',
      price: 20.0,
      bookingFee: 2.0,
      availability: 'available',
    },
  ],
};

describe('Event Routes', () => {
  describe('GET /events', () => {
    it('should return all events', async () => {
      const response = await request(app).get('/api/events');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /events', () => {
    it('should create a new event', async () => {
      const response = await request(app).post('/api/events').send(newEvent);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toStrictEqual({
        ...newEvent,
        id: response.body.id,
      });
    });
  });

  describe('GET /events/:eventId', () => {
    it('should return the event for a given id', async () => {
      const eventId = '1';
      const response = await request(app).get(`/api/events/${eventId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', eventId);
    });

    it('should return 404 for a non-existing event id', async () => {
      const response = await request(app).get('/api/events/nonExistingId');
      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /events/:eventId', () => {
    it('should update an existing event and return the updated event', async () => {
      const eventId = '1';

      const response = await request(app)
        .put(`/api/events/${eventId}`)
        .send(newEvent);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id', eventId);
      expect(response.body.name).toBe(newEvent.name);
    });

    it('should return 404 for attempting to update a non-existing event', async () => {
      const response = await request(app)
        .put('/api/events/nonExistingId')
        .send(newEvent);
      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /events/:eventId', () => {
    it('should delete an existing event and return a success message', async () => {
      const eventId = '1';
      const response = await request(app).delete(`/api/events/${eventId}`);
      expect(response.statusCode).toBe(204);
    });

    it('should return 404 for attempting to delete a non-existing event', async () => {
      const response = await request(app).delete('/api/events/nonExistingId');
      expect(response.statusCode).toBe(404);
    });
  });
});
