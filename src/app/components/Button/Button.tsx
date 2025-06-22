import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
    isLoading?: boolean
}

function Button({
    children,
    variant = 'primary',
    isLoading = false,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className || ''}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? 'صبر کنید...' : children}
        </button>
    )
}

export default Button