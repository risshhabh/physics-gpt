import "/src/pages/Auth.css";

export default function Auth() {
    return (
        <div className="auth-page">
            <div className="auth-container">
                <img id="auth-logo" src="logo.png" alt="Logo"/>
                <h1 id="auth-title">PhysicsGPT</h1>
                <div className="email-input input-div">
                    <input type="email" className="input-field" placeholder="Email" />
                </div>
                <div className="password-input input-div">
                    <input type="password" className="input-field" placeholder="Password" />
                </div>

                <button className="auth-button">Sign in</button>
                <button className="auth-button google-signin"><img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Icon" />Sign in with Google</button>
                <p className="auth-footer">
                    Don't have an account? <a href="#">Sign up, it's free!</a> {/* TODO : add link to sign up page */}
                </p>
            </div>
        </div>
    )
}