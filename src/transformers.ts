import transform from 'transform-json-types';
import { handleError, ErrorType, isObjectString } from './utils';

function parseJSObjectToJSON(jsObjectString: string): Promise<object> {

  try {
    let stringToParse = jsObjectString;

    if (jsObjectString[jsObjectString.length - 1] !== '}') {
      stringToParse = jsObjectString.slice(0, -1); // accounts for ending ';' and ','
    }

    if (!isObjectString(stringToParse)) {
      throw new Error('Invalid JS object');
    }

    const object = eval('(' + stringToParse + ')'); // wrapping in () to return the whole object
    const parsedObject = JSON.parse(
      JSON.stringify(object, null, 2)
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
