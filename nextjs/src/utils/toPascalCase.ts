const clearAndUpper = (text: string) => text.replace(/-/, '').toUpperCase();

export const toPascalCase = (text: string) =>
  text.replace(/(^\w|-\w)/g, clearAndUpper);
