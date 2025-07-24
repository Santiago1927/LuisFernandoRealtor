import { useState } from 'react';

export function usePropertyCardLogic(images: string[] = []) {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return {
    activeImage,
    nextImage,
    prevImage,
  };
} 