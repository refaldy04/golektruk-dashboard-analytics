import React from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          const options = {
            method: "POST",
          };
          await fetch("/api/logout", options);
          router.push("/login");
        }}
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
