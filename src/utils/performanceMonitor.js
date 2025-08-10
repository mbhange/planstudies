// Performance monitoring utility
export class PerformanceMonitor {
  static init() {
    if (typeof window === 'undefined') return;

    // Monitor Web Vitals
    this.monitorWebVitals();
    
    // Monitor resource loading
    this.monitorResources();
    
    // Monitor navigation timing
    this.monitorNavigation();
  }

  static monitorWebVitals() {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              console.log(`FCP: ${Math.round(entry.startTime)}ms`);
            }
          }
        });
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('Paint observer not supported');
      }

      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log(`LCP: ${Math.round(lastEntry.startTime)}ms`);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          console.log(`CLS: ${clsValue.toFixed(4)}`);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Layout shift observer not supported');
      }
    }
  }

  static monitorResources() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      // Get all resource timings
      const resources = performance.getEntriesByType('resource');
      
      // Analyze large resources
      const largeResources = resources.filter(r => r.transferSize > 100000);
      if (largeResources.length > 0) {
        console.warn('Large resources detected:', largeResources.map(r => ({
          name: r.name,
          size: `${Math.round(r.transferSize / 1024)}KB`,
          duration: `${Math.round(r.duration)}ms`
        })));
      }

      // Analyze slow resources
      const slowResources = resources.filter(r => r.duration > 1000);
      if (slowResources.length > 0) {
        console.warn('Slow resources detected:', slowResources.map(r => ({
          name: r.name,
          duration: `${Math.round(r.duration)}ms`
        })));
      }
    });
  }

  static monitorNavigation() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const metrics = {
          'DNS Lookup': Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
          'TCP Connection': Math.round(navigation.connectEnd - navigation.connectStart),
          'Server Response': Math.round(navigation.responseEnd - navigation.requestStart),
          'DOM Processing': Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
          'Page Load': Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          'Total Load Time': Math.round(navigation.loadEventEnd - navigation.navigationStart)
        };

        console.log('Navigation Timing:', metrics);

        // Alert for slow metrics
        if (metrics['Total Load Time'] > 3000) {
          console.warn(`Slow page load detected: ${metrics['Total Load Time']}ms`);
        }
      }
    });
  }

  static reportMemoryUsage() {
    if ('memory' in performance) {
      const memory = performance.memory;
      console.log('Memory Usage:', {
        'Used JS Heap': `${Math.round(memory.usedJSHeapSize / 1048576)}MB`,
        'Total JS Heap': `${Math.round(memory.totalJSHeapSize / 1048576)}MB`,
        'JS Heap Limit': `${Math.round(memory.jsHeapSizeLimit / 1048576)}MB`
      });
    }
  }

  static measureComponentRender(componentName, renderFn) {
    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();
    
    if (endTime - startTime > 16) { // Slower than 60fps
      console.warn(`Slow component render: ${componentName} took ${Math.round(endTime - startTime)}ms`);
    }
    
    return result;
  }
}

// Auto-initialize in development
if (process.env.NODE_ENV === 'development') {
  PerformanceMonitor.init();
}
