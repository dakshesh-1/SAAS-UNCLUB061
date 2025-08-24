import React, { useState } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  loading?: "lazy" | "eager";
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

interface StaticImageProps extends BaseImageProps {
  animated?: false;
}

interface AnimatedImageProps extends BaseImageProps, Omit<MotionProps, 'src' | 'alt' | 'className' | 'onError'> {
  animated: true;
}

type ImageProps = StaticImageProps | AnimatedImageProps;

export function Image({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  loading = "lazy",
  onError,
  ...props
}: ImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!hasErrored && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasErrored(true);
    }
    onError?.(e);
  };

  // For animated images using framer-motion
  if ('animated' in props && props.animated) {
    const { animated, ...motionProps } = props;
    return (
      <motion.img
        src={currentSrc}
        alt={alt}
        loading={loading}
        onError={handleError}
        className={cn("object-cover", className)}
        {...motionProps}
      />
    );
  }

  // For static images
  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={cn("object-cover", className)}
    />
  );
}

export default Image;
