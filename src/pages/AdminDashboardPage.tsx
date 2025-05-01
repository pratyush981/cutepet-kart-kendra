
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminDashboardPage = () => {
  const { isAuthenticated, isAdmin, adoptionRequests, newUsers, updateAdoptionRequestStatus } = useAuth();
  const [activeTab, setActiveTab] = useState("adoptions");

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "adoptions":
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Adoption Requests</h2>
              <p className="text-muted-foreground">Review and manage adoption requests from users</p>
            </div>
            
            {adoptionRequests.length === 0 ? (
              <div className="text-center py-8">
                <p>No adoption requests to review</p>
              </div>
            ) : (
              <div className="space-y-4">
                {adoptionRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="border rounded-lg p-4"
                  >
                    <div className="flex flex-col gap-1 mb-2">
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
                          {request.status === "pending" ? "Pending" : 
                           request.status === "approved" ? "Approved" : "Rejected"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        User ID: {request.userId} - {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {request.status === "pending" && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 flex items-center"
                          onClick={() => updateAdoptionRequestStatus(request.id, "approved")}
                        >
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center"
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
          </div>
        );
      case "addPet":
        return (
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Add New Pet</h2>
              <p className="text-muted-foreground">Add a new pet to the shop with all required details</p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <AddPetForm />
              </CardContent>
            </Card>
          </div>
        );
      case "users":
        return (
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">New Users</h2>
              <p className="text-muted-foreground">Recently registered users on the platform</p>
            </div>
            
            {newUsers.length === 0 ? (
              <div className="text-center py-8">
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-6 w-6 text-petshop-purple" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground mb-6">Manage pets, adoptions, and users</p>
        
        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <button
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              activeTab === "adoptions" 
                ? "bg-white shadow-sm" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick("adoptions")}
          >
            Adoption Requests
          </button>
          <button
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              activeTab === "addPet" 
                ? "bg-white shadow-sm" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick("addPet")}
          >
            Add New Pet
          </button>
          <button
            className={`py-3 px-4 rounded-lg text-center transition-colors ${
              activeTab === "users" 
                ? "bg-white shadow-sm" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => handleTabClick("users")}
          >
            New Users
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {renderTabContent()}
        </div>
      </div>
    </Layout>
  );
};

// Import at the end to avoid circular dependencies
import AddPetForm from "@/components/admin/AddPetForm";

export default AdminDashboardPage;
