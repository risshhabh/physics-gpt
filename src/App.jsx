import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./hooks/useAuth";
import "./index.css";

// LaTeX rendering using KaTeX
import 'katex/dist/katex.min.css';

// pages
import Auth from "./pages/Auth";
import NewChat from "./pages/NewChat";
import Chat from "./pages/Chat";

// components
import ScrollToTop from "./components/ScrollToTop";

// ensure the user cannot navigate to unwanted pages if not logged in
function ProtectedRoute({ children }) {

    // DEV: COMMENTED OUT THE FOLLOWING TO ALLOW NAVIGATION WHILE NOT LOGGED IN

    // const { user } = useAuth();
    
    // if (!user) return <Navigate to="/auth" />;
    
    return children;
}

function AppRoutes() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Navigate to={user ? "/new" : "/auth"} />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/new" element={
                    <ProtectedRoute>
                        <NewChat />
                    </ProtectedRoute>
                } />
                <Route path="/chat" element={
                    <ProtectedRoute>
                        <Chat />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}