// EdgarLego Complete Figure Component with Dynamic Colors
import { useMemo } from 'react';
import type { BrickColorPalette } from '../../store/buildStore';
import edgarLegoSvgRaw from '../../assets/images/EdgarLego.svg?raw';

interface EdgarLegoProps {
  style?: React.CSSProperties;
  colorPalette?: BrickColorPalette;
  className?: string;
}

function EdgarLego({ style, colorPalette, className }: EdgarLegoProps) {
  const primary = colorPalette?.primary || '#0080FF';
  const secondary = colorPalette?.secondary || '#005FBE';
  const tertiary = colorPalette?.tertiary || '#006DDA';
  const highlight = colorPalette?.highlight || '#169AFF';

  // Apply color transformations via string replacement (memoized)
  const coloredSvg = useMemo(() => {
    return edgarLegoSvgRaw
      .replace(/#0080FF/gi, primary)
      .replace(/#005FBE/gi, secondary)
      .replace(/#006DDA/gi, tertiary)
      .replace(/#169AFF/gi, highlight)
      .replace(/#1391F6/gi, primary) // Cap top color - map to primary
      .replace(/width="159"/, 'width="100%"')
      .replace(/height="302"/, 'height="100%"');
  }, [primary, secondary, tertiary, highlight]);

  return (
    <div 
      className={className}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        ...style 
      }}
      dangerouslySetInnerHTML={{ __html: coloredSvg }}
    />
  );
}

export default EdgarLego;
