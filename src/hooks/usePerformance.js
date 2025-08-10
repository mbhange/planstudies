import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { debounce, throttle, prefetchData } from '../utils/performance';

// Hook for debouncing values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook for throttling functions
export const useThrottle = (callback, delay) => {
  const throttledCallback = useMemo(
    () => throttle(callback, delay),
    [callback, delay]
  );

  return throttledCallback;
};

// Hook for lazy loading data
export const useLazyLoad = (loadFunction, trigger = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (trigger && !data && !loading) {
      setLoading(true);
      setError(null);

      loadFunction()
        .then((result) => {
          setData(result);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [trigger, loadFunction, data, loading]);

  return { data, loading, error };
};

// Hook for intersection observer (viewport detection)
export const useInView = (options = {}) => {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, inView, entry];
};

// Hook for prefetching data
export const usePrefetch = (prefetchFunctions = []) => {
  const hasPrefetched = useRef(false);

  useEffect(() => {
    if (!hasPrefetched.current && prefetchFunctions.length > 0) {
      prefetchFunctions.forEach((fn) => {
        prefetchData(fn, 'low');
      });
      hasPrefetched.current = true;
    }
  }, [prefetchFunctions]);
};

// Hook for measuring component render performance
export const useRenderPerformance = (componentName) => {
  const renderCount = useRef(0);
  const renderTimes = useRef([]);

  useEffect(() => {
    const startTime = performance.now();
    renderCount.current++;

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      renderTimes.current.push(renderTime);

      if (process.env.NODE_ENV === 'development') {
        console.log(`🔍 ${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`);
        
        // Log average render time every 10 renders
        if (renderCount.current % 10 === 0) {
          const avgTime = renderTimes.current.reduce((sum, time) => sum + time, 0) / renderTimes.current.length;
          console.log(`📊 ${componentName} average render time: ${avgTime.toFixed(2)}ms (${renderCount.current} renders)`);
        }
      }
    };
  });

  return {
    renderCount: renderCount.current,
    averageRenderTime: renderTimes.current.length > 0 
      ? renderTimes.current.reduce((sum, time) => sum + time, 0) / renderTimes.current.length 
      : 0
  };
};

// Hook for optimized event handlers
export const useOptimizedCallback = (callback, deps) => {
  return useCallback(callback, deps);
};

// Hook for optimized computed values
export const useOptimizedMemo = (factory, deps) => {
  return useMemo(factory, deps);
};

// Hook for virtual scrolling
export const useVirtualScroll = (items, itemHeight, containerHeight) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length - 1
    );

    return items.slice(startIndex, endIndex + 1).map((item, index) => ({
      ...item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight,
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  const totalHeight = items.length * itemHeight;

  return {
    visibleItems,
    totalHeight,
    handleScroll,
  };
};

// Hook for memory usage monitoring
export const useMemoryMonitor = (interval = 10000) => {
  const [memoryInfo, setMemoryInfo] = useState(null);

  useEffect(() => {
    if ('memory' in performance && process.env.NODE_ENV === 'development') {
      const updateMemoryInfo = () => {
        const memInfo = performance.memory;
        setMemoryInfo({
          used: Math.round(memInfo.usedJSHeapSize / 1024 / 1024),
          total: Math.round(memInfo.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(memInfo.jsHeapSizeLimit / 1024 / 1024),
        });
      };

      updateMemoryInfo();
      const intervalId = setInterval(updateMemoryInfo, interval);

      return () => clearInterval(intervalId);
    }
  }, [interval]);

  return memoryInfo;
};
