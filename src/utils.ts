import { window, env } from 'vscode';

export enum ErrorType {
  INVALID_JS_OBJECT,
}

function isError(maybeError: Error | unknown): maybeError is Error {
  return maybeError !== null && typeof maybeError === 'object';
}

export function handleError(error: Error | unknown, errorType: ErrorType): void {
  let messageToDisplay = 'Something went wrong';

  if (errorType === ErrorType.INVALID_JS_OBJECT && isError(error)) {
    messageToDisplay = `Invalid JavaScript object: ${error.message}`;
  }

  window.showErrorMessage(messageToDisplay);
}

export function isObjectString(string: string): boolean {
  if (string.startsWith("{") && string.endsWith("}")) {
    return true;
  }

  return false;
}

export function getSelectedText(): Promise<string> {
  const { selection, document } = window.activeTextEditor!;
  const selectedText = document.getText(selection).trim();
  return Promise.resolve(selectedText);
}

export function addToClipboard(string: string): void {
  env.clipboard.writeText(string);
}
