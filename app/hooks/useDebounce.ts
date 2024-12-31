import { useState, useEffect } from "react"

/**
 * A custom React hook to debounce any fast changing value.
 * 
 * @param value   The value to debounce
 * @param delay   Number of milliseconds to delay
 * @returns       Debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}