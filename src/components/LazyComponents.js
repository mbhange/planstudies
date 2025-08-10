import loadable from '@loadable/component';
import React from 'react';

// Loading fallback component
const LoadingFallback = ({ text = 'Loading...', minHeight = '200px' }) => (
  <div 
    className="flex items-center justify-center w-full bg-gray-50 animate-pulse"
    style={{ minHeight }}
  >
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error, retry }) => (
  <div className="flex items-center justify-center w-full min-h-[200px] bg-red-50 border border-red-200 rounded-lg">
    <div className="text-center p-6">
      <div className="text-red-600 mb-2">
        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to load component</h3>
      <p className="text-red-600 text-sm mb-4">{error?.message || 'Something went wrong'}</p>
      {retry && (
        <button 
          onClick={retry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

// Create lazy component with optimized loading
const createLazyComponent = (importFunc, fallbackProps = {}) => {
  return loadable(importFunc, {
    fallback: <LoadingFallback {...fallbackProps} />,
    errorBoundary: ErrorFallback
  });
};

// Lazy load heavy components - Add your actual component imports here
export const LazyDashboard = createLazyComponent(
  () => import('../pages/Dashboard'),
  { text: 'Loading Dashboard...', minHeight: '400px' }
);

export const LazyProfile = createLazyComponent(
  () => import('../pages/Profile'),
  { text: 'Loading Profile...', minHeight: '300px' }
);

export const LazySettings = createLazyComponent(
  () => import('../pages/Settings'),
  { text: 'Loading Settings...', minHeight: '300px' }
);

export const LazyApplications = createLazyComponent(
  () => import('../pages/Applications'),
  { text: 'Loading Applications...', minHeight: '400px' }
);

export const LazyUniversities = createLazyComponent(
  () => import('../pages/Universities'),
  { text: 'Loading Universities...', minHeight: '400px' }
);

export const LazyChat = createLazyComponent(
  () => import('../pages/Chat'),
  { text: 'Loading Chat...', minHeight: '500px' }
);

// Heavy UI components
export const LazyChart = createLazyComponent(
  () => import('../components/Chart'),
  { text: 'Loading Chart...', minHeight: '300px' }
);

export const LazyDataTable = createLazyComponent(
  () => import('../components/DataTable'),
  { text: 'Loading Table...', minHeight: '200px' }
);

export const LazyImageGallery = createLazyComponent(
  () => import('../components/ImageGallery'),
  { text: 'Loading Gallery...', minHeight: '400px' }
);

// Export the utilities for custom usage
export { createLazyComponent, LoadingFallback, ErrorFallback };
