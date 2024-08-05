import type React from 'react';
import type {
  Column,
  Table,
  HeaderGroup,
  ColumnDef,
  RowPinningPosition,
  RowData,
  InitialTableState,
  TableOptions
} from '@tanstack/react-table';
export type {
  Cell,
  Header,
  Column,
  Row,
  AccessorKeyColumnDef,
  SortingState,
  ColumnSort,
  ColumnHelper,
  ColumnDef,
  RowData,
  TableState,
  CellContext
} from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

import type { AnyObject } from 'src/types/UtilsTypes';
import type { IconProps } from 'src/types/PropsTypes';

export type TDataListViewOptions = 'cards' | 'rows';
export interface ListProps<Tdata> {
  data: Tdata[];
  columns: ColumnDef<Tdata>[];
  customizedThemeStyle?: AnyObject;
  initialState: InitialTableState;
  options: {
    ToolbarCmp?: React.FC<ListFiltersProps<Tdata>>;
    CardCmp?: React.FC<CardCmpProps<Tdata>>;
    defualtView: TDataListViewOptions;
    isCardPinnable?: boolean;
    filterOptions?: ListFilterOptions | undefined;
  };
  tableOptions?: TableOptions<Tdata>;
}

export interface ListDefaultOptions {
  defualtView: TDataListViewOptions;
}

export interface CardCmpProps<Tdata> {
  testId?: string;
  data: Tdata;
  isPinned: RowPinningPosition;
  doPin: () => void;
  unPin: () => void;
}

/////////////////////////  TOOLBAR  ////////////////////////
export interface ListFiltersProps<Tdata> {
  data: Tdata[];
  table: Table<Tdata>;
  controls: ListToolbarControls;

  headerGroups: HeaderGroup<Tdata>[];
  options: ListFilterOptions | undefined;
}

export interface ListFiltersMemoProps<Tdata> extends Omit<ListFiltersProps<Tdata>, 'headerGroups' | 'options'> {
  ToolbarCmp?: React.FC<ListFiltersProps<Tdata>>;
  options: {
    filterOptions?: ListFilterOptions | undefined;
  };
}

export interface ListToolbarControls {
  changeLayout: () => void;
  currentLayout?: TDataListViewOptions;
  exportToCsv: (rows: RowData[], filename?: string, customFormatter?: FormatterFunction) => void;
}

export interface ListFilterOptions {
  highlightTextClass?: string;
}

export type TcellTypeOptions = '' | 'number' | 'select' | 'text';
export interface FilterProps<Tdata> {
  cellType?: TcellTypeOptions;
  column: Column<Tdata, any>;
  table: Table<Tdata>;
  highlightTextClass?: string;
}

///////////////////////// TOOLBAR ACTIONS /////////////////////////
export interface IDataListActionProps {
  IconComponent: React.ElementType;
  onClick: VoidFunction;

  label: string;
  customStyle?: IDataListActionStyle;
  iconProps?: IconProps;
  disabled?: boolean;
  rest?: any;
}

export interface IDataListActionIcon {
  // no IconComponent prop
  action: VoidFunction; // onClick prop in the Abstract Element
  // similar props
  label?: string;
  customStyle?: IDataListActionStyle;
  iconProps?: IconProps;
  disabled?: boolean;
  rest?: any;
}

export interface IDataListActionStyle {
  style?: React.CSSProperties;
  btnStyle?: React.CSSProperties;
  icnStyle?: React.CSSProperties;
}

export interface IDataListFiltersWindowProps {
  filtersTitle: string;
  onClickOutside?: () => void;
  onActivatorClick: (ev: MouseEvent | React.MouseEvent<Element, MouseEvent>, open: boolean) => void;
  clearAllFilters?: () => void;

  children: React.ReactNode;
  isFilter: boolean;

  popperId?: string;
  popperOptions?: any;  // Omit<PopperProps, 'direction' | 'open' | 'sx'>;

  styles?: { box?: React.CSSProperties; title?: React.CSSProperties; children?: React.CSSProperties };
  clearAllCmp?: JSX.Element;

  stayOpen?: boolean;
}


///////////////////////// HELPERS.tsx /////////////////////////
export type CSVRowData = RowData;
export type FormatterFunction = (value: unknown) => string;
