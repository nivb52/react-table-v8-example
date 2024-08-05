import { generateRandomString, getRandomDate, getRandomInt } from 'src/mocks/helpers';
// types
import type { TcsocStatus, TStatusEnum, TcsocItemResponse } from './types';

/* eslint-disable @typescript-eslint/naming-convention, camelcase */
const statusesEnum = {
  connected: 0,
  disconnected: 1,
  on_boarding: 2,
  na: 3
};

// ==================================================================
/** @section MOCKING */
const generateItem = (): TcsocItemResponse => ({
  id: generateRandomString(18),
  name: generateRandomName(8),
  installed_version: Math.random() < 0.9 ? generateRandomVersion() : 'NA',
  enabled_socs: getRandomInt(1234),
  cases: {
    count: getRandomInt(1000),
    last_update: getRandomDate()
  },
  files: {
    count: getRandomInt(100),
    last_update: getRandomDate()
  },
  raw_data: {
    count: getRandomInt(500),
    last_update: getRandomDate()
  },
  warnings: [],
  status: getRandomStatusInt(),
  is_favourite: Math.random() > 0.95 ? true : false
});

// Generate mock data
export function generateMockData(count: number): TcsocItemResponse[] {
  const mockData = [];
  for (let j = 0; j < count; j++) {
    const data = generateItem();
    mockData.push(data);
  }
  return mockData;
}

// Function to generate a random string of given length
function generateRandomName(length: number): string {
  let result = 'CSOC-';
  for (let j = 0; j < length; j++) {
    result += `${Math.floor(Math.random() * 10)}`;
  }
  return result;
}

function generateRandomVersion(): string {
  return `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`;
}

function getRandomStatus(rand: number): TcsocStatus {
  return rand < 0.3 ? 'Disconnected' : rand > 0.6 ? 'Connected' : rand < 0.5 ? 'On Boarding' : 'Disabled';
}
/* eslint-disable @typescript-eslint/indent */
function getRandomStatusInt(rand = Math.random()): TStatusEnum {
  return rand < 0.3
    ? (statusesEnum.disconnected as TStatusEnum)
    : rand > 0.6
      ? (statusesEnum.connected as TStatusEnum)
      : rand < 0.5
        ? (statusesEnum.on_boarding as TStatusEnum)
        : (statusesEnum.na as TStatusEnum);
}
