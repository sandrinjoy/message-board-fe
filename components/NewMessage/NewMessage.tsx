"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon, ShadowInnerIcon } from "@radix-ui/react-icons";
import { postMessage } from "@/services/MessageService";
import { useApi } from "@/hooks/useApi";

function NewMessage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  async function handlePostMessage() {
    setIsLoading(true);
    if (!inputRef.current || !inputRef.current.value) {
      alert("Please type a message");
      setIsLoading(false);
      inputRef.current?.focus();
      return;
    }
    await postMessage({ message: inputRef.current.value });
    setIsLoading(false);
    inputRef.current.value = "";
    inputRef.current.focus();
  }

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, []);
  return (
    <div className="flex items-center justify-center gap-2">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Type a message"
        className="h-12"
      />
      <Button
        variant="default"
        className="flex h-12 gap-2"
        onClick={handlePostMessage}
      >
        <>
          {isLoading ? (
            <>
              Posting <ShadowInnerIcon className="animate-spin" />
            </>
          ) : (
            <>
              Post <PaperPlaneIcon />
            </>
          )}
        </>
      </Button>
    </div>
  );
}

export default NewMessage;
