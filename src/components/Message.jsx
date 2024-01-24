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
      )} p-2.5 rounded-lg w-fit text-secondary`}
    >
      {message.content}
    </div>
  );
}
