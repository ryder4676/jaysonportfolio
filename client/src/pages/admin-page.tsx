import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ClientRequests } from "@/components/admin/client-requests";
import { WebsiteAnalyses } from "@/components/admin/website-analyses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("client-requests");

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage client requests and website analyses
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Welcome, {user?.name || user?.username}
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>

          <Tabs
            defaultValue="client-requests"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-white shadow">
              <TabsTrigger value="client-requests">Client Requests</TabsTrigger>
              <TabsTrigger value="website-analyses">Website Analyses</TabsTrigger>
            </TabsList>

            <TabsContent value="client-requests" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Requests</CardTitle>
                  <CardDescription>
                    View and manage client project requests submitted through the form.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ClientRequests />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="website-analyses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Website Analyses</CardTitle>
                  <CardDescription>
                    Review website analysis requests and AI-generated recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WebsiteAnalyses />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
