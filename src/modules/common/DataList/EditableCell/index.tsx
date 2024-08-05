import React from 'react';
// Style & Icons
// workspace
// 3rd-party
import { useOnClickOutside } from 'usehooks-ts';
// Components
// store & context & utils
// Types
import type { ICellProps, IEditableProps, IEditableCtx } from './types'; // uses @tanstack/react-table;
import { AnyHTMLElement } from 'src/types/EventTypes';

// Context Hook
const EditableContext = React.createContext<IEditableCtx<any> | null>(null);
function useEditableCell<Tdata>(): IEditableCtx<Tdata> {
  const context = React.useContext<IEditableCtx<Tdata> | null>(EditableContext);
  if (!context) {
    throw new Error('Editable Context must be rendered within the EditableTableCell component');
  }
  return context;
}

/**
 * @section Main Component - Logic goes here
 */
function EditableCell<TData>({
  children,
  info,
  beforeEdit,
  afterEdit,
  handleClickOutside: customHandleClickOutside
}: IEditableProps<TData>): JSX.Element {
  const [isEditable, setIsEditable] = React.useState(false);
  const toggleEditMode = (): void => {
    setIsEditable((prevState) => !prevState);
  };

  const {
    getValue,
    row: { index },
    column: { id },
    table
  } = info;
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);
  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  /**
   * @description - update the value in the table meta
   * When the input is blurred, we'll call our table meta's updateData function
   * But there is also option to pass and callback of after edit -
   * if the afterEdit callback is provided, it will be called after the value is updated
   * @param afterEdit - callback function to be called after the value is updated
   * @param beforeEdit - used as validation function to be called before the value is updated -
   *        if the beforeEdit callback returns false, the value will not be updated
   *
   */
  const triggerChangeValue = (): void => {
    let isValidChange;
    if (typeof beforeEdit === 'function') {
      isValidChange = beforeEdit(value);
    }

    if (isValidChange === false) {
      return;
    }

    table.options.meta?.updateData(index, id, value);
    setIsEditable(false);
    if (typeof afterEdit === 'function') {
      afterEdit(value);
    }
  };

  const setEditMode = (val: boolean): void => {
    setIsEditable(val);
  };

  const openEditMode = (): void => {
    setIsEditable(true);
  };

  const onKeyDown = (ev: React.KeyboardEvent<AnyHTMLElement>): void => {
    if (ev.key === 'Enter') {
      triggerChangeValue();
    } else if (ev.key === 'Escape') {
      setValue(info.getValue());
      triggerChangeValue();
    }
  };

  const defualtHandleClickOutside = (): void => {
    isEditable && setEditMode(false);
  };

  const handleClickOutside =
    typeof customHandleClickOutside === 'function' ? customHandleClickOutside : defualtHandleClickOutside;

  const contextValue = {
    toggleEditMode,
    setEditMode,
    openEditMode,
    isEditable,
    info,
    triggerChangeValue,
    value,
    setValue,
    onKeyDown,
    handleClickOutside
  };

  return <EditableContext.Provider value={contextValue}>{children}</EditableContext.Provider>;
}

/**
 * @section Child components
 * @description -
 * Edit(Div) is a wrapper component that will render its children only when the cell is in edit mode
 * View is a wrapper component that will render its children only when the cell is in view mode
 */

/**
 * @note - cannot be used with table html elements, auto implements onClickOutside to close the edit mode
 * @param children - the children to be rendered
 */
function EditDiv({ children }: ICellProps): JSX.Element | null {
  const { isEditable, handleClickOutside } = useEditableCell();
  const ref = React.useRef(null);
  useOnClickOutside(ref, handleClickOutside);

  return isEditable ? <div ref={ref}>{children}</div> : null;
}

/**
 * @note - use with table html elements,
 * NOT implements onClickOutside to close the edit mode
 * @param children - the children to be rendered
 */
function Edit({ children: child }: ICellProps): JSX.Element | null {
  const { isEditable } = useEditableCell();
  return isEditable && child ? (child as JSX.Element) : null;
}

function View({ children: child }: ICellProps): JSX.Element | null {
  const { isEditable } = useEditableCell();
  return isEditable ? null : child ? (child as JSX.Element) : null;
}

EditableCell.Edit = Edit;
EditableCell.EditDiv = EditDiv;
EditableCell.View = View;

export default EditableCell;
export { useEditableCell };
