import fs from 'fs';
import path from 'path';
import { AppStoreData } from '@/types';
import { initialStoreData } from '@/data/initialStore';
import { sanitizeObject } from './security';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data file exists with default values
export function getStoreData(): AppStoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialStoreData, null, 2), 'utf-8');
      return initialStoreData;
    }

    const fileContent = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(fileContent);
    return parsed as AppStoreData;
  } catch (error) {
    console.error('Error reading store data:', error);
    return initialStoreData;
  }
}

// Save updated store data with anti-injection sanitization
export function saveStoreData(newData: AppStoreData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Sanitize the entire object to prevent injection of malicious script tags or prototype pollution
    const sanitized = sanitizeObject(newData);

    fs.writeFileSync(DATA_FILE, JSON.stringify(sanitized, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving store data:', error);
    return false;
  }
}
