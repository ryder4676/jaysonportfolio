import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
  adminOnly = false
}: {
  path: string;
  component: () => React.JSX.Element;
  adminOnly?: boolean;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  if (adminOnly && !user.isAdmin) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen flex-col">
          <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}
