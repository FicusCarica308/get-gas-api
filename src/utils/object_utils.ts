/* All function handling utility functions */

interface obj {
  [k: string]: any;
}

/*
* Description: This function take a list of key we want to keep and
* sorts the given object leaving only the requested keys.
* 
* Params:
* @obj [object/unkown] - The javascript object we are modifying.
* @keysToSave [Array<string>] - This is an array of String key values
*   to keep in the pass Object 'obj'.
* 
* Return: Returns the passed Object with only the requested keys.
*/
function filterObject (obj: obj, keysToSave: Array<string>) {
  Object.keys(obj).forEach((key) => {
    if (keysToSave.includes(key) === false) {
      delete obj[key];
    }
  });
  return (obj);
}

export { filterObject };
