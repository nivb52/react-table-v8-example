/**
 * @attention : work in progress - not tested yet
 * @abstract
 */
import React from 'react';
// 3rd-party

// store & context & utils
import { getCellType, highlightText } from './helpers';
// Types
import * as T from './types';

// @TODO: add toolbar
// import { NSGridToolbar, ToolbarFilter } from 'nsoc-fe-data-grid/dist/components/NSGridToolbar';
// @TODO: better types for TExpendCloumns use generic
// @TODO: getCellType should be in options

export function ListFilters<Tdata>({ headerGroups, table, options }: T.ListFiltersProps<Tdata>): JSX.Element {
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <table key={headerGroup.id}>
          <thead>
            <tr>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        {header.column.getCanFilter() ? (
                          <div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', maxWidth: '300px', padding: '14px' }}>
                              <Filter
                                column={header.column}
                                table={table}
                                cellType={getCellType(header.id)}
                                highlightTextClass={options?.highlightTextClass}
                              />
                            </div>
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
        </table>
      ))}
    </>
  );
}

// @TODO: get on filter change function ?
/**
 * @description build filter cmp based on cellType prop
 */
export function Filter<Tdata>({ column, cellType, highlightTextClass }: T.FilterProps<Tdata>): JSX.Element {
  // console.log(cellType);
  return cellType === 'number' ? (
    <div
      style={{
        display: 'flex',
        marginLeft: '0.5rem'
      }}
    >
      <input
        type='number'
        value={((column.getFilterValue() as any)?.[0] ?? '') as string}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        onChange={(ev) => column.setFilterValue((old: any) => [ev.target.value, old?.[1]])}
        placeholder={$t('', `Min`)}
        style={{
          borderWidth: 1,
          width: '6rem'
        }}
      />
      <input
        type='number'
        value={((column.getFilterValue() as any)?.[1] ?? '') as string}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        onChange={(ev) => column.setFilterValue((old: any) => [old?.[0], ev.target.value])}
        placeholder={$t('', `Max`)}
        style={{
          borderWidth: 1,
          width: '6rem'
        }}
      />
    </div>
  ) : cellType === 'select' ? (
    //<NSForm
    // formConfig={}
    ///>
    <div>TO ADD SELECT INPUT ELEMENT</div>
  ) : (
    <input
      type='text'
      value={(column.getFilterValue() ?? '') as string}
      onChange={(ev) => {
        column.setFilterValue(ev.target.value);
        if (highlightTextClass && typeof highlightTextClass === 'string') {
          highlightText(highlightTextClass, ev.target.value as string);
        }
      }}
      placeholder={`${$t('', 'Search')} ${column.id} ...`}
      style={{
        borderWidth: 1,
        width: '9rem'
      }}
    />
  );
}

/**
 * @description build filter cmp based on the first value in the models
 */
function BasicFilter<Tdata>({ column, table }: T.FilterProps<Tdata>): JSX.Element {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  return typeof firstValue === 'number' ? (
    <div
      style={{
        display: 'flex',
        marginLeft: '0.5rem'
      }}
    >
      <input
        type='number'
        value={((column.getFilterValue() as any)?.[0] ?? '') as string}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        onChange={(ev) => column.setFilterValue((old: any) => [ev.target.value, old?.[1]])}
        placeholder={$t('', `Min`)}
        style={{
          borderWidth: 1,
          width: '6rem'
        }}
      />
      <input
        type='number'
        value={((column.getFilterValue() as any)?.[1] ?? '') as string}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        onChange={(ev) => column.setFilterValue((old: any) => [old?.[0], ev.target.value])}
        placeholder={$t('', `Max`)}
        style={{
          borderWidth: 1,
          width: '6rem'
        }}
      />
    </div>
  ) : (
    <input
      type='text'
      value={(column.getFilterValue() ?? '') as string}
      onChange={(ev): void => {
        column.setFilterValue(ev.target.value);
      }}
      placeholder={`${$t('', 'Search')} ${column.id} ...`}
      style={{
        borderWidth: 1,
        width: '9rem'
      }}
    />
  );
}
