import React from 'react';
// Style & Icons
// 3rd-party
import {
  useQuery,
} from '@tanstack/react-query'


// Components
import { default as Loader } from '../../modules/common/Loader/Spinner';
import { DataList } from '../common/DataList/PinnableList';
// store & context & utils
// @TODO: consider remove it - and use widget mechanizem
import { fetchSingleCsocData } from './api.soc-list';
// Defenitions - cmps defenitions
import columnsq from './ColumnsCsoc';
// Types
import type * as T from './types';
import type * as TL from '../common/DataList/types'; // uses @tanstack/react-table;
import type { KeysOfType } from 'src/types/UtilsTypes';
type TuseParamsMock = { id: string };

// mocks for presentation:
const useParams = (): TuseParamsMock => ({ id: 'mock-id' });
const queryKeys = { socsList: ['socsList'] }



/* eslint-disable @typescript-eslint/naming-convention*/
export interface ICsocListCustomCSS extends React.CSSProperties {
  '--number-of-lines': number;
  '--line-size': number;
  '--height': number | string;
  '--max-height': number | string;
}
/* eslint-disable @typescript-eslint/naming-convention*/


export default function SocList(): JSX.Element {
  const [data, setData] = React.useState<T.Soc[]>([]);

  // get ID from REACT ROUTER DOM
  const { id } = useParams();
  const initialResponse: T.API_socDataFetch = { data: [], error: null };
  const { data: result = initialResponse, error, isLoading: loadingCsoc } = useQuery({
    queryKey: queryKeys.socsList,
    queryFn: async (): Promise<T.API_socDataFetch> => fetchSingleCsocData(id as string),
  });

  /**@section columns defenition of csoc list */
  const columns = React.useMemo<TL.ColumnDef<T.Soc>[]>((): TL.ColumnDef<T.Soc>[] => columnsq(), []);

  const initialState: Pick<T.TableStateWithMeta, 'columnVisibility' | 'pagination' | 'sorting' | 'meta'> = {
    pagination: { pageSize: data.length, pageIndex: 0 },
    sorting: [
      {
        id: 'sector' as keyof T.Soc,
        desc: true
      }
    ],
    columnVisibility: {
      creationTime: false
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown): void => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    }
  };

  if (loadingCsoc) {
    return <Loader color='secondary' />;
  }

  return (
    <div className='soc-list--wrapper'>
      <DataList<T.Soc>
        data={result.data}
        columns={columns}
        initialState={initialState}
        options={{
          ToolbarCmp: SOCToolbar,
          defualtView: 'rows',
          isCardPinnable: false
        }}
      />
    </div>
  );
}





export function SOCToolbar({ data, table, controls, options }: TL.ListFiltersProps<T.Soc>): JSX.Element {

  const exportToCSV = React.useCallback((): void => {
    console.info('exporting CSV...');
    const filterNonExportedCell = (id: KeysOfType<T.Soc, any>): boolean => {
      return id !== 'isWarn';
    };
    const headerFromId = (id: KeysOfType<T.Soc, any>): KeysOfType<T.Soc, any> => id;

    const headers = table
      .getFlatHeaders()
      .map((headers): KeysOfType<T.Soc, any> => headers.column.id as KeysOfType<T.Soc, any>)
      .filter(filterNonExportedCell)
      .map(headerFromId);

    const rowsData = table.getFilteredRowModel().flatRows as TL.Row<T.Soc>[];
    const rows = rowsData.map((row): unknown[] =>
      Object.values(row.getVisibleCells())
        .filter((row: TL.Cell<T.Soc, unknown>) => {
          return (headers as KeysOfType<T.Soc, any>[]).includes(row.column.id as KeysOfType<T.Soc, any>);
        })
        .map((col: TL.Cell<T.Soc, any>): unknown => {
          return col.getValue();
        })
    );
    rows.unshift(headers);
    controls.exportToCsv(rows, 'csoc_list');
  }, [table, controls]);



  return <div>
    <h1>Toolbar</h1>
    <button onClick={exportToCSV}> exportToCSV</button>
  </div>
}
