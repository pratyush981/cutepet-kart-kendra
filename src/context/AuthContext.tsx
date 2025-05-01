
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

interface AdoptionRequest {
  id: string;
  petId: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface NewUser {
  id: string;
  email: string;
  name: string;
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
  adoptionRequests: AdoptionRequest[];
  newUsers: NewUser[];
  createAdoptionRequest: (petId: string) => void;
  updateAdoptionRequestStatus: (requestId: string, status: "approved" | "rejected") => void;
  addPet: (pet: any) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo purposes
const mockUsers = [
  {
    id: "1",
    email: "admin@cutupet.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user" as const,
  },
];

// Mock adoption requests
const mockAdoptionRequests = [
  {
    id: "ar1",
    petId: "1",
    userId: "2",
    status: "pending" as const,
    createdAt: "2025-04-29T10:30:00Z",
  },
  {
    id: "ar2",
    petId: "3",
    userId: "2",
    status: "approved" as const,
    createdAt: "2025-04-28T14:20:00Z",
  },
];

// Mock new users
const mockNewUsers = [
  {
    id: "3",
    email: "newuser@example.com",
    name: "New User",
    joinedAt: "2025-05-01T09:15:00Z",
  },
  {
    id: "4",
    email: "recent@example.com",
    name: "Recent Signup",
    joinedAt: "2025-04-30T16:45:00Z",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [adoptionRequests, setAdoptionRequests] = useState<AdoptionRequest[]>(mockAdoptionRequests);
  const [newUsers, setNewUsers] = useState<NewUser[]>(mockNewUsers);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      setIsLoading(false);
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      toast({
        title: "Signup failed",
        description: "Email already in use",
        variant: "destructive",
      });
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `${mockUsers.length + 1}`,
      email,
      password,
      name,
      role: "user" as const,
    };
    
    // Update mock users (in a real app, this would be a database call)
    mockUsers.push(newUser);
    
    // Add to new users list
    const newUserRecord = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      joinedAt: new Date().toISOString(),
    };
    setNewUsers(prev => [newUserRecord, ...prev]);
    
    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    
    toast({
      title: "Signup successful",
      description: `Welcome, ${name}!`,
    });
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const createAdoptionRequest = (petId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to adopt a pet",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const newRequest: AdoptionRequest = {
      id: `ar${adoptionRequests.length + 1}`,
      petId,
      userId: user.id,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setAdoptionRequests(prev => [newRequest, ...prev]);
    
    toast({
      title: "Adoption request submitted",
      description: "Your request has been submitted and is pending approval.",
    });
  };

  const updateAdoptionRequestStatus = (requestId: string, status: "approved" | "rejected") => {
    setAdoptionRequests(prev => 
      prev.map(request => 
        request.id === requestId ? { ...request, status } : request
      )
    );

    toast({
      title: `Request ${status}`,
      description: `The adoption request has been ${status}.`,
    });
  };

  const addPet = (pet: any) => {
    // This function will be implemented in the PetShopContext
    toast({
      title: "Pet added",
      description: `${pet.name} has been added to the pet shop.`,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAdmin,
        isAuthenticated,
        adoptionRequests,
        newUsers,
        createAdoptionRequest,
        updateAdoptionRequestStatus,
        addPet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
