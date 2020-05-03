import { window } from 'vscode';
const transform = require('transform-json-types');

enum ErrorType {
  INVALID_JS_OBJECT,
}

function handleError(error: Error, errorType: ErrorType): void {
  let messageToDisplay = '';

  if (errorType === ErrorType.INVALID_JS_OBJECT) {
    messageToDisplay = `Invalid JavaScript object: ${error.message}`;
  }

  window.showErrorMessage(messageToDisplay);
}

export function getSelectedText(): Promise<string> {
  const { selection, document } = window.activeTextEditor!;
  return Promise.resolve(document.getText(selection).trim());
}

export function parseJSObjectToJSON(jsObjectString: string): Promise<object> {
  let stringToParse = jsObjectString;

  if (jsObjectString[jsObjectString.length - 1] === ';') {
    stringToParse = jsObjectString.slice(0, -1);
  }

  try {
    const parsedObject = JSON.parse(
      JSON.stringify(eval('(' + stringToParse + ')'), null, 2)
    );
    return Promise.resolve(parsedObject);
  } catch (error) {
    handleError(error, ErrorType.INVALID_JS_OBJECT);
    return Promise.reject();
  }
}

export async function transformJavascriptToTs(json: any): Promise<any> {
  const jsonObject = await parseJSObjectToJSON(json); // parse to json first, as transforming to ts needs json first
  return transform(jsonObject, {
    lang: 'typescript',
  });
}
