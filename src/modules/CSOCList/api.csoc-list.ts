// mocks
import { generateMockData } from 'src/modules/CSOCList/mock';
// types
/* eslint-disable @typescript-eslint/naming-convention, camelcase */
import type { Tcsoc, TcsocStatus, TStatusEnum, TcsocItemResponse, TCsocDataFetch } from './types';
/* eslint-disable @typescript-eslint/naming-convention, camelcase */

export async function fetchCsocData(): Promise<TCsocDataFetch> {
  const response = generateMockData(40) as TcsocItemResponse[];
  if (!Array.isArray(response)) {
    return { data: [], error: new Error('Failed') };
  }

  const result: Tcsoc[] = [];
  for (let j = 0; j < response.length; j++) {
    result.push(csocListDataItemAdapter(response[j]));
  }
  return new Promise((resolve) => resolve({ data: result, error: null }));
}

/** 
 * @returns Tcsoc 
 * @example of input 
  {
    "id": 2,    
    "name": "A",    
    "installed_version": "NA",
    "enabled_socs": 9,
    "cases": {
      "count": 135,
      "last_update": "2023-06-07T12:00:00Z"
    },
    "files": {
      "count": 215,
      "last_update": "2023-06-07T12:00:00Z"
    },
    "raw_data": {
      "count": 390,
      "last_update": "2023-06-07T12:00:00Z"
    },
    "warnings": [],
    "status": 3,
    "is_favourite": false
  }
*/
export const csocListDataItemAdapter = (data: TcsocItemResponse): Tcsoc => {
  return {
    id: data.id,
    name: data.name,
    version: data.installed_version,
    status: statusToString(data.status as TStatusEnum),
    isWarn: false /**@TODO: add it from data when backend is ready */,
    warningType: '',
    socs: data.enabled_socs,
    cases: data.cases.count,
    rawData: data.raw_data.count,
    files: data.files.count,
    casesUpdateDateTime: data.cases.last_update,
    rawDataUpdateDateTime: data.raw_data.last_update,
    filesUpdateDateTime: data.files.last_update,
    creationTime: Date.now() /**@TODO: add it from data when backend is ready */
  };
};

/**
 * @param statusAsInt - status as integer
 * @example of input 3 - output 'Disabled'
 * @Enum representing the possible statuses.
  Statuses Enum Reference = {
  connected: 0,
  disconnected: 1,
  on_boarding: 2,
  disabled: 3
  };
 * @returns status as string 
 */
function statusToString(statusAsInt: TStatusEnum): TcsocStatus {
  switch (statusAsInt) {
    case 0:
      return 'Connected';
    case 1:
      return 'Disconnected';
    case 2:
      return 'On Boarding';
    case 3:
      return 'Disabled';
    default:
      throw new Error('Invalid status');
  }
}
