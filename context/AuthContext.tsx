import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

// Make google object available from the GSI script
declare global {
  interface Window {
    google: any;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  login: (tokenResponse: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A simple JWT decoder. In a real app, use a library like jwt-decode
// or verify the token on a backend server.
const decodeJwt = (token: string): any => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        console.error("Failed to decode JWT:", e);
        return null;
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleCredentialResponse = useCallback((response: any) => {
    const idToken = response.credential;
    const payload = decodeJwt(idToken);
    if (payload) {
      const newUser: User = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };
      setUser(newUser);
      // Persist user info in local storage
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Disable one-tap sign-in for the next visit
    if (window.google) {
        window.google.accounts.id.disableAutoSelect();
    }
    // Re-initialize the Google button for the logged-out state
    initializeGoogleSignIn();
  };
  
  const initializeGoogleSignIn = useCallback(() => {
    // Check if the script has loaded and if we have a client ID
    if (window.google && process.env.GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
            client_id: process.env.GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        const signInDiv = document.getElementById('signInDiv');
        if (signInDiv) {
             window.google.accounts.id.renderButton(
                signInDiv,
                { theme: "outline", size: "large", type: "standard", text: "signin_with", width: "200" } 
            );
        }
    } else if (process.env.GOOGLE_CLIENT_ID) {
        // If script hasn't loaded, wait for it.
        const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
        if (script) {
            script.addEventListener('load', initializeGoogleSignIn);
        }
    } else {
        // Note: Client ID not provided. Google Sign-In will not be displayed.
    }
  }, [handleCredentialResponse]);

  useEffect(() => {
    // Check for a logged-in user in local storage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      initializeGoogleSignIn();
    }
  }, [initializeGoogleSignIn]);

  return (
    <AuthContext.Provider value={{ user, login: handleCredentialResponse, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
