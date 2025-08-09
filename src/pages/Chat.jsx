// import { useAuth } from "../hooks/useAuth"; // UNCOMMENT AFTER TESTING AUTHENTICATION
import InputBox from "../components/InputBox";
import ChatBubble from "../components/ChatBubble";
import "./Chat.css";

export default function Chat() {

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
            <div className="chat-messages">
                <ChatBubble message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." sender="assistant" />
                <ChatBubble message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." sender="user" />
                <ChatBubble message="Here is some math to do. $$\frac{3}{4} + \frac{5}{6}$$" sender="user" />
            </div>
            <InputBox />
        </>
    );
}