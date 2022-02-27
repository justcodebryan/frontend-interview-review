function memo(func, resolver) {
  const cached = new Map();

  return function memoed(...args) {
    const cacheKey = resolver ? resolver(...args) : Array.from(args).join('_');
    
    if (cached.has(cacheKey)) {
      return cached.get(cacheKey);
    }

    const value = func.apply(this, args);
    cached.set(cacheKey, value);
    return value;
  }
}
