import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signInWithGoogle } from '../../firebase/auth';
import styles from './HeroPage.module.css';

// Elegant Shape Component
function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    borderRadius = 16,
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={`${styles.elegantShape} ${className}`}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className={styles.shapeContainer}
            >
                <div
                    style={{ borderRadius }}
                    className={`${styles.shape} ${styles[gradient]}`}
                />
            </motion.div>
        </motion.div>
    );
}

export default function HeroPage({ onSignIn }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true);
            setError('');
            const user = await signInWithGoogle();
            if (user && onSignIn) {
                onSignIn(user);
            }
        } catch (error) {
            console.error('Sign in error:', error);
            setError('Failed to sign in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.heroContainer}>
            <div className={styles.backgroundGradient} />
            
            <div className={styles.shapesContainer}>
                {/* Tall rectangle - top left */}
                <ElegantShape
                    delay={0.3}
                    width={300}
                    height={500}
                    rotate={-8}
                    borderRadius={24}
                    gradient="fromIndigo"
                    className={styles.shapeTopLeft}
                />

                {/* Wide rectangle - bottom right */}
                <ElegantShape
                    delay={0.5}
                    width={600}
                    height={200}
                    rotate={15}
                    borderRadius={20}
                    gradient="fromRose"
                    className={styles.shapeBottomRight}
                />

                {/* Square - middle left */}
                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={300}
                    rotate={24}
                    borderRadius={32}
                    gradient="fromViolet"
                    className={styles.shapeMiddleLeft}
                />

                {/* Small rectangle - top right */}
                <ElegantShape
                    delay={0.6}
                    width={250}
                    height={100}
                    rotate={-20}
                    borderRadius={12}
                    gradient="fromAmber"
                    className={styles.shapeTopRight}
                />

                {/* Medium rectangle - center right */}
                <ElegantShape
                    delay={0.7}
                    width={400}
                    height={150}
                    rotate={35}
                    borderRadius={16}
                    gradient="fromEmerald"
                    className={styles.shapeCenterRight}
                />

                {/* Small square - bottom left */}
                <ElegantShape
                    delay={0.2}
                    width={200}
                    height={200}
                    rotate={-25}
                    borderRadius={28}
                    gradient="fromBlue"
                    className={styles.shapeBottomLeft}
                />

                {/* Tiny rectangle - top center */}
                <ElegantShape
                    delay={0.8}
                    width={150}
                    height={80}
                    rotate={45}
                    borderRadius={10}
                    gradient="fromPurple"
                    className={styles.shapeTopCenter}
                />

                {/* Wide rectangle - middle */}
                <ElegantShape
                    delay={0.9}
                    width={450}
                    height={120}
                    rotate={-12}
                    borderRadius={18}
                    gradient="fromTeal"
                    className={styles.shapeMiddle}
                />
            </div>

            <div className={styles.contentContainer}>
                <div className={styles.content}>
                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className={styles.title}>
                            <span className={styles.titleFirst}>
                                Track Habits.
                            </span>
                            <br />
                            <span className={styles.titleSecond}>
                                Be Consistent.
                            </span>
                        </h1>
                    </motion.div>
                    
                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className={styles.description}>
                            Build better habits with our simple, beautiful habit tracker. 
                            See your progress, celebrate your streaks, and achieve your goals.
                        </p>
                    </motion.div>

                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <button 
                            className={styles.signInButton}
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <div className={styles.googleIcon}>
                                <svg width="18" height="18" viewBox="0 0 18 18">
                                    <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                                    <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a6.8 6.8 0 01-10.18-3.54H1.83v2.07A8 8 0 008.98 17z"/>
                                    <path fill="#FBBC05" d="M4.5 10.48a6.8 6.8 0 010-4.96V3.45A8 8 0 001.83 6.5l2.67 2.07z"/>
                                    <path fill="#EA4335" d="M8.98 4.72c1.16 0 2.19.4 3.01 1.2l2.26-2.26A7.8 7.8 0 008.98 1a8 8 0 00-7.15 4.45l2.67 2.07c.64-1.9 2.4-3.8 4.48-3.8z"/>
                                </svg>
                            </div>
                            {isLoading ? 'Signing in...' : 'Sign in with Google'}
                        </button>
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={styles.errorMessage}
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.div
                        custom={4}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className={styles.footerText}>
                           Free forever
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className={styles.overlayGradient} />
        </div>
    );
}
