
const recursiveToSnake = (item: unknown): unknown => {
  if (Array.isArray(item)) {
    return item.map((el: unknown) => recursiveToCamel(el));
  } else if (typeof item === 'function' || item !== Object(item)) {
    return item;
  }
  return Object.fromEntries(
    Object.entries(item as Record<string, unknown>).map(
      ([key, value]: [string, unknown]) => [
        
        key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(),
        recursiveToSnake(value),
      ],
    ),
  );
};

const recursiveToCamel = (item: unknown): unknown => {
    if (Array.isArray(item)) {
      return item.map((el: unknown) => recursiveToCamel(el));
    } else if (typeof item === 'function' || item !== Object(item)) {
      return item;
    }
    return Object.fromEntries(
      Object.entries(item as Record<string, unknown>).map(
        ([key, value]: [string, unknown]) => [

          key.replace(/([-_][a-z])/gi, c => c.toUpperCase().replace(/[-_]/g, '')),
          recursiveToCamel(value),
        ],
      ),
    );
  };

const toCamelResponseHandler = async (res: Response) => {
    const data = await res.json()
	return recursiveToCamel(data)
}


const serverUrl = 'http://localhost:8000'

  export {recursiveToSnake, recursiveToCamel, toCamelResponseHandler, serverUrl};