import React from 'react';
import logoLego from '../../assets/images/Logo.Lego.svg';

interface PageLayoutProps {
    children: React.ReactNode;
    showLogo?: boolean;
    backgroundColor?: string;
    className?: string;       // Classes for the outer container
    contentClassName?: string; // Classes for the inner content container
}

const PageLayout: React.FC<PageLayoutProps> = ({
    children,
    showLogo = true,
    backgroundColor = '#fefff8',
    className = '',
    contentClassName = ''
}) => {
    return (
        <div
            className={`h-screen w-full relative flex flex-col ${className}`}
            style={{ backgroundColor }}
        >
            {showLogo && (
                <div className="absolute top-8 left-6 md:top-8 md:left-8 z-50">
                    <img
                        src={logoLego}
                        alt="LEGO Logo"
                        className="w-[80px] h-auto lg:w-[120px] transition-all duration-300"
                    />
                </div>
            )}
            <div className={`flex-1 flex flex-col w-full h-full ${contentClassName}`}>
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
