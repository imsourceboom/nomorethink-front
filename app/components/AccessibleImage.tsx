'use client';

import Image, { ImageProps } from 'next/image';

interface AccessibleImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;  // alt를 필수값으로 만듦
  caption?: string;
}

export const AccessibleImage = ({ 
  alt, 
  caption, 
  className = '', 
  ...props 
}: AccessibleImageProps) => {
  return (
    <figure className="relative">
      <Image
        {...props}
        alt={alt}
        className={`tg-animate-fade ${className}`}
      />
      {caption && (
        <figcaption className="tg-hint mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}; 