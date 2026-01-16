import type { BrickColorPalette } from '../../store/buildStore';

interface DoorsLeftSideProps {
    style?: React.CSSProperties;
    colorPalette?: BrickColorPalette;
}

const DoorsLeftSide = ({ style, colorPalette }: DoorsLeftSideProps) => {
    const primary = colorPalette?.primary || '#0080FF';
    const secondary = colorPalette?.secondary || '#005FBE';
    const highlight = colorPalette?.highlight || '#169AFF';

    return (
        <svg width="70" height="174" viewBox="0 0 70 174" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
            <path d="M56.7038 173.901L56.1312 38.3629L68.6903 31.6286L69.263 167.166L56.7038 173.901Z" fill={secondary} />
            <path d="M0.124581 7.07771L55.8724 38.4006L69.7122 30.9024L13.1802 0L0.124581 7.07771Z" fill={highlight} />
            <path d="M55.8724 38.4006L69.7122 30.9024L13.1802 0L0.124581 7.07771L55.8724 38.4006ZM13.1786 0.569307L68.6655 30.9007L55.8765 37.8289L1.15895 7.08489L13.1786 0.569307Z" fill="black" />
            <path d="M0.109193 143.246L0 6.79051L56.5942 38.4006L56.7038 173.401L0.109193 143.246Z" fill={primary} />
        </svg>
    );
};

export default DoorsLeftSide;
