/**
 * Creates a debounced version of a function. The debounced function will delay the 
 * execution of the original function until after a specified delay has passed.
 * 
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} - The debounced version of the function.
 */
export const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  