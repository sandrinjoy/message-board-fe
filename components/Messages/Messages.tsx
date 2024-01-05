import { getMessages } from "@/services/MessageService";
import React from "react";
import MessageCard from "./MessageCard";
import { SortType } from "@/types";

async function Messages({ sortBy }: { sortBy: SortType }) {
  const messages = await getMessages({ sortBy });
  if (!messages?.length)
    return (
      <div className="mx-4 text-center font-medium">
        There are no messages yet. Start by posting a message.
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </div>
  );
}

export default Messages;
