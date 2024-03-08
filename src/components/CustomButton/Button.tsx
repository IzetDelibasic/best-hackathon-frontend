import React from 'react';

interface ButtonProps {
    title: string;
    Icon?: React.ElementType;
    onlyIcon?: boolean;
    iconClassName?: string;
    titleClassName?: string;
    className?: string;
    href?: string;
    children?: React.ReactNode; 
    onClick?: () => void; 
}

const Button: React.FC<ButtonProps> = ({
    title = "",
    Icon,
    onlyIcon,
    className = "",
    iconClassName = "",
    titleClassName = "",
    href,
    children,
    onClick,
}: ButtonProps) => {

    const handleClick = () => {
        if (href) {
            window.location.href = href;
        } else if (onClick) {
            onClick();
        }
    };

    const IconComponent = Icon ? Icon : () => null;

    return (
        <button
            onClick={handleClick}
            title={title}
            type="button"
            className={`px-6 lg:px-0 py-2 rounded-3xl shadow-md group ${className}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            {onlyIcon && Icon && <IconComponent className={`${iconClassName} text-20px`} />}
            {!onlyIcon && !Icon && (
                <span className={`${titleClassName} text-[17px]`}>
                    {title}
                </span>
            )}
            {Icon && title && !onlyIcon && (
                <>
                    <span className={`${titleClassName} text-[17px]`}>
                        {title}
                    </span>
                    <IconComponent className={`${iconClassName} text-[20px]`} />
                </>
            )}
            {children && children}
        </button>
    );
};

export default Button;
