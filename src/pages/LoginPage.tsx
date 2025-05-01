
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md">
          <div className="flex justify-center mb-6">
            <div className="bg-petshop-purple/10 p-3 rounded-full">
              <PawPrint className="h-8 w-8 text-petshop-purple" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to Cutupet Center</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right">
                <Link 
                  to="/login" 
                  className="text-sm text-petshop-purple hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Button 
                type="submit" 
                className="w-full bg-petshop-purple hover:bg-petshop-dark-purple"
                disabled={isLoading}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              <div className="text-center text-sm text-muted-foreground mt-2">
                <p>Demo accounts:</p>
                <p>Admin: admin@cutupet.com / admin123</p>
                <p>User: user@example.com / user123</p>
              </div>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-petshop-purple hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="border-t border-gray-200 mt-6 pt-6">
            <p className="text-center text-sm text-muted-foreground">
              By continuing, you agree to Cutupet Center's Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
