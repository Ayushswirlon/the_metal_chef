import React from 'react';

export const LazyImage = React.memo(({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onLoad={(e) => {
        e.target.classList.remove('opacity-0');
      }}
      style={{
        transition: 'opacity 0.3s ease-in-out',
      }}
    />
  );
}); 