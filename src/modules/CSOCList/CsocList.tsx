import React from 'react';
// Style & Icons
import './csoc-list.css';
import { default as Loader } from '../../modules/common/Loader/Spinner';
// 3rd-party
import {
  useQuery,
} from '@tanstack/react-query'

// Components
import { Card } from './Card/Card';
// import { ListToolbar } from './Toolbar/Toolbar';
import { DataList } from '../common/DataList/PinnableList';
// store & context & utils
import { fetchCsocData } from './api.csoc-list';
import { CardContext } from './Card/CardContext';
// common cmps defenitions
import columnsq from './ColumnsCsoc';

// Types
import type { ColumnDef, TableState } from '@tanstack/react-table';
import type * as T from './types';
import type * as TL from '../common/DataList/types'; // L represent List
import type { KeysOfType } from 'src/types/UtilsTypes';

const columGap = 22;
const cardWidth = 135;
const cardHeight = 139;


export default function CsocList(): JSX.Element {
  const [bookmarkCount, setBookmarkCount] = React.useState(0);

  /**@description: get server side response */
  const initialResponse: T.TCsocDataFetch = { data: [], error: null };
  const { data: result = initialResponse, isLoading, isError } = useQuery({
    queryFn: async (): Promise<T.TCsocDataFetch> => fetchCsocData(),
    queryKey: ['csocList'],
  });

  const maxAllowedCardBookmarksRef = React.useRef<number>(0);

  /**@description: calc max allowed bookmarked cards (the varible holds the max value - 1) */
  React.useEffect(() => {
    const calcWidth = (): void => {
      const el = document.querySelector('.csoc-list--wrapper .data-list__cards-content') as
        | HTMLElement
        | undefined;
      if (el) {
        maxAllowedCardBookmarksRef.current = Math.floor(el.getBoundingClientRect().width / (cardWidth + columGap));
      }
    };
    calcWidth();
    window.addEventListener('resize', calcWidth);
    // cleanup
    return () => window.removeEventListener('resize', calcWidth);
  }, []);

  /**@section columns defenition of csoc list */
  const columns = React.useMemo<ColumnDef<T.Tcsoc>[]>((): ColumnDef<T.Tcsoc>[] => columnsq(), []);

  const initialState: Pick<TableState, 'columnVisibility' | 'pagination' | 'sorting'> = {
    pagination: { pageSize: result.data.length, pageIndex: 0 },
    sorting: [
      {
        id: 'name' as keyof T.Tcsoc,
        desc: true
      }
    ],
    columnVisibility: {
      creationTime: false
    }
  };

  if (isError || result.error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <Loader size={310} color='secondary' />;
  }

  if (!result.data || result.data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className='csoc-list--wrapper'>
      <CardContext.Provider
        value={{ bookmarkCount, setBookmarkCount, maxAllowedBookmarkCards: maxAllowedCardBookmarksRef.current }}
      >
        <DataList<T.Tcsoc>
          data={result.data}
          columns={columns}
          initialState={initialState}
          options={{
            CardCmp: Card,
            ToolbarCmp: ListToolbar,
            defualtView: 'cards',
            isCardPinnable: true,
            filterOptions: {
              highlightTextClass: 'CSOC-Card__content .CSOC-Card__csoc_name'
            }
          }}
        />
      </CardContext.Provider>
    </div>
  );
}



export function ListToolbar({ data, table, controls, options }: TL.ListFiltersProps<T.Tcsoc>): JSX.Element {
  const changeLayout = (): void => {
    controls.changeLayout();
  };

  const exportToCSV = React.useCallback((): void => {
    console.info('exporting CSV...');
    const filterNonExportedCell = (id: KeysOfType<T.Tcsoc, any>): boolean => {
      return id !== 'warningType' && id !== 'isWarn';
    };
    const headerFromId = (id: KeysOfType<T.Tcsoc, any>): KeysOfType<T.Tcsoc, any> => id;

    const headers = table
      .getFlatHeaders()
      .map((headers): KeysOfType<T.Tcsoc, any> => headers.column.id as KeysOfType<T.Tcsoc, any>)
      .filter(filterNonExportedCell)
      .map(headerFromId);

    const rowsData = table.getFilteredRowModel().flatRows as TL.Row<T.Tcsoc>[];
    const rows = rowsData.map((row): unknown[] =>
      Object.values(row.getVisibleCells())
        .filter((row: TL.Cell<T.Tcsoc, unknown>) => {
          return (headers as KeysOfType<T.Tcsoc, any>[]).includes(row.column.id as KeysOfType<T.Tcsoc, any>);
        })
        .map((col: TL.Cell<T.Tcsoc, any>): unknown => {
          return col.getValue();
        })
    );
    rows.unshift(headers);
    controls.exportToCsv(rows, 'csoc_list');
  }, [table, controls]);



  return <div>
    <h1>Toolbar</h1>
    <button onClick={changeLayout}> Change Layout</button>
    <div> | </div>
    <button onClick={exportToCSV}> exportToCSV</button>
  </div>
}
