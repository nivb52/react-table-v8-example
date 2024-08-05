export type TConfigComponent = ({ any }: { [key: string]: any }) => JSX.Element;
export interface ISelection<T = string> {
  display: string;
  value: T;
  id: T;
}

/** @section DATA LIST TOOLBAR TYPES */
export interface ISortSelectOptions<TSortingIds> {
  desc: boolean;
  id: TSortingIds;
}
export type SortDir = 'asc' | 'desc' | undefined;

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type ReadonlySortingIds<TSortingIds extends number | string | symbol> = {
  readonly [K in TSortingIds]: string;
};
export interface ISortableColumns<TSortingIds, TSortDir = SortDir> {
  id: TSortingIds;
  dir: TSortDir;
  display?: string;
  tDisplay?: string;
}

/** @section END DATA LIST TOOLBAR TYPES */
type TCssVar = `--${string}`;
export interface MyCustomCSS extends React.CSSProperties {
  [key: TCssVar]: number | string;
}

export type ThemeType = 'dark' | 'light';
