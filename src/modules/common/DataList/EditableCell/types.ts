import type { PropsWithChildren } from 'react';
import type * as TL from '../types'; // uses @tanstack/react-table;

export interface ICellProps extends PropsWithChildren { }

interface IBeforeEditFn {
  (value: unknown): boolean;
}
interface IAfterEditFn {
  (value: unknown): void;
}

export interface ICustomEditBehavior {
  beforeEdit?: IBeforeEditFn;
  afterEdit?: IAfterEditFn;
  handleClickOutside?: () => void;
}

export interface ICellContext<TData, TValue = unknown> {
  info: TL.CellContext<TData, TValue>;
}
export interface IEditableProps<TData> extends ICustomEditBehavior, ICellContext<TData> {
  children?: React.ReactNode | React.ReactNode[];
}

export interface IEditableCtx<TData, TValue = unknown> {
  // Edit State Management
  isEditable: boolean;
  toggleEditMode: () => void;
  openEditMode: () => void;
  setEditMode: (val: boolean) => void;
  // Value Management
  info: TL.CellContext<TData, TValue>;
  value: TValue;
  setValue: React.Dispatch<React.SetStateAction<TValue>>;

  // -- Functions -- //
  // Cannot be overriden
  onKeyDown: (ev: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => void;
  // Can be Customized
  triggerChangeValue: () => void;
  handleClickOutside: () => void;
}
