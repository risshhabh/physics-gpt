# Authentication

This file provides documentation for the authentication system used in the application. It covers the usage of Firebase Authentication and the `AuthContext` file.


# `AuthContext` Documentation

## Overview

The `AuthContext` is a [React Context](https://reactjs.org/docs/context.html) that stores and shares authentication-related state and functions globally across the component tree.

This includes:

- The current user (`user`)
- Functions for:
  - Signing up
  - Logging in
  - Logging out
  - Google Sign-in
  - Password reset

The context is managed using React’s Context API (`createContext`, `useContext`) and Firebase Auth SDK methods.

---

## `createContext` and `useContext`

### `createContext()`

```js
const AuthContext = createContext();
```

- This creates a context object.
- It will later be used by the provider to wrap the component tree and supply context values (`<AuthContext.Provider>`).

### `useContext(AuthContext)`

```js
export function useAuth() {
    return useContext(AuthContext);
}
```

- This is a custom hook that simplifies access to the context.
- It can be used inside any functional component like so:

```js
const { user, login, logout } = useAuth();
```

---

## `AuthProvider`

```js
export function AuthProvider({ children }) { ... }
```

- This is a wrapper component that should be placed around your app (usually in `App.js` or `index.js`) to provide access to the auth context.
- It manages the authentication state (`user`) and exposes Firebase Auth methods to the entire component tree.

### State Variables

```js
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
```

- `user`: Holds the currently signed-in user or `null`.
- `loading`: Ensures components don’t render until Firebase has confirmed the auth state.

### Firebase Methods Wrapped

- `signup(email, password)`
- `login(email, password)`
- `logout()`
- `signInWithGoogle()`
- `resetPassword(email)`

Each is a wrapper around Firebase’s respective authentication functions.

### Listening to Auth Changes

```js
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
    });
    return unsubscribe;
}, []);
```

- Listens for real-time auth changes (e.g., login/logout).
- Sets the `user` when a change occurs and stops loading.

### Return Statement

```js
return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
);
```

- Wraps the app in the `AuthContext.Provider` so all children can access auth data and functions.
- The provider only renders children once the loading is complete (`!loading`).
- The `value` provided includes all relevant functions and the `user` object.

---

## Example Usage

```js
import { useAuth } from './AuthContext';

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div>
            <p>Welcome, {user?.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
```

---

## Setup Instructions

In your app’s entry point (e.g., `index.js`):

```js
import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
```

Now, all components inside `<App />` can access the authentication context via `useAuth()`.

---