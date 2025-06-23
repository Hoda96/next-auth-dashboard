'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import styles from './page.module.scss'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button/Button'

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Redirect if no user after initial check
        if (!user && !isLoading) {
            router.push('/auth')
        }
    }, [user, isLoading, router])

    useEffect(() => {
        // Simulate checking auth state
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.loadingSpinner} />
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeCard}>
                <h1 className={styles.title}>
                    {user.username || user.name || 'کاربر ناشناس'} عزیز
                </h1>
                <p className={styles.subtitle}>به داشبورد خوش آمدید.</p>

                <div className={styles.userInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>ایمیل:</span>
                        <span>{user.email || 'N/A'}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>شماره موبایل:</span>
                        <span>{user.phone || 'N/A'}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>وب‌سایت:</span>
                        <span>{user.website || 'N/A'}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>لوکیشن:</span>
                        <span>
                            {user.address?.street} {user.address?.city}, {user.address?.suite}, {user.address?.zipcode}

                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>شرکت:</span>
                        <span>{user.company?.name} </span>
                    </div>
                </div>

                <Button
                    onClick={logout}
                    variant="secondary"
                    className={styles.logoutButton}
                >
                    خروج
                </Button>
            </div>
        </div>
    )
}

export default DashboardPage