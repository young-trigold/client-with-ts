const debounce = (callback: React.MouseEventHandler, wait = 200) => {
  let timer: number;
  let isFirst = true;

  return (event: React.MouseEvent<HTMLElement>) => {
    clearTimeout(timer);

    if (isFirst) {
      isFirst = false;
      callback(event);

      timer = setTimeout(() => {
        isFirst = true;
      }, wait);
    } else {
      timer = setTimeout(callback, wait, event);
    }
  };
};

export default debounce;
