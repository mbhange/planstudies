import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {},
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPgo8L3N2Zz4=',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start loading the image when it's about to come into view
          const tempImg = new Image();
          tempImg.onload = () => {
            setIsLoaded(true);
          };
          tempImg.onerror = () => {
            setIsError(true);
          };
          tempImg.src = src;
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    );

    observer.observe(img);

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {/* Placeholder */}
      {!isLoaded && !isError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
          style={{ backgroundColor: '#f3f4f6' }}
        />
      )}
      
      {/* Main image */}
      {!isError && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
      
      {/* Error fallback */}
      {isError && (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
          <span>Failed to load image</span>
        </div>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
