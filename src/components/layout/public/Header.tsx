

"use client";

import { useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { Menu, Home } from "lucide-react";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { UserRole } from "@/types";

const routes = [
  { name: "Home", url: "/" },
  { name: "Properties", url: "/property" },
  { name: "About us", url: "/question" },
];

const dashboardRoute: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  PROVIDER: "/provider",
  CUSTOMER: "/customer",
};

export default function Header() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending } = useLogout();
  const queryClient = useQueryClient();

  // Adjust this expression if your useGetMe hook
  // returns a different response structure.
  const user = data?.data;
  const role = user?.role as UserRole | undefined;

  const closeMenu = () => setOpen(false);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.removeQueries({ queryKey: ["user"] });

        // Refresh other cached queries that depend on the user.
        queryClient.invalidateQueries();

        closeMenu();

        toast.add({
          title: "Logout",
          description: "Logged out successfully",
          type: "success",
        });
      },
      onError: () => {
        toast.add({
          title: "Logout failed",
          description: "Something went wrong",
          type: "error",
        });
      },
    });
  };

  const DashboardLink = () => {
    if (!role || !dashboardRoute[role]) return null;

    return (
      <Link
        href={dashboardRoute[role]}
        onClick={closeMenu}
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
    );
  };

  const AuthActions = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={
        mobile
          ? "flex flex-col gap-3 pt-3"
          : "flex items-center gap-3"
      }
    >
      {!isLoading && !user && (
        <Button
          variant="outline"
          className={mobile ? "w-full" : ""}
          render={<Link href="/login" onClick={closeMenu} />}
          nativeButton={false}
        >
          Login
        </Button>
      )}

      {!isLoading && user && (
        <Button
          variant="destructive"
          className={mobile ? "w-full" : ""}
          onClick={handleLogout}
          disabled={isPending}
        >
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <Logo />
          <span className="whitespace-nowrap text-lg font-bold sm:text-xl">
            Home Nesty
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          {routes.map((route) => (
            <Link
              key={route.url}
              href={route.url}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {route.name}
            </Link>
          ))}

          <DashboardLink />
        </nav>

        {/* Desktop authentication */}
        <div className="hidden md:block">
          <AuthActions />
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger   render={
    <Button
      variant="outline"
      size="icon"
      aria-label="Open navigation menu"
    />
  }>
             
                <Menu className="size-5" />
              
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] max-w-sm"
            >
              <SheetHeader>
                <SheetTitle >
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="flex items-center gap-2"
                  >
                    <Home className="size-5" />
                    Home Nesty
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-4">
                {routes.map((route) => (
                  <Link
                    key={route.url}
                    href={route.url}
                    onClick={closeMenu}
                    className="rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {route.name}
                  </Link>
                ))}

                {role && (
                  <Link
                    href={dashboardRoute[role]}
                    onClick={closeMenu}
                    className="rounded-md px-3 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Dashboard
                  </Link>
                )}

                <div className="my-2 border-t" />

                <AuthActions mobile />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}


// "use client";

// import Logo from "@/assets/svg/Logo";
// import { Button } from "@/components/ui/button";
// import { toast } from "@/components/ui/toast";
// import { useGetMe, useLogout } from "@/hooks";
// import { UserRole } from "@/types";
// import { useQueryClient } from "@tanstack/react-query";
// import Link from "next/link";
// import Cookies from "js-cookie";

// export default function Header() {
//   const routes = [
//     { name: "Home", url: "/" },
//     { name: "Properties", url: "/properties" },
//     { name: "About us", url: "/about-us" },
//   ];

//   const dashboardRoute: Record<UserRole, string> = {
//     SUPER_ADMIN: "/admin",
//     ADMIN: "/admin",
//     PROVIDER: "/provider",
//     CUSTOMER: "/customer",
//   };

//   const { data, isLoading } = useGetMe();
  
//   const { mutate: logout } = useLogout();
//   const queryClient = useQueryClient();
// console.log(data,queryClient)
//   const role: UserRole = !!data?.data && data?.data.role;

//   const handleLogout = () => {
//     logout(undefined, {
//       onSuccess: () => {
       
//         toast.add({
//           title: "Logout",
//           description: "Logged out successfully",
//           type: "success",
//         });
//          queryClient.removeQueries({ queryKey: ["user"] });
//           //  queryClient.invalidateQueries({
//           //   queryKey: ["user"],
//           // });
//       //    Cookies.remove("accessToken");
//       // Cookies.remove("refreshToken");
//         //  queryClient.removeQueries({ queryKey: ["user"] });
//         //   queryClient.clear();
      
       
          
//           // queryClient.invalidateQueries({
//           //   queryKey: ["user"],
//           // });


//       },
//       onError: () => {
//         toast.add({
//           title: "Logout failed",
//           description: "Something Went Wrong",
//           type: "error",
//         });
//       },
//     });
//   };

//   return (
//     <header className="w-full h-16 border border-b">
//       <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
//         <div className="flex items-center gap-2">
//           <Logo />
//           <span>Home Nesty</span>
//         </div>

//         <nav className="flex gap-5">
//           {routes.map((route) => (
//             <Link key={route.url} href={route.url}>
//               {route.name}
//             </Link>
//           ))}

//           {role && <Link href={dashboardRoute[role]}>Dashboard</Link>}
//         </nav>
//         <div>
//           {!isLoading && !data && (
//             <Button
//               variant="outline"
//               render={<Link href="/login">Login</Link>}
//               nativeButton={false}
//             >
//               Login
//             </Button>
//           )}
//           {!isLoading && data && (
//             <Button onClick={handleLogout} variant="destructive">
//               Logout
//             </Button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }