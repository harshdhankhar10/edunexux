
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
// import Header from "@/components/Header";

const NotFound = () => {
  const location = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location
    );
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* <Header /> */}
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <AlertTriangle className="h-12 w-12" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Page Not Found</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            We couldn't find the page you're looking for. The link might be incorrect or the page may have been moved or deleted.
          </p>
          
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
            <Button asChild size="lg" className="font-medium">
              <Link href="/dashboard/teacher">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
