/** @section API TYPES */

import { KeysOfType } from 'types/UtilsTypes';

/* eslint-disable @typescript-eslint/naming-convention */
export type API_StatusEnum = 0 | 1;

export type API_socItemResponse = {
  id: string;
  name: string;
  sector: string;
  status: API_StatusEnum;
  lat: number;
  lon: number;
  last_update: string;
  last_modified: string;
  warnings: string[];
};

export type API_socDataFetch = { data: Isoc[]; error: Error | null };
/* eslint-disable @typescript-eslint/naming-convention */

/** @section VISUAL TYPES */

export interface Isoc {
  isWarn: boolean;
  id: string;
  name: string;
  sector: string;
  lat: number;
  lon: number;
  status: SocStatus;
  lastUpdate: string;
  lastModified: string;
}
export type Soc = {
  isWarn: boolean;
  id: string;
  name: string;
  sector: string;
  lat: number;
  lon: number;
  status: SocStatus;
  lastUpdate: string;
  lastModified: string;
};

export type SocStatus = 'Disabled' | 'Enabled' | 'N/A';

/** @section TABLE / DATA LIST  */
import type * as TL from '../common/DataList/types'; // uses @tanstack/react-table;

export interface TableStateWithMeta extends TL.TableState {
  meta: {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  };
}

/** @section TABLE / DATA LIST TOOLBAR TYPES */
export type FilterableDataListIds = 'name' | 'sector' | 'status';
export type SortingIds = KeysOfType<Isoc, any> | '#_EMPTY_#';

import type { ISelection, ISortSelectOptions, ISortableColumns } from 'types/ComponentTypes';
export type { SortDir } from 'types/ComponentTypes';

export type SortSelection = ISelection<SortingIds>;
export type SortSelectOptions = ISortSelectOptions<SortingIds>;
export type SortableColumns = ISortableColumns<SortingIds>;
export type StatusSelection = ISelection<SocStatus>;
// export type StatusSelection = { display: string; id: TcsocStatus; value: TcsocStatus };
export interface IStatusButtonProps {
  label: string;
  status: SocStatus;
  count: number;
  toggleStatuses: (status: SocStatus) => void;
  isStatusExists: (status: SocStatus) => boolean;
}
export interface IStatusCount {
  enabled: number;
  disabled: number;
}
