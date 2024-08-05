import React from 'react';
// 3rd-party
import { createColumnHelper, Row, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
// * needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  type UniqueIdentifier,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
// * needed for row & cell level scope DnD setup
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Components
import { Card } from 'src/modules/CSOCList/Card/Card';

import type { ColumnDef } from '@tanstack/react-table';
import { Tcsoc } from './types';
import { fetchCsocData } from './api.csoc-list';
const { data: mockData } = await fetchCsocData();
const columnHelper = createColumnHelper<Tcsoc>();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor((row) => row.version, {
    id: 'version',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('isWarn', {
    header: () => <span> </span>,
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('cases', {
    header: () => 'Cases',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('files', {
    header: () => 'Files',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id
  }),
  columnHelper.accessor('rawData', {
    header: 'Raw Data',
    footer: (info) => info.column.id
  })
] as ColumnDef<Tcsoc>[];

interface Props<Tdata> {
  title: string;
  data: Tdata[];
  columns: ColumnDef<Tdata>[];
}

// Cell Component
const RowDragHandleCell = ({ rowId }: { rowId: string }): JSX.Element => {
  const { attributes, listeners } = useSortable({
    id: rowId
  });
  return (
    // Alternatively, you could set these attributes on the rows themselves
    <button {...attributes} {...listeners}>
      🤏
    </button>
  );
};

// Row Component
const DraggableRow = ({ row }: { row: Row<Tcsoc> }): JSX.Element => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id // @TODO: ID - maybe use some generic func
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative'
  };
  return (
    // connect row ref to dnd-kit, apply important styles
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} style={{ width: cell.column.getSize() }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

// Card Component
const DraggableCard = ({ row }: { row: Row<Tcsoc> }): JSX.Element => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id // @TODO: ID - maybe use some generic func
  });
  if (Math.random() < 0.1) {
    const rowss = row.getAllCells();
    const cell = rowss[0];
    console.log(flexRender(cell.column.columnDef.cell, cell.getContext()));
  }

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative'
  };
  return (
    // connect row ref to dnd-kit, apply important styles
    <div ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => (
        <div
          key={cell.id}
          style={{
            width: cell.column.getSize()
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </div>
      ))}
    </div>
  );
};

// Main Component
export default function List(): JSX.Element {
  // @TODO: get the --columns-- as PROP ? if so - memo prop
  const columns = React.useMemo<ColumnDef<Tcsoc>[]>(
    () => [
      // Create a dedicated drag handle column. Alternatively, you could just set up dnd events on the rows themselves.
      {
        id: 'drag-handle',
        header: 'Move',
        cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
        size: 60
      },
      {
        accessorKey: 'name',
        cell: (info) => info.getValue()
      },
      {
        accessorFn: (row) => row.version,
        id: 'version',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>
      },
      {
        accessorKey: 'cases',
        header: () => 'Cases'
      },
      {
        accessorKey: 'files',
        header: () => <span>files</span>
      },
      {
        accessorKey: 'status',
        header: 'Status'
      },
      {
        accessorKey: 'isWarn',
        header: 'warn ?'
      }
    ],
    []
  );

  // @TODO: get the --data-- as PROP ? if so - memo prop
  const [data, setData] = React.useState(() => mockData);
  // @TODO: ID - maybe use some generic func
  const dataIds = React.useMemo<UniqueIdentifier[]>(() => data.map((obj) => obj.id), [data]);

  const [layout, setLayout] = React.useState<'cards' | 'rows'>('cards');

  const changeLayout = (): void => (layout === 'cards' ? setLayout('rows') : setLayout('cards'));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // @TODO: ID - maybe use some generic func
    getRowId: (row) => row.id, //required because row indexes will change
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
  });

  // reorder rows after drag & drop
  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;
    /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

  return (
    // NOTE: This provider creates div elements, so don't nest inside of <table> elements
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[layout === 'rows' ? restrictToVerticalAxis : restrictToParentElement]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className='p-2'>
        <div className='h-4' />
        <div className='flex flex-wrap gap-2'>
          <button onClick={() => changeLayout()} className='border p-1'>
            Change Layout
          </button>
        </div>
        <div className='h-4' />
        <div style={{ color: 'wheat' }}>
          {layout === 'rows' ? (
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          ) : (
            ''
          )}

          {layout === 'rows' ? (
            <tbody>
              <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
            </tbody>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <SortableContext items={dataIds} strategy={horizontalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  <DraggableCard key={row.id} row={row} />
                ))}
              </SortableContext>
            </div>
          )}
        </div>
      </div>
    </DndContext>
  );
}

// export default function DataGrid() {
//   return (
//     <div className='px-10'>
//       <List data={defaultData} columns={columns} title='User List' />
//     </div>
//   );
// }
