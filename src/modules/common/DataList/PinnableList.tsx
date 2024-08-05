import React from 'react';
//style
import './pinnable_list.css';
// 3rd-party
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
  RowPinningState,
  Table,
  useReactTable,
  getSortedRowModel
} from '@tanstack/react-table';
// -- END TABLE MUI

// Components
import { ListFilters } from './Filters';
// store & context & utils
import { panicOnDev } from '../../../utils/commonMethods';
import { exportToCsv } from './helpers';
// Types
import type { SortingState } from '@tanstack/react-table';
import * as T from './types';

const defaultOptions: T.ListDefaultOptions = {
  defualtView: 'rows'
};

// List Component - Main Logic
// ===========================================================
export function DataList<Tdata>({
  columns,
  data,
  initialState = {},
  options = defaultOptions,
  tableOptions
}: T.ListProps<Tdata>): JSX.Element {
  // validations
  const isAllowdCardView = options.CardCmp;
  const isCardVaiolation = panicOnDev(
    !(options.defualtView === 'cards' && !isAllowdCardView),
    "Card view is not allowed but default view is set to 'cards'"
  );
  if (isCardVaiolation) {
    options.defualtView === 'rows';
  }

  //layout states
  const [layout, setLayout] = React.useState<T.TDataListViewOptions>(options.defualtView);
  const changeLayout = (): void => (layout === 'rows' && isAllowdCardView ? setLayout('cards') : setLayout('rows'));

  //table states
  const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
    top: []
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable<Tdata>({
    data,
    columns,
    initialState: initialState,
    autoResetAll: false,
    state: {
      expanded,
      rowPinning,
      sorting
    },
    onExpandedChange: setExpanded,
    onRowPinningChange: setRowPinning,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugRows: false,
    ...tableOptions
  });

  return (
    <div className='data-list__wrapper'>
      <div className='data-list__toolbar'>
        {options.ToolbarCmp ? (
          <options.ToolbarCmp
            data={data}
            headerGroups={table.getHeaderGroups()}
            table={table}
            controls={{ changeLayout, exportToCsv, currentLayout: layout }}
            options={options.filterOptions}
          />
        ) : (
          <ListFilters
            data={data}
            headerGroups={table.getHeaderGroups()}
            table={table}
            controls={{ changeLayout, exportToCsv }}
            options={options.filterOptions}
          />
        )}
        {/* END LIST FILTER */}
      </div>

      {layout === 'rows' ? (
        <div
          className='data-list__container data-list__container--rows'
          style={{ color: 'var(--text-primary)' }}
        >
          <table className='data-list__table--rows'>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => {
                if (headerGroup.depth > 1) {
                  throw new Error('headerGroup may not supported');
                }
                return (
                  <tr className='data-list__rows-headers' key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return header.isPlaceholder ? null : (
                        <th className='data-list__rows-header' key={header.id} colSpan={header.colSpan}>
                          <div
                            /* eslint-disable @typescript-eslint/indent */
                            className={`data-list__rows-header-title data-list__rows-header-title--${header.column.getCanSort() ? 'sortable' : 'not-sortable'
                              }`}
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === 'asc'
                                  ? 'Sort ascending'
                                  : header.column.getNextSortingOrder() === 'desc'
                                    ? 'Sort descending'
                                    : 'Clear sort'
                                : undefined
                              /* eslint-enable @typescript-eslint/indent */
                            }
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            <div className='data-list__rows-header-sort-icon-wrapper'>
                              <i
                                className='data-list__rows-header-sort-icon'
                                data-sort={header.column.getIsSorted() || 'not-sorted'}
                              >
                                {{
                                  asc: ' ▲',
                                  desc: ' ▼'
                                }[header.column.getIsSorted() as string] ?? ' ▼'}
                              </i>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody className='data-list__rows-content'>
              {table.getSortedRowModel().rows.map((row) => {
                return <UnPinnedTableRow key={row.id} row={row} table={table} />;
              })}
            </tbody>
          </table>
        </div>
      ) : options.CardCmp ? (
        // ============= CARDS LAYOUT ==============
        <div className='data-list__container data-list__container--cards'>
          {
            // IF cards are pinnable - render top
            options.isCardPinnable && (
              <div className='data-list__cards-content data-list__cards--pin-top'>
                {table.getTopRows().map((row) => (
                  /* eslint-disable @typescript-eslint/no-non-null-assertion */
                  <PinableCard key={row.id} row={row} CardCmp={options.CardCmp!} />
                  /* eslint-disable @typescript-eslint/no-non-null-assertion */
                ))}
              </div>
            )
          }

          {
            /** @description: IF cards are pinnable - render seperator */
            options.isCardPinnable && (
              <hr
                className={`data-list__cards-seperator-for-pinned data-list__cards-seperator-for-pinned--${rowPinning.top?.length ? 'visible' : 'hidden'
                  }`}
                style={{ width: 'fullWidth', color: '#8593A4' }}
              />
            )
          }
          <div className='data-list__cards-content data-list__cards--main'>
            {table.getCenterRows().map((row) => (
              /* eslint-disable @typescript-eslint/no-non-null-assertion */
              <PinableCard key={row.id} row={row} CardCmp={options.CardCmp!} />
              /* eslint-disable @typescript-eslint/no-non-null-assertion */
            ))}
          </div>
        </div>
      ) : (
        <> This Shouldn't be possible </>
      )}
    </div>
  );
}

function PinnedTableRow<Tdata>({ row }: { row: Row<Tdata>; table: Table<Tdata> }): JSX.Element {
  return (
    <tr
      style={{
        backgroundColor: 'darkblue',
        position: 'sticky',
        top: row.getIsPinned() === 'top' ? `${row.getPinnedIndex() * 26 + 48}px` : undefined
      }}
    >
      {row
        .getVisibleCells()
        .map((cell: T.Cell<Tdata, unknown>) => flexRender(cell.column.columnDef.cell, cell.getContext()))}
    </tr>
  );
}

function UnPinnedTableRow<Tdata>({ row }: { row: Row<Tdata>; table: Table<Tdata> }): JSX.Element {
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell: T.Cell<Tdata, unknown>) => (
        <React.Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</React.Fragment>
      ))}
    </tr>
  );
}

function PinableCard<Tdata>({
  row,
  CardCmp
}: {
  row: Row<Tdata>;
  CardCmp: React.FC<T.CardCmpProps<Tdata>>;
}): JSX.Element {
  return (
    <CardCmp
      data={row.original as any}
      doPin={(): void => row.pin('top')}
      unPin={(): void => row.pin(false)}
      isPinned={row.getIsPinned()}
    ></CardCmp>
  );
}
