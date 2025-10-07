"use client";
import SmartImage from "@/components/ui/SmartImage";

interface ImageWrapperProps {
  src: string | undefined | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  onError?: () => void;
}

export default function ImageWrapper(props: ImageWrapperProps) {
  // Pasar la URL directamente al SmartImage sin procesamiento
  const finalSrc = props.src || "/placeholder-property.svg";

  const handleError = () => {
    props.onError?.();
  };

  return (
    <SmartImage
      src={finalSrc}
      alt={props.alt}
      fill={props.fill}
      width={props.width}
      height={props.height}
      className={props.className}
      sizes={props.sizes}
      priority={props.priority}
      quality={props.quality}
      onError={handleError}
    />
  );
}
