'use client';
import React from 'react';
import { useState } from 'react';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';

const validatePhone = (phone: string) => {
    const iranPhoneRegex = /^(?:(?:0098|\\+98|0)9[0-9]{9})$/;
    return iranPhoneRegex.test(phone);
};

function AuthPage() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validatePhone(phone)) {
            setError('شماره تلفن باید متعلق به ایران باشد.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await login();
            router.push('/dashboard');
        } catch (error) {
            console.error('Login Error', error);
            setError('ورود با مشکل مواجه شد. لطفاً دوباره تلاش کنید.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <h1 className={styles.title}>ورود به سیستم</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <Input
                        type="tel"
                        label="شماره تلفن همراه"
                        placeholder="09xxxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={error}
                        required
                    />

                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={isLoading}
                        className={styles.submitButton}
                    >
                        ورود
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;