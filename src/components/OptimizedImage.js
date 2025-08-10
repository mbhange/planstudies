import React, { useState, useRef, useEffect } from 'react';
import { initImageObserver } from '../utils/performance';

const OptimizedImage = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  priority = false,
  quality = 80,
  placeholder = 'blur',
  blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmNmY2ZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTBlMGUwO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!priority && imgRef.current) {
      if (!observerRef.current) {
        observerRef.current = initImageObserver();
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        },
        {
          rootMargin: '50px',
          threshold: 0.1,
        }
      );

      observer.observe(imgRef.current);

      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Generate WebP and fallback sources
  const generateSources = (originalSrc) => {
    const baseSrc = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();
    
    return {
      webp: `${baseSrc}.webp`,
      original: originalSrc,
      fallback: extension === 'jpg' || extension === 'jpeg' 
        ? originalSrc 
        : `${baseSrc}.jpg`
    };
  };

  const sources = generateSources(src);

  const imageStyle = {
    transition: 'opacity 0.3s ease-in-out',
    opacity: isLoaded ? 1 : 0,
  };

  const placeholderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    backgroundImage: placeholder === 'blur' ? `url(${blurDataURL})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 1,
  };

  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        aria-label="Failed to load image"
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div style={containerStyle} ref={imgRef} className={className}>
      {/* Placeholder */}
      <div style={placeholderStyle} />
      
      {/* Actual Image */}
      {isInView && (
        <picture>
          {/* WebP source for modern browsers */}
          <source srcSet={sources.webp} type="image/webp" />
          
          {/* Fallback for older browsers */}
          <img
            src={sources.original}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            style={imageStyle}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default OptimizedImage;
