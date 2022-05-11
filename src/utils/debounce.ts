const debounce = function debounce(
  callback = (...args: unknown[]) => {},
  wait = 200,
) {
  let timer: number;
  let isFirst = true;

  return function debouncedCallback(...args: unknown[]) {
    clearTimeout(timer);

    if (isFirst) {
      isFirst = false;
      callback(...args);

      timer = setTimeout(() => {
        isFirst = true;
      }, wait);
    } else {
      timer = setTimeout(() => callback(...args), wait);
    }
  };
};

export default debounce;
