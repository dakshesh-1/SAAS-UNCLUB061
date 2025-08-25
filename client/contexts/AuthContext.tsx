import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  joinDate: string;
  isVerified: boolean;
  stats: {
    eventsAttended: number;
    eventsHosted: number;
    friends: number;
    rating: number;
  };
  badges: Array<{
    id: number;
    name: string;
    icon: any;
    color: string;
  }>;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  users: User[]; // For account switching
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchAccount: (userId: string) => void;
  register: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Chen",
    username: "@alexpartyking",
    email: "alex@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b9e2b36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bio: "Party planner extraordinaire 🎉 | Event enthusiast | Making memories one party at a time ✨",
    location: "Los Angeles, CA",
    joinDate: "March 2024",
    isVerified: true,
    stats: {
      eventsAttended: 47,
      eventsHosted: 12,
      friends: 2847,
      rating: 4.9,
    },
    badges: [
      {
        id: 1,
        name: "Party Legend",
        icon: "Crown",
        color: "from-unclub-red to-party-red",
      },
      {
        id: 2,
        name: "Social Butterfly",
        icon: "Users",
        color: "from-unclub-pink to-party-pink",
      },
      {
        id: 3,
        name: "Event Master",
        icon: "Trophy",
        color: "from-unclub-blue to-party-blue",
      },
      {
        id: 4,
        name: "Super Host",
        icon: "Medal",
        color: "from-party-electric to-unclub-hotpink",
      },
    ],
  },
  {
    id: "2",
    name: "Maya Rodriguez",
    username: "@mayavibes",
    email: "maya@example.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bio: "Music lover 🎵 | Festival goer | Always down for a good time! ✌️",
    location: "Miami, FL",
    joinDate: "January 2024",
    isVerified: false,
    stats: {
      eventsAttended: 23,
      eventsHosted: 5,
      friends: 892,
      rating: 4.7,
    },
    badges: [
      {
        id: 1,
        name: "Music Fan",
        icon: "Music",
        color: "from-unclub-blue to-party-blue",
      },
      {
        id: 2,
        name: "Newcomer",
        icon: "Star",
        color: "from-unclub-pink to-party-pink",
      },
    ],
  },
  {
    id: "3",
    name: "Jake Williams",
    username: "@jakeparty",
    email: "jake@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    bio: "Tech enthusiast & party host 🚀 | Building connections through events 💫",
    location: "Austin, TX",
    joinDate: "February 2024",
    isVerified: true,
    stats: {
      eventsAttended: 31,
      eventsHosted: 18,
      friends: 1456,
      rating: 4.8,
    },
    badges: [
      {
        id: 1,
        name: "Tech Guru",
        icon: "Laptop",
        color: "from-unclub-blue to-party-blue",
      },
      {
        id: 2,
        name: "Host Pro",
        icon: "Users",
        color: "from-unclub-red to-party-red",
      },
      {
        id: 3,
        name: "Verified",
        icon: "Zap",
        color: "from-party-electric to-unclub-hotpink",
      },
    ],
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users] = useState<User[]>(mockUsers);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email (in real app, this would be handled by backend)
    const user = users.find((u) => u.email === email);

    if (user && password) {
      // In real app, password would be verified by backend
      setCurrentUser(user);
      setIsAuthenticated(true);

      // Store in localStorage for persistence
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUserId", user.id);

      return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUserId");
  };

  const switchAccount = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUserId", user.id);
    }
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, this would create a new user via API
    // For demo purposes, we'll just log them in as the first mock user
    if (userData.email) {
      const newUser = users[0]; // Use first mock user for demo
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUserId", newUser.id);
      return true;
    }

    return false;
  };

  // Initialize auth state from localStorage on mount
  React.useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUserId = localStorage.getItem("currentUserId");

    if (storedAuth === "true" && storedUserId) {
      const user = users.find((u) => u.id === storedUserId);
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    }
  }, [users]);

  const value: AuthContextType = {
    isAuthenticated,
    currentUser,
    users,
    login,
    logout,
    switchAccount,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
