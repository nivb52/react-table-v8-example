import React from 'react';
// Style & Icons
import ExportIcon from '../../assets/icons/Export.svg';
// 3rd-party
import { createColumnHelper } from '@tanstack/react-table';
import TableCell from '../common/DataList/TableCell';
// Components
// store & context & utils
import { colorByStatus, sortVersionFn, sortStatusFn } from './helpers';

// Types
import type { ColumnDef } from '@tanstack/react-table';
import type { Tcsoc, TcsocStatus } from './types';

export default function Columns(): ColumnDef<Tcsoc>[] {
  /**@section columns defenition of csoc list */
  const columnHelper = createColumnHelper<Tcsoc>();
  const columnsq = [
    columnHelper.accessor('isWarn', {
      enableSorting: false, // disable sorting for this column
      header: () => '',
      cell: (info) =>
        info.getValue() ? (
          <TableCell key={info.cell.id}>
            <ExportIcon />
          </TableCell>
        ) : (
          <TableCell key={info.cell.id}></TableCell>
        )
    }),
    columnHelper.accessor('name', {
      id: 'name',
      sortingFn: 'alphanumeric', // use built-in sorting function by name
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Name')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    columnHelper.accessor('status', {
      sortingFn: sortStatusFn, // custom sorting function for this enum column
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Status')}</div>,
      cell: (info) => (
        <TableCell key={info.cell.id} style={{ color: colorByStatus[info.getValue() as TcsocStatus] }}>
          {info.getValue()}
        </TableCell>
      ),
      filterFn: 'arrIncludesSome'
    }),
    columnHelper.accessor('version', {
      id: 'version',
      sortingFn: sortVersionFn, // custom sorting function for this enum column
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Edge Version')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    /**@note extra detail in table (over card)*/
    columnHelper.accessor('socs', {
      sortingFn: 'basic',
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Enable Soc’s')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    columnHelper.accessor('cases', {
      sortingFn: 'basic',
      enableColumnFilter: false,
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Cases')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    columnHelper.accessor('rawData', {
      sortingFn: 'basic',
      enableColumnFilter: false,
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Raw Data')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    columnHelper.accessor('files', {
      sortingFn: 'basic',
      enableColumnFilter: false,
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Files')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    columnHelper.accessor('warningType', {
      /**@note extra detail in table (over card)*/
      sortingFn: 'text', // use built-in sorting function by name
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      enableColumnFilter: false,
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Warning')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    columnHelper.accessor('creationTime', {
      /**@note hidden field*/
      sortingFn: 'auto', // use built-in sorting function by name
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      enableColumnFilter: false,
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Created')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    })
  ] as ColumnDef<Tcsoc>[];
  //   const columns = React.useMemo<ColumnDef<Tcsoc>[]>((): ColumnDef<Tcsoc>[] => columnsq, []);

  return columnsq;
}
