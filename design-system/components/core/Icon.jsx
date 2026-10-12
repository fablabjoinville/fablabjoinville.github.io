import React from 'react';
export function Icon({ name, size = 20, color = 'currentColor', style, ...rest }) {
  const url = `https://unpkg.com/lucide-static@0.460.0/icons/${name}.svg`;
  return <span aria-hidden="true" {...rest} style={{ display: 'inline-block', flex: 'none', width: size, height: size, background: color, WebkitMask: `url(${url}) center/contain no-repeat`, mask: `url(${url}) center/contain no-repeat`, ...style }} />;
}
