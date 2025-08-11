// TODO
// 1. Working sign in w/ google
// 2. Show password

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "/src/pages/Auth.css";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    
    const { login, signup, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    async function handleEmailAuth() {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if (isSignUp && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (isSignUp && password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            setError("");
            setLoading(true);
            
            if (isSignUp) {
                await signup(email, password);
            } else {
                await login(email, password);
            }
            
            navigate("/");
        } catch (error) {
            console.error("Auth error:", error);
            switch (error.code) {
                case "auth/user-not-found":
                    setError("No account found with this email");
                    break;
                case "auth/wrong-password":
                    setError("Incorrect password");
                    break;
                case "auth/invalid-email":
                    setError("Invalid email address");
                    break;
                case "auth/email-already-in-use":
                    setError("An account with this email already exists");
                    break;
                case "auth/weak-password":
                    setError("Password is too weak");
                    break;
                case "auth/too-many-requests":
                    setError("Too many failed attempts. Please try again later");
                    break;
                default:
                    setError(`Failed to ${isSignUp ? 'sign up' : 'sign in'}. Please try again`);
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        try {
            setError("");
            setLoading(true);
            await signInWithGoogle();
            navigate("/");
        } catch (error) {
            console.error("Google sign in error:", error);
            switch (error.code) {
                case "auth/popup-closed-by-user":
                    setError("Sign in cancelled");
                    break;
                case "auth/popup-blocked":
                    setError("Popup blocked. Please allow popups for this site");
                    break;
                case "auth/cancelled-popup-request":
                    setError("Sign in cancelled");
                    break;
                default:
                    setError("Failed to sign in with Google. Please try again");
            }
        } finally {
            setLoading(false);
        }
    }

    function toggleAuthMode() {
        setIsSignUp(!isSignUp);
        setError("");
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <img id="auth-logo" src="logo.png" alt="Logo"/>
                <h1 id="auth-title">PhysicsGPT</h1>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <div className="email-input input-div">
                    <input 
                        type="email" 
                        className="input-field" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="password-input input-div">
                    <input 
                        type="password" 
                        className="input-field" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>
                
                {isSignUp && (
                    <div className="password-input input-div">
                        <input 
                            type="password" 
                            className="input-field" 
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                )}

                <button 
                    className="auth-button"
                    onClick={handleEmailAuth}
                    disabled={loading}
                >
                    {loading ? 
                        (isSignUp ? "Creating account..." : "Signing in...") : 
                        (isSignUp ? "Sign up" : "Sign in")
                    }
                </button>
                
                <button 
                    className="auth-button google-signin"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Icon" />
                    {loading ? "Signing in..." : "Sign in with Google"}
                </button>
                
                <p className="auth-footer">
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleAuthMode(); }}>
                        {isSignUp ? "Sign in here!" : "Sign up, it's free!"}
                    </a>
                </p>
            </div>
        </div>
    )
}