import { generateMockData } from './mock';
import type * as T from './types';

export async function fetchSingleCsocData(_id: string): Promise<T.API_socDataFetch> {
  const response = generateMockData(Math.floor(Math.random() * 50))

  if (!Array.isArray(response)) {
    return { data: [], error: new Error('Invalid data response') };
  }

  const result: T.Isoc[] = [];
  for (let j = 0; j < response.length; j++) {
    result.push(csocListDataItemAdapter(response[j]));
  }

  return new Promise((resolve) => resolve({ data: result, error: null }));
}

const csocListDataItemAdapter = (data: T.API_socItemResponse): T.Isoc => {
  return {
    isWarn: data.warnings.length > 0,
    id: data.id,
    name: data.name,
    sector: data.sector,
    lat: data.lat,
    lon: data.lon,
    status: statusToString(data.status as T.API_StatusEnum),
    lastUpdate: data.last_update,
    lastModified: data.last_modified
  };
};

/**
 * @param statusAsInt - status as integer
 * @example of input 1 - output 'Disabled'
 * @Enum representing the possible statuses.
  Statuses Enum Reference = {
  enabled: 0,
  disabled: 1,
  };
 * @returns status as string 
 */
function statusToString(statusAsInt: unknown): T.SocStatus {
  switch (statusAsInt) {
    case 0:
      return 'Enabled';
    case 1:
      return 'Disabled';
    default:
      console.error(`Invalid status`);
      return 'N/A';
  }
}
