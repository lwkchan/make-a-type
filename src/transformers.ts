import transform from 'transform-json-types';
import { handleError, ErrorType } from './utils';

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
