import { useRef, createElement, useEffect, useCallback } from 'react';

function Heading(properties, setCurrentHeading) {
  const { children, level } = properties;
  const ref = useRef();

  const handleCurrentHeadingChange = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isCurrent = rect.top < 74 && rect.top > 50;

        if (isCurrent) {
          setCurrentHeading(ref.current.id);
        }
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleCurrentHeadingChange);

    return () => {
      window.removeEventListener('scroll', handleCurrentHeadingChange);
    };
  }, [ref.current]);

  return createElement(`h${level}`, { id: String(children).trim(), ref }, String(children).trim());
}

export default Heading;
