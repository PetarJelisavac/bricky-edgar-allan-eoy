// BackSideRightColumn LEGO Brick Component - Right column overlay for z-index layering
import type { BrickColorPalette } from '../../store/buildStore';

interface BackSideRightColumnProps {
  style?: React.CSSProperties;
  colorPalette?: BrickColorPalette;
}

function BackSideRightColumn({ style, colorPalette }: BackSideRightColumnProps) {
  const primary = colorPalette?.primary || '#0080FF';

  return (
    <svg width="212" height="358" viewBox="0 0 212 358" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      {/* Right column - these paths need to overlap the 1x1 pip */}
      <path d="M211 179.649L151 211.695L151 226.344L211 194.757V179.649Z" fill={primary}/>
      <path d="M211 137.187L151 169.162V209.902L211 178.142V137.187Z" fill={primary}/>
      <path d="M180.5 110.745L151.001 126.597V168.5L180.5 152.7V110.745Z" fill={primary}/>
      <path d="M210.5 94.7446L181.001 110.597V152.5L210.5 136.7V94.7446Z" fill={primary}/>
    </svg>
  );
}

export default BackSideRightColumn;
