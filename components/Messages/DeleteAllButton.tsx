"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteMessage } from "@/services/MessageService";
import { PieChartIcon } from "@radix-ui/react-icons";

type Props = { ids: number[] };

async function deleteAllPosts(ids: number[]) {
  const promises = ids.map((id) => deleteMessage({ id }));
  return await Promise.all(promises);
}

function DeleteAllButton({ ids }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure ?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete all messages?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            className="flex items-center justify-center gap-2"
            onClick={async () => {
              setIsLoading(true);
              await deleteAllPosts(ids);
              setIsLoading(false);
            }}
          >
            {isLoading ? (
              <>
                Deleting <PieChartIcon className="animate-spin" />
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAllButton;
