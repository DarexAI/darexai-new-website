import React, { useState, useRef, useEffect } from 'react';

interface SEOOptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
}

const SEOOptimizedImage: React.FC<SEOOptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate responsive srcSet for Pexels images
  const generateSrcSet = (baseSrc: string): string => {
    if (baseSrc.includes('pexels.com')) {
      const baseUrl = baseSrc.split('?')[0];
      return `
        ${baseUrl}?auto=compress&cs=tinysrgb&w=400&fit=crop 400w,
        ${baseUrl}?auto=compress&cs=tinysrgb&w=800&fit=crop 800w,
        ${baseUrl}?auto=compress&cs=tinysrgb&w=1200&fit=crop 1200w,
        ${baseUrl}?auto=compress&cs=tinysrgb&w=1600&fit=crop 1600w
      `.trim();
    }
    return '';
  };

  // Generate optimized src for Pexels images
  const getOptimizedSrc = (baseSrc: string, w: number = 800): string => {
    if (baseSrc.includes('pexels.com')) {
      return `${baseSrc.split('?')[0]}?auto=compress&cs=tinysrgb&w=${w}&fit=crop`;
    }
    return baseSrc;
  };

  useEffect(() => {
    // Preload critical images
    if (priority && imgRef.current) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = getOptimizedSrc(src);
      document.head.appendChild(link);
    }
  }, [src, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    console.warn(`Failed to load image: ${src}`);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded" />
      )}
      
      {hasError ? (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
          <span>Image unavailable</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={getOptimizedSrc(src)}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        />
      )}
    </div>
  );
};

export default SEOOptimizedImage;