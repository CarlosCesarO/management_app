import React from "react";
import getMessagePosition from "@/utils/getMessagePosition";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Message({ message }) {
  const { user } = useAuthContext();
  return (
    <div
      key={message.id}
      className={`${getMessagePosition(
        message.author,
        user.uid
      )} p-1.5 px-2.5 rounded-lg w-fit text-secondary mt-2 text-sm`}
    >
      {message.content}
    </div>
  );
}
