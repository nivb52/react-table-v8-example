import dayjs from 'dayjs';
import { NO_DATA } from 'src/utils/defaults';

export { NO_DATA } from 'src/utils/defaults';

// const NO_DATA = 'N/A';
/* eslint-disable  @typescript-eslint/indent*/
export const largeNumberFormatter = (value: number): string =>
  value > 1_000_000_000
    ? (value / 1_000_000_000).toFixed(3) + 'B'
    : value > 1_000_000
      ? (value / 1_000_000).toFixed() + 'M'
      : `${value.toLocaleString()}`;
/* eslint-disable  @typescript-eslint/indent*/

export const defaultValueFormatterTotal = (
  value: number | null | undefined,
  defaultNoData: string | null | undefined = NO_DATA
): string | null => (value ? `${value.toLocaleString()}` : defaultNoData);

/**
 *
 * @param value - desired as Date | string
 * @param formatter - compitable with Day JS
 * @returns - date string
 */
export const dateFormatter = (value: unknown, formatter: string): string =>
  typeof value === 'string' || value instanceof Date ? dayjs(value).format(formatter) : '';
