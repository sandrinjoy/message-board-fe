"use client";
import React, { useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useApi } from "@/hooks/useApi";
import { deleteMessage } from "@/services/MessageService";

type Props = {
  messageId: number;
};

function DeleteMessageButton({ messageId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDeletePost() {
    setIsLoading(true);
    await deleteMessage({ id: messageId });
    setIsLoading(false);
  }
  return (
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2 border-red-400"
      aria-label="delete post"
      onClick={handleDeletePost}
    >
      {
        <>
          {isLoading ? (
            <>
              Deleting <TrashIcon className="animate-spin" />
            </>
          ) : (
            <>
              Delete <TrashIcon />
            </>
          )}
        </>
      }
    </Button>
  );
}

export default DeleteMessageButton;
