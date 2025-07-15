import { useAuth } from "../hooks/useAuth";

export default function NewChat() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>New Chat</h1>
                <div>
                    <span>Welcome, {user?.email}</span>
                    <button 
                        onClick={handleLogout}
                        style={{ 
                            marginLeft: '10px',
                            padding: '5px 10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <p>Start a new conversation here!</p>
        </div>
    );
}