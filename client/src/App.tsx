import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import PortfolioPage from "@/pages/portfolio-page";
import PortfolioDetail from "@/pages/portfolio-detail";
import ServicesPage from "@/pages/services-page";
import ContactPage from "@/pages/contact-page";
import WebsiteAnalyzer from "@/pages/website-analyzer";
import AdminPage from "@/pages/admin-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";

// Demo Projects
import TechMarketDemo from "./demos/techmarket";
import TaskFlowDemo from "./demos/taskflow";
import AnalyticsDemo from "./demos/analytics";
import HealthTrackDemo from "./demos/healthtrack";
import BoutiqueStoreDemo from "./demos/boutiquestore";
import CorporatePortalDemo from "./demos/corporateportal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/portfolio/:id" component={PortfolioDetail} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/analyze" component={WebsiteAnalyzer} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminPage} adminOnly={true} />
      
      {/* Demo Project Routes */}
      <Route path="/demos/techmarket" component={TechMarketDemo} />
      <Route path="/demos/taskflow" component={TaskFlowDemo} />
      <Route path="/demos/analytics" component={AnalyticsDemo} />
      <Route path="/demos/healthtrack" component={HealthTrackDemo} />
      <Route path="/demos/boutiquestore" component={BoutiqueStoreDemo} />
      <Route path="/demos/corporateportal" component={CorporatePortalDemo} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
