// NOTE: Cache works differently on server & client side
import NodeCache from 'node-cache';

let bvbCache;
if (process.env.NODE_ENV !== 'production') {
  bvbCache = {
    del: (keys) => { },
    get: (key) => { },
    set: (key, value, ttl?) => { },
    getStats: () => { },
    flushAll: () => { },
    keys: () => { },
  };
} else {
  if (typeof window === 'undefined' && process.env.BVB_CACHE_MODE === 'redis' && process.env.BVB_CACHE_REDIS_STORE_NAME !== '' && (
    process.env.BVB_CACHE_REDIS_URL !== '' ||
    (process.env.BVB_CACHE_REDIS_PATH !== '' && process.env.BVB_CACHE_REDIS_DB !== '') ||
    (process.env.BVB_CACHE_REDIS_PORT !== '' && process.env.BVB_CACHE_REDIS_HOST !== '' && process.env.BVB_CACHE_REDIS_DB !== '')
  )) {
    const { init, del, set, get, keys, deleteAll, getStatus } = require("node-cache-redis");
    init({
      name: process.env.BVB_CACHE_REDIS_STORE_NAME || 'bvbshop',
      redisOptions: {
        url: process.env.BVB_CACHE_REDIS_URL || null,
        //  || 'redis://127.0.0.1:6379/10',
        port: process.env.BVB_CACHE_REDIS_PORT || null,
        host: process.env.BVB_CACHE_REDIS_HOST || null,
        db: process.env.BVB_CACHE_REDIS_DB || null,
        path: process.env.BVB_CACHE_REDIS_PATH || null,
        ttlInSeconds: Number(process.env.BVB_CACHE_TTL) || 30 * 24 * 60 * 60
      }
    });
    bvbCache = {
      set,
      get,
      flushAll: async () => {
        try {
          return await deleteAll();
        } catch (e) {
          const allKeys = await keys();
          return await del(allKeys);
        }
      },
      getStats: getStatus,
      keys,
      del,
    }
  } else {
    // Default value is true
    const BVB_CACHE_FRONT_MODE = JSON.parse(process.env.BVB_CACHE_FRONT_MODE ?? 'true');
    if (BVB_CACHE_FRONT_MODE || typeof window === 'undefined') {
      bvbCache = new NodeCache({ stdTTL: Number(process.env.BVB_CACHE_TTL) || 30 * 24 * 60 * 60 });
      // if(typeof window !== 'undefined') {
      //   bvbCache.options.useClones = false;
      // }
    } else {
      bvbCache = {
        del: (keys) => { },
        get: (key) => { },
        set: (key, value, ttl?) => { },
        getStats: () => { },
        flushAll: () => { },
        keys: () => { },
      };
    }
  }
}

export { bvbCache };
