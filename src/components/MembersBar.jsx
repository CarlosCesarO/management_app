import React from "react";
import { useCollection } from "@/hooks/useCollection";

export default function Membersbar() {
  const { documents: users } = useCollection("users");
  return (
    <div className="h-screen w-[200px] border border-border p-5">
      <h2 className="font-medium text-lg mb-5">Membros </h2>
      <div className="flex gap-2 items-center text-sm py-2.5" role="button">
        <p className="font-medium">Carlos Cesar</p>
      </div>
    </div>
    // <div className="h-screen w-[200px] border border-border p-5">
    //   <h2 className="font-medium text-lg mb-5">Membros </h2>
    //   {users.map((user) => (
    //     <div
    //       key={user.id}
    //       className="flex gap-2 items-center text-sm py-2.5"
    //       role="button"
    //     >
    //       <div
    //         className={`${
    //           user.online ? "bg-green-500" : "bg-red-500"
    //         }h-3 w-3  rounded-full`}
    //       />
    //       <p className="font-medium">{user.name}</p>
    //     </div>
    //   ))}
    // </div>
  );
}
