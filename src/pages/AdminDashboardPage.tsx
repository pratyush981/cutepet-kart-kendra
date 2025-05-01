
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Plus, UserPlus, FileText, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AddPetForm from "@/components/admin/AddPetForm";

const AdminDashboardPage = () => {
  const { isAuthenticated, isAdmin, adoptionRequests, newUsers, updateAdoptionRequestStatus } = useAuth();
  const [activeTab, setActiveTab] = useState("adoptions");

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-6 w-6 text-petshop-purple" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground mb-6">Manage pets, adoptions, and users</p>
        
        <Tabs 
          defaultValue="adoptions" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="adoptions">Adoption Requests</TabsTrigger>
            <TabsTrigger value="addPet">Add New Pet</TabsTrigger>
            <TabsTrigger value="users">New Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="adoptions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Adoption Requests</CardTitle>
                <CardDescription>
                  Review and manage adoption requests from users
                </CardDescription>
              </CardHeader>
              <CardContent>
                {adoptionRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p>No adoption requests to review</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {adoptionRequests.map((request) => (
                      <div 
                        key={request.id} 
                        className="border rounded-lg p-4 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Pet ID: {request.petId}</span>
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
                          <p className="text-sm text-muted-foreground">
                            User ID: {request.userId} - {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                              onClick={() => updateAdoptionRequestStatus(request.id, "approved")}
                            >
                              <Check className="h-4 w-4 mr-1" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
                              onClick={() => updateAdoptionRequestStatus(request.id, "rejected")}
                            >
                              <X className="h-4 w-4 mr-1" /> Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="addPet" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Pet
                </CardTitle>
                <CardDescription>
                  Add a new pet to the shop with all required details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddPetForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  New User Registrations
                </CardTitle>
                <CardDescription>
                  Recently registered users on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {newUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p>No new users have joined recently</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {newUsers.map((user) => (
                      <div 
                        key={user.id} 
                        className="border rounded-lg p-4"
                      >
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Joined: {new Date(user.joinedAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  Total new users: {newUsers.length}
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboardPage;
