// 3-rd party
// utils
// types
import type { Tcsoc, ReadonlyCsocStatusToColor, TcsocStatus } from './types';
import type { SortingFn, Row } from '@tanstack/react-table';

export const colorByStatus: ReadonlyCsocStatusToColor = {
  Connected: 'var(--Color-System-Live, #00ffa3)',
  Disconnected: 'var(--Color-Status-Error-1, #ec6239)',
  'On boarding': 'var(--Color-Charts-Assets-Asset-A, #3469c2)',
  'On Boarding': 'var(--Color-Charts-Assets-Asset-A, #3469c2)',
  Disabled: 'var(--Color-System-System-6, #afbdd1)'
};

export const getStatuses = (): TcsocStatus[] => ['Connected', 'Disconnected', 'On Boarding', 'Disabled'];

export const sortStatusFn: SortingFn<Tcsoc> = (rowA: Row<Tcsoc>, rowB: Row<Tcsoc>, _columnId: string): number => {
  const statusA = rowA.original.status;
  const statusB = rowB.original.status;
  const statusOrder: TcsocStatus[] = getStatuses();
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export const sortVersionFn: SortingFn<Tcsoc> = (rowA: Row<Tcsoc>, rowB: Row<Tcsoc>, _columnId: string): -1 | 0 | 1 => {
  const statusA = rowA.original.version.split('.');
  const statusB = rowB.original.version.split('.');
  for (let idx = 0; idx < statusA.length; idx++) {
    if (statusA[idx] > statusB[idx]) return 1;
    if (statusA[idx] < statusB[idx]) return -1;
  }
  return 0;
};
