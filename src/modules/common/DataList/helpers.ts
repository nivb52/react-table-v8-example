import { panicOnDev } from 'src/utils/commonMethods';
// 3rd-party
import { isNil } from 'lodash';
// Types
import * as T from './types';

/**
 * @attention hardly coupled into the class name (.Card__content .Card__csoc_name)
 * @param elClass - example: Card__content .Card__csoc_name
 */
export function highlightText(elClass: string, searchTerm: string): void {
  if (!searchTerm) {
    const markedElements = document.querySelectorAll(`.${elClass} [data-highlighttext]`);
    markedElements.forEach((element: Element) => {
      const higlightedText = (element as HTMLSpanElement).innerText;
      // Replace the highlighted text with the original version
      if (higlightedText) {
        element.outerHTML = higlightedText;
      }
    });
    return;
  }

  // Get all elements containing text
  const elements = document.querySelectorAll(`.${elClass}`);
  elements.forEach((element: Element) => {
    const text = (element as HTMLSpanElement).innerText;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    if (regex.exec(text)) {
      // Split the text into parts (matched and unmatched)
      // To create a new HTML structure with the matched term highlighted
      const parts = text.split(regex);
      const highlightedText = parts
        .map(
          (part: string) =>
            part.length && part.match(regex)
              ? /* eslint-disable @typescript-eslint/indent */
              `<span data-highlighttext=${part} style="background-color: var(--highlighttext);">${part}</span>`
              : part
          /* eslint-disable- @typescript-eslint/indent */
        )
        .join('');
      // Replace the original text with the highlighted version
      element.innerHTML = highlightedText;
    }
  });
}

/**
 * @attention work in progress - perperation to add customization of default bilder of toolbar
 */
export function getCellType<Tkeys>(colId: Tkeys): T.TcellTypeOptions {
  switch (colId) {
    default:
      return '';
  }
}

export function exportToCsv<Tdata>(rows: Tdata[], filename?: string, customFormatter?: T.FormatterFunction): void {
  const formatter = formatCellValue(customFormatter);
  const processRow = function <Tdata>(row: Tdata[]): string {
    const isMissing = panicOnDev(Array.isArray(row), '');
    if (isMissing) return '';

    let finalVal = '',
      innerValue = '',
      result = '';
    /** @note: running over columns */
    for (let j = 0; j < row.length; j++) {
      innerValue = formatter(row[j]);
      result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) {
        result = `"${result}"`;
      }

      if (j > 0) {
        finalVal += ',';
      }
      finalVal += result;
    }

    return finalVal + '\n';
  };

  let csvFile = '';
  for (let idx = 0; idx < rows.length; idx++) {
    csvFile += processRow(rows[idx] as unknown[]);
  }

  const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    /* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */
    link.setAttribute('download', filename || 'export');
    link.click();
  } else {
    /** @note: This Should not happend unless this is browser that not support HTML5 download attribute */
    alert(
      `CSV Export Failed,
        please try again`
    );
    return;
  }
}

export const defaultFormater: T.FormatterFunction = (value: unknown): string => {
  let innerValue = '';
  if (isNil(value) || typeof value === 'function') {
    innerValue = '';
  } else if (value instanceof Date) {
    innerValue = value.toLocaleString();
  } else if (typeof value === 'number') {
    innerValue = isNaN(value as number) ? '' : (value as number).toString();
  } else if (typeof value === 'string') {
    innerValue = value;
  } else if (typeof value === 'boolean') {
    innerValue = value ? 'True' : 'False';
  } else if (Array.isArray(value)) {
    innerValue = value.join(',');
  } else if (value && typeof value === 'object') {
    innerValue = Object(value).values().join(',');
  } else if (!value) {
    innerValue = '';
  } else {
    /* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */
    console.warn(`CSV output process: unknown type handler: ${value as any}`);
  }
  return innerValue;
};

function formatCellValue(customFormatter?: T.FormatterFunction): T.FormatterFunction {
  if (typeof customFormatter === 'function') {
    return customFormatter as T.FormatterFunction;
  }
  return defaultFormater;
}
