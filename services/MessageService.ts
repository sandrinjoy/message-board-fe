"use server";
import { HARMONEY_DEV_API_V1, HARMONEY_DEV_AUTH_TOKEN } from "@/config/api";

import { IMessageResponse, SortType } from "@/types";
import { revalidatePath } from "next/cache";

async function getMessages(
  {
    sortBy,
  }: {
    sortBy: SortType;
  } = {
    sortBy: "desc",
  },
): Promise<IMessageResponse[]> {
  const res = await fetch(HARMONEY_DEV_API_V1 + "/messages", {
    headers: {
      Authorization: HARMONEY_DEV_AUTH_TOKEN,
    },
    cache: "no-store",
  });
  const data = await res.json();
  if (sortBy === "asc") {
    data.sort((a: IMessageResponse, b: IMessageResponse) => {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });
  } else {
    data.sort((a: IMessageResponse, b: IMessageResponse) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }
  revalidatePath("/");
  return data;
}
async function postMessage({ message }: { message: string }) {
  const res = await fetch(HARMONEY_DEV_API_V1 + "/messages/", {
    headers: {
      Authorization: HARMONEY_DEV_AUTH_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: message }),
    method: "POST",
  });
  const data = await res.json();
  revalidatePath("/");
  return data;
}
async function deleteMessage({ id }: { id: number }) {
  const res = await fetch(HARMONEY_DEV_API_V1 + "/messages/" + id, {
    headers: {
      Authorization: HARMONEY_DEV_AUTH_TOKEN,
    },
    method: "DELETE",
  });
  revalidatePath("/");
  return res.status;
}

export { getMessages, postMessage, deleteMessage };
