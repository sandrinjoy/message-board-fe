import { getMessages } from "@/services/MessageService";
import React from "react";
import { Button } from "../ui/button";
import DeleteAllButton from "./DeleteAllButton";
import SortByAction from "./SortByAction";

type Props = {};

async function MessageStats({}: Props) {
  const messages = await getMessages();

  if (!messages?.length) return null;
  const ids = messages.map((message) => message.id);
  return (
    <div className="flex flex-col items-center justify-around  gap-3 md:flex-row md:items-start">
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-xs text-gray-400">Total Messages</span>
        <span className="text-sm font-medium">{messages.length}</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-xs text-gray-400">Latest Message At: </span>
        <span className="text-sm font-medium">
          {new Date(messages[messages.length - 1].timestamp).toLocaleString(
            "default",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
              minute: "2-digit",
              hour: "2-digit",
            },
          )}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-xs text-gray-400">Delete all messages </span>
        <span className="text-sm font-medium">
          <DeleteAllButton ids={ids} />
        </span>
      </div>
      {/* sort */}
      <div className="flex flex-col items-center justify-center gap-1">
        <SortByAction />
      </div>
    </div>
  );
}

export default MessageStats;
