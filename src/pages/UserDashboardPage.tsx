
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Heart, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePetShop } from "@/context/PetShopContext";

const UserDashboardPage = () => {
  const { isAuthenticated, isAdmin, user, adoptionRequests } = useAuth();
  const { cart } = usePetShop();
  
  // Redirect if not authenticated or if admin (admins have their own dashboard)
  if (!isAuthenticated() || isAdmin()) {
    return <Navigate to={isAdmin() ? "/admin" : "/login"} replace />;
  }
  
  // Filter adoption requests for current user
  const userAdoptionRequests = adoptionRequests.filter(
    request => request.userId === user?.id
  );
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Welcome back, {user?.name}
        </p>
        
        <Tabs defaultValue="adoptions" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="adoptions">
              <FileText className="h-4 w-4 mr-2" />
              My Adoption Requests
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              My Orders
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="adoptions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>My Adoption Requests</CardTitle>
                <CardDescription>
                  Track the status of your pet adoption requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userAdoptionRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p>You haven't submitted any adoption requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userAdoptionRequests.map((request) => (
                      <div 
                        key={request.id} 
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">Pet ID: {request.petId}</div>
                          <Badge 
                            variant={
                              request.status === "pending" 
                                ? "outline" 
                                : request.status === "approved" 
                                ? "default" 
                                : "destructive"
                            }
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Submitted: {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>
                  View your purchase history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p>You haven't made any purchases yet</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserDashboardPage;
