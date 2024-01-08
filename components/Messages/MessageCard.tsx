import { IMessageResponse } from "@/types";
import React from "react";
import { Card } from "../ui/card";
import DeleteMessageButton from "./DeleteMessageButton";
import LocalTime from "../LocalTime";

function MessageCard({ message }: { message: IMessageResponse }) {
  return (
    <Card className="flex w-auto flex-col gap-2 border  px-5 py-3 text-black">
      <div className="flex items-center justify-between gap-12">
        <span className="text-sm font-medium text-orange-500">
          @{message.source}
        </span>

        <span className="text-xs text-gray-600">
          <LocalTime timestamp={message.timestamp} />
        </span>
      </div>
      <p className="text-base">{message.text}</p>

      <DeleteMessageButton messageId={message.id} />
    </Card>
  );
}

export default MessageCard;
