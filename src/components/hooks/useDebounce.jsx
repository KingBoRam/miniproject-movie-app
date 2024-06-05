import {useState, useEffect} from "react";

export const useDebounce = (value, delay) => {
  const [deBounceValue, setDeBounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDeBounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return deBounceValue;
};
