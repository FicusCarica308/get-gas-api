/* All function handling utility functions */

function filterObject (obj: any, keysToSave: any) { /* NEEDS TYPING */
  Object.keys(obj).forEach((key) => {
    if (keysToSave.includes(key) === false) {
      delete obj[key];
    }
  });
  return (obj);
}

export { filterObject };