import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const payload = isLogin ? { email, password } : { name, email, password };
            const response = await api.post(endpoint, payload);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/portfolio');
            } else {
                // Handle case where registration might not return token immediately or requires login
                if (!isLogin) {
                    // If registration successful, switch to login or auto-login
                    // Assuming simplified flow where API returns token on register too, or we prompt login
                    if (response.data.token) {
                        localStorage.setItem('token', response.data.token);
                        navigate('/portfolio');
                    } else {
                        setIsLogin(true);
                        alert('Registration successful! Please login.');
                    }
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Portfolio System</h1>
                <p style={styles.subtitle}>
                    {isLogin
                        ? "Secure log in to your developer portfolio"
                        : "Create a new account to get started"}
                </p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    {!isLogin && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={styles.input}
                                placeholder="John Doe"
                            />
                        </div>
                    )}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                            minLength="6"
                        />
                    </div>
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
                    </button>
                </form>

                <p style={styles.toggleText}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        type="button"
                        onClick={() => { setIsLogin(!isLogin); setError(''); }}
                        style={styles.linkButton}
                    >
                        {isLogin ? 'Register' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: '"Inter", sans-serif',
    },
    card: {
        width: '100%',
        maxWidth: '420px',
        padding: '2.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '0.5rem',
        color: '#111827',
    },
    subtitle: {
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: '2rem',
        fontSize: '0.95rem',
        lineHeight: '1.5',
    },
    error: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        border: '1px solid #fecaca',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
    },
    input: {
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    button: {
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    toggleText: {
        marginTop: '1.5rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        color: '#6b7280',
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#2563eb',
        fontWeight: '500',
        cursor: 'pointer',
        padding: 0,
        textDecoration: 'underline',
    },
};

export default Login;
