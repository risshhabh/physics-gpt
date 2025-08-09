// import { useAuth } from "../hooks/useAuth"; // UNCOMMENT AFTER TESTING AUTHENTICATION
import InputBox from "../components/InputBox";

export default function NewChat() {

    /** DEV: COMMENTED OUT THE FOLLOWING TO ALLOW FOR TESTING WHILE AUTHENTICATIOn
     * IS NOT IMPLEMENTED

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    */

    return (
        <>
            <h1>New Chat</h1>
            <InputBox />
        </>
    );
}