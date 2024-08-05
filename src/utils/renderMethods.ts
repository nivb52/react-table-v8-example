// 3rd-parties
import { isEqual } from 'lodash';
// workspaces

// types

import type { ValueCompareFunction } from 'src/types/FunctionTypes';

/** @description : solving on mount render of onChange in NSInput & NSSelect */
export function preventDoubleRender<T>(
  filterMeta: { [key: string]: { prevRenderValue: T; isJustOpened: boolean } } | null,
  fieldName: string,
  value: T,
  options: {
    ev?: InputEvent;
    valueChecker?: ValueCompareFunction;
  } = {
      valueChecker: isEqual
    }
): boolean {
  if (!filterMeta) {
    return false; // default value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if ((options.ev as InputEvent | null)?.inputType?.includes('delete')) {
    return true;
  } else if (filterMeta[fieldName].isJustOpened) {
    filterMeta[fieldName].isJustOpened = false;
    filterMeta[fieldName].prevRenderValue = value;
    return false;
  } else if ((options.valueChecker || isEqual)(filterMeta[fieldName].prevRenderValue, value)) {
    filterMeta[fieldName].isJustOpened = false;
    return false;
  }

  filterMeta[fieldName].prevRenderValue = value;
  return true;
}

/** @description : solving last charecter remains in NSInput component*/
export const onKeyDownDelete = (ev: React.KeyboardEvent, controlledValue: unknown, afterUpdate: VoidFunction): void => {
  if (ev.key === 'Backspace' && (ev.nativeEvent.target as HTMLInputElement).value.length === 1) {
    if (controlledValue) controlledValue = '';
    afterUpdate();
  }
};
