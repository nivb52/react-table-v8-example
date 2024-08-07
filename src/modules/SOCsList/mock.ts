import { generateRandomString, getRandomDate, getRandomInt } from 'src/mocks/helpers';

import * as T from './types';

/* eslint-disable @typescript-eslint/naming-convention, camelcase */
const statusesEnum = {
  enabled: 0,
  disabled: 1
};

// ==================================================================
/** @section MOCKING */
const generateItem = (): T.API_socItemResponse => ({
  id: generateRandomString(18),
  name: generateRandomName(8),
  sector: generateRandomSector(),
  lat: generateRandomLatitude(),
  lon: generateRandomLongitude(),
  last_update: getRandomDate(),
  last_modified: getRandomDate(),
  status: getRandomStatusInt(),
  warnings: []
});

// Generate mock data
export function generateMockData(count: number): T.API_socItemResponse[] {
  const mockData = [];
  for (let j = 0; j < count; j++) {
    const data = generateItem();
    mockData.push(data);
  }
  return mockData;
}

// ==================================================================
// Function to generate a random string of given length
function generateRandomName(length: number): string {
  let result = 'SOC-';
  for (let j = 0; j < length; j++) {
    result += `${Math.floor(Math.random() * 10)}`;
  }
  return result;
}

function generateRandomSector(): string {
  const sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Shipment'];
  const randomIndex = Math.floor(Math.random() * sectors.length);
  return sectors[randomIndex];
}

// Function to generate a random latitude
// Latitude ranges from -90 to 90 degrees
function generateRandomLatitude(): number {
  return getRandomInt(180, -90);
}

// Function to generate a random longitude
// Longitude ranges from -180 to 180 degrees
function generateRandomLongitude(): number {
  return getRandomInt(360, -180);
}

/* eslint-disable @typescript-eslint/indent */
function getRandomStatusInt(rand = Math.random()): T.API_StatusEnum {
  return rand < 0.3 ? (statusesEnum.disabled as T.API_StatusEnum) : (statusesEnum.enabled as T.API_StatusEnum);
}
