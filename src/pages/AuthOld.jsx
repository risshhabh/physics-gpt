import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { user, login, signup, signInWithGoogle, resetPassword } = useAuth();

    if (user) {
        return <Navigate to="/new" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError("");
        setLoading(true);

        try {
            await signInWithGoogle();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            setError("Please enter your email address");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await resetPassword(email);
            setError("Password reset email sent!");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px' }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ 
                        width: '100%', 
                        padding: '10px', 
                        marginBottom: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px'
                    }}
                >
                    {loading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}
                </button>
            </form>

            <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                style={{ 
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '10px',
                    backgroundColor: '#db4437',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                Sign in with Google
            </button>

            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <button 
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#007bff',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}
                >
                    {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
                </button>
            </div>

            {isLogin && (
                <div style={{ textAlign: 'center' }}>
                    <button 
                        type="button"
                        onClick={handlePasswordReset}
                        disabled={loading}
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#007bff',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                    >
                        Forgot Password?
                    </button>
                </div>
            )}
        </div>
    );
}