import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-surface">
      <div className="text-center space-y-6 p-8">
        <div className="p-4 bg-status-critical/10 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-status-critical" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <p className="text-xl text-muted-foreground">Page not found</p>
        </div>
        <p className="text-muted-foreground max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-gradient-water hover:bg-primary-hover">
          <a href="/" className="flex items-center space-x-2">
            <Home className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
