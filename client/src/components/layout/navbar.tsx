import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Process", href: "/#process" },
    { name: "Analyze My Site", href: "/analyze" },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('#')) {
      return false; // Don't highlight hash links as active
    }
    return location === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="font-bold text-xl text-primary">
                  DevCraft<span className="text-gray-900">Studio</span>
                </a>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`${
                      isActive(item.href)
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
              {user?.isAdmin && (
                <Link href="/admin">
                  <a
                    className={`${
                      isActive("/admin")
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    Admin
                  </a>
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href="/contact">
              <Button>Start Project</Button>
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    <span className="font-bold text-xl text-primary">
                      DevCraft<span className="text-gray-900">Studio</span>
                    </span>
                  </SheetTitle>
                  <SheetDescription>
                    Web & Mobile App Development
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  {navigation.map((item) => (
                    <SheetClose key={item.name} asChild>
                      <Link href={item.href}>
                        <a
                          className={`${
                            isActive(item.href)
                              ? "bg-blue-50 border-primary text-primary"
                              : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                          } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                        >
                          {item.name}
                        </a>
                      </Link>
                    </SheetClose>
                  ))}
                  {user?.isAdmin && (
                    <SheetClose asChild>
                      <Link href="/admin">
                        <a
                          className={`${
                            isActive("/admin")
                              ? "bg-blue-50 border-primary text-primary"
                              : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                          } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                        >
                          Admin
                        </a>
                      </Link>
                    </SheetClose>
                  )}
                  <SheetClose asChild>
                    <Link href="/contact">
                      <a className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700">
                        Start Project
                      </a>
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
