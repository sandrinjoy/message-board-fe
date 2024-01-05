import Image from "next/image";
import { Button } from "@/components/ui/button";
import NewMessage from "@/components/NewMessage";
import Messages from "@/components/Messages";
import MessageStats from "@/components/Messages/MessageStats";
import { SortType } from "@/types";
export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const sortByParam: SortType = searchParams?.sortBy === "asc" ? "asc" : "desc";
  return (
    <div className="flex min-h-svh flex-col items-center justify-start gap-4">
      <div className="mb-4 flex w-full flex-col items-center justify-center gap-4 border-b py-8">
        <h1 className="text-2xl font-medium md:text-5xl">Message Board</h1>
        <NewMessage />
      </div>
      <MessageStats />
      <Messages sortBy={sortByParam} />
    </div>
  );
}
