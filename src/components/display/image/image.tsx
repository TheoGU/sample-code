import React from "react";
import ImageNext from "next/image";

interface Props {
  className?: string;
  src: string;
  alt: string;
}

export function Image({ src, alt, className, ...props }: Props) {
  return (
    <picture>
      <ImageNext className={className} src={src} alt={alt} {...props} />
    </picture>
  );
}
