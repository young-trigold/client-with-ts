const debounce = <F extends (...args: any[]) => void>(callback: F, wait = 200) => {
  let timer: number;
  let isFirst = true;
  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timer);

    if (isFirst) {
      isFirst = false;
      callback(...args);

      timer = setTimeout(() => {
        isFirst = true;
      }, wait);
    } else {
      timer = setTimeout(callback, wait, ...args);
    }
  };
  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export default debounce;
