import { Request, Response } from 'express';
import {
  findEventIndex,
  generateUniqueId,
  readEventsData,
  writeEventsData,
} from '../utils';

export async function getEvents(req: Request, res: Response) {
  try {
    const events = await readEventsData();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to read events.' });
  }
}

export async function addEvent(req: Request, res: Response) {
  try {
    const events = await readEventsData();
    const newEvent = { ...req.body, id: generateUniqueId() };
    const updatedEvents = [...events, newEvent];

    await writeEventsData(updatedEvents);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add event.' });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const events = await readEventsData();
    const eventIndex = findEventIndex(events, eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    events[eventIndex] = { ...events[eventIndex], ...req.body };

    await writeEventsData(events);
    res.status(200).json(events[eventIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event.' });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const events = await readEventsData();
    const eventIndex = findEventIndex(events, eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    events.splice(eventIndex, 1);

    await writeEventsData(events);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event.' });
  }
}

export async function getEventById(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const events = await readEventsData();
    const eventIndex = findEventIndex(events, eventId);

    if (eventIndex === -1) {
      res.status(404).json({ message: 'Event not found.' });
    } else {
      const event = events[eventIndex];
      res.status(200).json(event);
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: 'Failed to read event.', error: error.message });
    }
  }
}
