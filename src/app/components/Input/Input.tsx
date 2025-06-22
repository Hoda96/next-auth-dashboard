import React from 'react'
import styles from './Input.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

function Input({
    label,
    error,
    className = '',
    ...props
}: InputProps) {
    return (
        <div className={`${styles.inputGroup} ${className}`}>
            {label && <label className={styles.label}>{label}</label>}
            <input className={styles.input} {...props} />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    )
}

export default Input