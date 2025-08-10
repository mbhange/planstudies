// Performance monitoring and optimization utilities
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// Measure performance of functions
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 Performance: ${name} took ${(end - start).toFixed(2)}ms`);
  }
  
  return result;
};

// Report Core Web Vitals to console (can be extended to send to analytics)
export const reportWebVitals = () => {
  onCLS((metric) => {
    console.log('🎯 CLS:', metric);
    // Send to analytics service here
  });
  
  onFID((metric) => {
    console.log('🎯 FID:', metric);
    // Send to analytics service here
  });
  
  onFCP((metric) => {
    console.log('🎯 FCP:', metric);
    // Send to analytics service here
  });
  
  onLCP((metric) => {
    console.log('🎯 LCP:', metric);
    // Send to analytics service here
  });
  
  onTTFB((metric) => {
    console.log('🎯 TTFB:', metric);
    // Send to analytics service here
  });
};

// Lazy load images with intersection observer
export const createImageObserver = () => {
  if (!('IntersectionObserver' in window)) return null;
  
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });
};

let imageObserver = null;

// Initialize image observer
export const initImageObserver = () => {
  imageObserver = createImageObserver();
  return imageObserver;
};

// Prefetch critical data during idle time
export const prefetchData = (fetchFunction, priority = 'low') => {
  if ('requestIdleCallback' in window && priority === 'low') {
    requestIdleCallback(() => {
      fetchFunction();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(fetchFunction, 100);
  }
};

// Memory usage monitoring (development only)
export const monitorMemory = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memInfo = performance.memory;
    console.log('🧠 Memory Usage:', {
      used: `${Math.round(memInfo.usedJSHeapSize / 1024 / 1024)}MB`,
      total: `${Math.round(memInfo.totalJSHeapSize / 1024 / 1024)}MB`,
      limit: `${Math.round(memInfo.jsHeapSizeLimit / 1024 / 1024)}MB`
    });
  }
};

// Debounce function for performance optimization
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for performance optimization
export const throttle = (func, delay) => {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};
