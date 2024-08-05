const env = { NODE_ENV: 'development' };

import { difference, isNil, isNumber, isEqual } from 'lodash';

export const hexToRgbA = (hex: string, opacity: number): string => {
  let color: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    color = hex.substring(1).split('');
    if (color.length === 3) {
      color = [color[0], color[0], color[1], color[1], color[2], color[2]];
    }
    color = `0x${color.join('')}`;
    return `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',')},${opacity})`;
  }
  throw new Error('Bad Hex');
};

export const getElementWidth = (selector: string): number => {
  return document.querySelector(selector)?.getBoundingClientRect().width ?? 0;
};

export const isValidIndex = (index: unknown): boolean => isNumber(index) && !isNil(index);

export function removeOrAddItem<T>(arr: T[], value: T): T[] {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  } else {
    arr.push(value);
  }
  return arr;
}

export const panicOnDev = (test: boolean, errorString: string): true | undefined => {
  if (!test) {
    if (env.NODE_ENV !== 'production') {
      throw new Error(errorString);
    } else {
      console.error(`Error: ${errorString}`);
      return true;
    }
  }
  return undefined;
};

export const warning = (test: boolean, errorString: string): void => {
  if (!test) {
    if (env.NODE_ENV !== 'production') {
      return;
    } else {
      console.warn(`Error: ${errorString}`);
    }
  }
};

export const isDifferenceArray = <T>(array: ArrayLike<T> | null | undefined, values = [] as T[]): boolean => {
  return array?.length !== values.length || difference(array, values).length > 0;
};

export const isEqalArray = <T>(array: ArrayLike<T> | null | undefined, values = [] as T[]): boolean => {
  return array?.length === values.length && difference(array, values).length === 0;
};
