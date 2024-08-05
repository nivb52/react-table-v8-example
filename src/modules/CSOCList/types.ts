/** @section API TYPES */
export type TStatusEnum = 0 | 1 | 2 | 3;

export type TcsocItemResponse = {
  id: string;
  name: string;
  installed_version: string;
  enabled_socs: number;
  cases: {
    count: number;
    last_update: string;
  };
  files: {
    count: number;
    last_update: string;
  };
  raw_data: {
    count: number;
    last_update: string;
  };
  warnings: string[];
  status: TStatusEnum;
  is_favourite: boolean;
};

export type TCsocDataFetch = { data: Tcsoc[]; error: Error | null };
export type Tcsoc = {
  id: string;
  name: string;
  socs: number;
  version: string;
  status: TcsocStatus;
  isWarn: boolean;
  warningType: string;
  cases: number;
  casesUpdateDateTime: string;
  files: number;
  filesUpdateDateTime: string;
  rawData: number;
  rawDataUpdateDateTime: string;
  creationTime: number;
};
/** @section TABLE / DATA LIST TOOLBAR TYPES */

export type FilterableDataListIds = 'name' | 'status' | 'version';

export type TcsocStatus = 'Connected' | 'Disabled' | 'Disconnected' | 'On Boarding' | 'On boarding';
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type ReadonlyCsocStatusToColor = {
  readonly [K in TcsocStatus]: string;
};

export type SortingIds = '#_EMPTY_#' | 'creationTime' | 'name' | 'status' | 'version';

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type ReadonlySortingIds = {
  readonly [K in SortingIds]: string;
};

import type { ISelection, ISortSelectOptions, ISortableColumns } from 'src/types/ComponentTypes';
export type { SortDir } from 'src/types/ComponentTypes';

export type SortSelectOptions = ISortSelectOptions<SortingIds>;
export type SortableColumns = ISortableColumns<SortingIds>;
export type SortSelection = ISelection<SortingIds>;

export type StatusCount = { connected: number; onBording: number; disconnect: number; disabled: number };
/** @subsection STATUS BUTTON TYPES */
export interface IStatusButtonProps {
  label: string;
  status: TcsocStatus;
  count: number;
  toggleStatuses: (status: TcsocStatus) => void;
  isStatusExists: (status: TcsocStatus) => boolean;
}

export type StatusSelection = { display: string; id: TcsocStatus; value: TcsocStatus };
