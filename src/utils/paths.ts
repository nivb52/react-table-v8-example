export const splitAndJoinString = (inputString: string): string => {
  const parts: string[] = inputString.split('.');

  if (parts.length >= 2) {
    const result: string = parts.slice(1).join('.');
    return result;
  } else {
    return inputString;
  }
};
