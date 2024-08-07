import React from 'react';
// Style & Icons
import styles from './switch.module.css';
// workspace
import { WarningButton } from 'src/modules/common/Button/IconButton';
// 3rd-party
import { createColumnHelper } from '@tanstack/react-table';
import { useOnClickOutside } from 'usehooks-ts';
// Components
import TableCell from 'src/modules/common/DataList/TableCell';
import EditableCell, { useEditableCell } from 'src/modules/common/DataList/EditableCell';
// store & context & utils
// Types
import type * as TL from '../common/DataList/types'; // uses @tanstack/react-table;
import type * as T from './types';

/** @section Columns  */
export default function Columns(): TL.ColumnDef<T.Soc>[] {
  /**@section columns defenition of single soc data */
  const columnHelper = createColumnHelper<T.Soc>();
  const columnsq = [
    columnHelper.accessor('isWarn', {
      enableSorting: false, // disable sorting for this column
      header: () => '',
      cell: (info) =>
        info.getValue() ? (
          <TableCell key={info.cell.id}>
            <WarningButton
              size='small'
              style={{ transform: 'scale(0.8) translate3d(0, 15px, 0)' }}
              iconButtonColors={{ color: '#E7AE00' }}
            />
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
    columnHelper.accessor('id', {
      id: 'id',
      sortingFn: 'alphanumeric',
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'SOC ID')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    columnHelper.accessor('sector', {
      id: 'sector',
      sortingFn: 'alphanumeric',
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Sectors')}</div>,
      // cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
      cell: (info) => <EditableSelection info={info} />
    }),

    columnHelper.accessor('lat', {
      id: 'lat',
      sortingFn: 'basic',
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Geo location lat.')}</div>,
      cell: (info) => <Editable info={info} />
    }),
    columnHelper.accessor('lon', {
      id: 'lon',
      sortingFn: 'basic',
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Geo location long.')}</div>,
      cell: (info) => <Editable info={info} />
    }),

    columnHelper.accessor('status', {
      //   sortingFn: sortStatusFn, // custom sorting function for this enum column
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Status')}</div>,
      cell: (info) => <EditableSWitch info={info} />,
      filterFn: 'arrIncludesSome'
    }),

    columnHelper.accessor('lastUpdate', {
      /**@note hidden field*/
      sortingFn: 'auto', // use built-in sorting function by name
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      enableColumnFilter: false,
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Last Update')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    }),
    columnHelper.accessor('lastModified', {
      /**@note hidden field*/
      sortingFn: 'auto', // use built-in sorting function by name
      sortUndefined: 1, //force undefined values to the end
      sortDescFirst: false, //first sort order will be ascending (nullable values can mess up auto detection of sort order)
      enableColumnFilter: false,
      header: () => <div className='csoc-list--head-col h6'>{$t('', 'Last Modified')}</div>,
      cell: (info) => <TableCell key={info.cell.id}>{info.getValue()}</TableCell>
    })
  ] as TL.ColumnDef<T.Isoc>[];

  return columnsq;
}

/** @section Editable Cells  */
function Editable<V = unknown>({ info }: { info: TL.CellContext<T.Soc, V> }): JSX.Element {
  return (
    <EditableCell<T.Soc> info={info}>
      <EditableCell.Edit>
        <InputEditCell info={info} />
      </EditableCell.Edit>
      <EditableCell.View>
        <PresentationCell info={info} />
      </EditableCell.View>
    </EditableCell>
  );
}

function EditableSelection<V = unknown>({ info }: { info: TL.CellContext<T.Soc, V> }): JSX.Element {
  return (
    <EditableCell<T.Soc> info={info}>
      <EditableCell.Edit>
        <SelectEditCell info={info} />
      </EditableCell.Edit>
      <EditableCell.View>
        <PresentationCell info={info} />
      </EditableCell.View>
    </EditableCell>
  );
}
//eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => { };

function EditableSWitch<V = unknown>({ info }: { info: TL.CellContext<T.Soc, V> }): JSX.Element {
  return (
    <EditableCell<T.Soc> info={info} handleClickOutside={NOOP}>
      <EditableCell.Edit>
        <SwitchEditCell info={info} />
      </EditableCell.Edit>
      <EditableCell.View>
        <PresentationCell info={info} />
      </EditableCell.View>
    </EditableCell>
  );
}

/** @section Editable Cells END */
/** @section Editable Cells Parts */

function InputEditCell<V = unknown>({ info }: { info: TL.CellContext<T.Soc, V> }): JSX.Element {
  const { openEditMode, onKeyDown, value, triggerChangeValue, setValue, handleClickOutside } = useEditableCell();
  const ref = React.useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  return (
    <TableCell onDoubleClick={openEditMode} key={info.cell.id} ref={ref}>
      <input
        className='socs-list--input-edit input-edit'
        width={'fit-content'}
        style={{ maxWidth: 100 }}
        value={value as string}
        onChange={(ev): void => setValue(ev.target.value)}
        onBlur={(value: any) => {
          triggerChangeValue();
          console.info(
            ` Emitting updateData to server ---> 
            changed id ${info.row.original.id}, 
            key: ${info.column.id}, 
            to value ${value}`
          );
        }}
        onKeyDown={onKeyDown}
      />
    </TableCell>
  );
}

function PresentationCell({ info }: { info: TL.CellContext<T.Soc, unknown> }): JSX.Element {
  const { openEditMode, value } = useEditableCell();
  return (
    <TableCell onDoubleClick={openEditMode} key={info.cell.id}>
      {value as string}
    </TableCell>
  );
}

function SelectEditCellNS<V = unknown>({ info }: { info: TL.CellContext<T.Soc, V> }): JSX.Element {
  const { openEditMode, onKeyDown, value, triggerChangeValue, setValue } = useEditableCell();
  return (
    <select
      onDoubleClick={openEditMode}
      key={info.cell.id}
      className='socs-list--input-edit select-edit'
      value={value as string}
      onChange={(ev): void => setValue(ev.target.value)}
      onBlur={() => {
        triggerChangeValue();
        console.info(
          ` Emitting updateData to server ---> 
      changed id ${info.row.original.id}, 
      key: ${info.column.id}, 
      to value ${value as string}`
        );
      }}
    // onKeyDown={onKeyDown}
    // onSelect={onKeyDown}
    >
      <option value='option1'>Option 1</option>
      <option value='option2'>Option 2</option>
      <option value='option3'>Option 3</option>
    </select>
  );
}

function SelectEditCell<V = unknown>({ info }: { info: TL.CellContext<T.Soc, V> }): JSX.Element {
  const { openEditMode, onKeyDown, value, triggerChangeValue, setValue } = useEditableCell();
  return (
    <TableCell onDoubleClick={openEditMode} key={info.cell.id}>
      <select
        className='socs-list--input-edit select-edit'
        value={value as string}
        onChange={(ev): void => setValue(ev.target.value)}
        onBlur={() => {
          triggerChangeValue();
          console.info(
            ` Emitting updateData to server ---> 
      changed id ${info.row.original.id}, 
      key: ${info.column.id}, 
      to value ${value as string}`
          );
        }}
        onKeyDown={onKeyDown}
      >
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </select>
    </TableCell>
  );
}

function SwitchEditCell<V = unknown>({ info }: { info: TL.CellContext<T.Soc, V> }): JSX.Element {
  const { openEditMode, setEditMode, value, setValue } = useEditableCell();
  return (
    <TableCell onDoubleClick={openEditMode} key={info.cell.id} onBlur={() => setEditMode(false)}>
      <div className={`${styles['switch']} socs-list--input-edit input-edit input-edit--switch`}>
        <span className='h2'>{$t('', 'Enabled')}</span>
        need some work
        {/* <NSSwitch
          color='success'
          className={'MuiSwitch-override'}
          value={value as boolean}
          onChange={(_ev: React.ChangeEvent<HTMLInputElement>, val: boolean): void => setValue(val)}
          onSwitchChange={(value: boolean) => {
            console.info(
              ` Emitting updateData to server ---> 
            changed id ${info.row.original.id}, 
            key: ${info.column.id}, 
            to value ${value ? 'Enabled' : 'Disabled'}`
            );
          }}
        /> */}
        <span className='h2'>{$t('', 'Disabled')}</span>
      </div>
    </TableCell>
  );
}

function SwitchEditCellCustom<V = unknown>({ info }: { info: TL.CellContext<T.Soc, V> }): JSX.Element {
  const { openEditMode, onKeyDown, value, triggerChangeValue, setValue } = useEditableCell();
  return (
    <TableCell onDoubleClick={openEditMode} key={info.cell.id}>
      <div className={styles['switch']}>
        <span className='h2'>{$t('', 'Enabled')}</span>
        <label className='switch'>
          <input
            type='checkbox'
            className='socs-list--input-edit input-edit'
            width={'fit-content'}
            value={value as string}
            onChange={(ev): void => setValue(ev.target.value)}
            onBlur={(value: any) => {
              triggerChangeValue();
              console.info(
                ` Emitting updateData to server ---> 
            changed id ${info.row.original.id}, 
            key: ${info.column.id}, 
            to value ${value}`
              );
            }}
            onKeyDown={onKeyDown}
          />
          <span className='slider round'></span>
        </label>
        <span className='h2'>{$t('', 'Disabled')}</span>
      </div>
    </TableCell>
  );
}

/** @section Editable Cells - Parts END */
