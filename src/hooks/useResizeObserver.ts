import { useEffect, useState } from "react";

export const useResizeObserver = <T extends HTMLElement>(ref: React.RefObject<T | null>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    resizeObserver.observe(target);
    return () => resizeObserver.unobserve(target);
  }, [ref]);

  return dimensions;
};