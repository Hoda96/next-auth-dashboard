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
        return null // Redirect will happen from useEffect
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.welcomeCard}>
                <h1 className={styles.title}>
                    {user.name?.first} {user.name?.last}
                </h1>
                <p className={styles.subtitle}>Welcome to your dashboard</p>

                <div className={styles.userInfo}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Email:</span>
                        <span>{user.email || 'N/A'}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Phone:</span>
                        <span>{user.phone || 'N/A'}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Cell:</span>
                        <span>{user.cell || 'N/A'}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Location:</span>
                        <span>
                            {user.location?.street?.number} {user.location?.street?.name},
                            {user.location?.city}, {user.location?.state}, {user.location?.country}
                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Nationality:</span>
                        <span>{user.nat || 'N/A'}</span>
                    </div>
                </div>

                <Button
                    onClick={logout}
                    variant="secondary"
                    className={styles.logoutButton}
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default DashboardPage