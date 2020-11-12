export const required = (errorMessage = '*Required') => value =>
  value &&
  ((typeof value === 'string' && value.trim()) ||
    (Array.isArray(value) && value.length > 0) ||
    typeof value === 'number')
    ? undefined
    : errorMessage
