export const cache: Record<string, any> = {};

// stale-while-revalidate caching strategy
// TODO ttl
export const swrCacheGet = async <T>(
  key: string,
  get: () => Promise<T>
): Promise<T> => {
  // check if entry needs to be created
  if (!cache[key]) {
    console.log(`New cache key -> ${key}`);
    cache[key] = {
      value: null,
      promise: null,
    };
  }
  if (!cache[key].promise) {
    console.log(`Caching key ${key}...`);
    // re-validate in another thread,
    cache[key].promise = get()
      .then((result) => {
        console.log(`Succesfully cached for key ${key}!`);
        cache[key].value = result;
        cache[key].promise = null;
        return result;
      })
      .catch((error) => {
        // keep previous cache value
        console.log(`Error when revalidating key ${key}`);
        console.error(error);
        cache[key].promise = null;
        // rethrow for any threads that are awaiting this one
        throw error;
      });
  } else {
    console.log(`Reusing previous value or promise for cache key ${key}`);
  }

  return cache[key].value || (await cache[key].promise);
};
