import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Portfolio = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/api/auth/me'); // Adjust endpoint if needed
                setUser(response.data);
            } catch (err) {
                console.error('Failed to fetch user', err);
                setError('Failed to load profile. Please login again.');
                localStorage.removeItem('token');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            fetchUser();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (loading) return <div style={styles.center}><p>Loading...</p></div>;
    if (error) return <div style={styles.center}><p style={{ color: 'red' }}>{error}</p></div>;

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.brand}>
                        <h1 style={styles.logo}>Muzammil Muzaffar</h1>
                        <p style={styles.role}>AI & Machine Learning Engineer | Full-Stack Developer</p>
                    </div>
                    <div style={styles.userInfo}>
                        <span style={styles.email}>{user?.email}</span>
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    </div>
                </div>
            </header>

            <main style={styles.main}>
                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>About Me</h2>
                    <div style={styles.card}>
                        <p style={styles.text}>
                            I am an AI and Machine Learning engineering student with hands-on experience
                            in building production-ready ML pipelines and secure full-stack web applications.
                            I have worked on real-world systems involving authentication, role-based access
                            control, cloud deployment, and GenAI-powered features.
                        </p>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Skills</h2>
                    <div style={styles.skillsGrid}>
                        <div style={styles.skillCategory}>
                            <h3 style={styles.skillCategoryTitle}>Programming Languages</h3>
                            <div style={styles.grid}>
                                {['Python', 'Java', 'JavaScript', 'HTML', 'CSS'].map((skill, index) => (
                                    <div key={index} style={styles.skillCard}>{skill}</div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.skillCategory}>
                            <h3 style={styles.skillCategoryTitle}>Frameworks & Backend</h3>
                            <div style={styles.grid}>
                                {['React.js', 'Node.js', 'Express.js', 'Flask', 'Editor.js'].map((skill, index) => (
                                    <div key={index} style={styles.skillCard}>{skill}</div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.skillCategory}>
                            <h3 style={styles.skillCategoryTitle}>AI / Machine Learning</h3>
                            <div style={styles.grid}>
                                {['Numpy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'LangChain', 'Streamlit', 'FAISS', 'Transformers', 'Matplotlib', 'Seaborn', 'Agentic AI'].map((skill, index) => (
                                    <div key={index} style={styles.skillCard}>{skill}</div>
                                ))}
                            </div>
                        </div>

                        <div style={styles.skillCategory}>
                            <h3 style={styles.skillCategoryTitle}>Databases & Tools</h3>
                            <div style={styles.grid}>
                                {['MongoDB', 'PostgreSQL', 'Neon DB', 'Docker', 'Git', 'GitHub', 'Vercel', 'Render'].map((skill, index) => (
                                    <div key={index} style={styles.skillCard}>{skill}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section style={styles.section}>
                    <h2 style={styles.sectionTitle}>Projects</h2>
                    <div style={styles.projectGrid}>
                        <div style={styles.projectCard}>
                            <h3 style={styles.projectTitle}>QPDS – Question Paper Design System</h3>
                            <p style={styles.projectDesc}>
                                A secure full-stack system built using React, Flask, and PostgreSQL
                                to digitize examination workflows. Includes JWT authentication,
                                role-based access control, and GenAI-assisted question generation.
                            </p>
                            <a
                                href="https://github.com/Muzammil0777/QPDS-UI"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.link}
                            >
                                View Repository →
                            </a>
                        </div>
                        <div style={styles.projectCard}>
                            <h3 style={styles.projectTitle}>Article Generator using RAG</h3>
                            <p style={styles.projectDesc}>
                                A Retrieval-Augmented Generation system using FAISS and Transformer-based
                                models to generate context-aware articles with persona-based tone control.
                            </p>
                            <a
                                href="https://github.com/Muzammil0777/Article-Generator-using-RAG-and-Sentiment-Analysis"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.link}
                            >
                                View Repository →
                            </a>
                        </div>
                        <div style={styles.projectCard}>
                            <h3 style={styles.projectTitle}>AI-Powered Personal Finance Tracker</h3>
                            <p style={styles.projectDesc}>
                                An AI-driven finance management system with expense categorization,
                                forecasting, and personalized insights using machine learning.
                            </p>
                            <a
                                href="https://github.com/Muzammil0777/Personal-Finance-Tracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.link}
                            >
                                View Repository →
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer style={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Muzammil Muzaffar. All rights reserved.</p>
            </footer>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: '"Inter", sans-serif',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#374151',
    },
    header: {
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: '1rem 0',
    },
    headerContent: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    brand: {
        display: 'flex',
        flexDirection: 'column',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#111827',
        margin: 0,
        lineHeight: '1.2',
    },
    role: {
        fontSize: '0.9rem',
        color: '#4b5563',
        margin: 0,
        fontWeight: '500',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    email: {
        color: '#4b5563',
        fontWeight: '500',
        fontSize: '0.9rem',
        display: 'block',
    },
    logoutButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        border: '1px solid #fecaca',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    main: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '3rem 2rem',
    },
    section: {
        marginBottom: '4rem',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#111827',
        marginBottom: '1.5rem',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '0.75rem',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
    },
    text: {
        lineHeight: '1.7',
        color: '#374151',
        fontSize: '1.05rem',
    },
    skillsGrid: {
        display: 'grid',
        gap: '2rem',
    },
    skillCategory: {
        backgroundColor: '#ffffff',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #f3f4f6',
    },
    skillCategoryTitle: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '1rem',
        borderBottom: '1px solid #f3f4f6',
        paddingBottom: '0.5rem',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
    },
    skillCard: {
        backgroundColor: '#eff6ff',
        color: '#1e40af',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: '500',
        border: '1px solid #dbeafe',
    },
    projectGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    projectCard: {
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f3f4f6',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    projectTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1rem',
    },
    projectDesc: {
        color: '#4b5563',
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
        flex: '1',
    },
    link: {
        display: 'inline-block',
        color: '#2563eb',
        fontWeight: '600',
        fontSize: '0.95rem',
        textDecoration: 'none',
        transition: 'color 0.2s',
        marginTop: 'auto',
    },
    footer: {
        textAlign: 'center',
        padding: '2rem',
        color: '#9ca3af',
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        marginTop: 'auto',
    },
};

export default Portfolio;
