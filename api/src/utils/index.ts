import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import { Event } from '../types';

const dataPath = path.join(__dirname, '..', 'data', 'events.json');

export async function readEventsData(): Promise<Event[]> {
  try {
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(jsonData) as Event[];
  } catch (error) {
    console.error('Error reading events data:', error);
    throw new Error('Failed to read events.');
  }
}

export async function writeEventsData(data: Event[]): Promise<void> {
  try {
    const dirPath = path.dirname(dataPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dataPath, jsonData, 'utf8');
  } catch (error) {
    console.error('Error writing events data:', error);
    throw new Error('Failed to write events.');
  }
}

export function generateUniqueId(): string {
  const id = randomBytes(16).toString('hex');
  return id;
}

export function findEventIndex(events: Event[], eventId: string): number {
  return events.findIndex((event) => event.id.toString() === eventId);
}
