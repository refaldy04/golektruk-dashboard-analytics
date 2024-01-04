import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default Layout;
