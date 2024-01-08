// This works only on vercel server, as it provides the x-vercel-ip-timezone header

import React from "react";
import { headers } from "next/headers";

type Props = {
  timestamp: string;
};

async function LocalTime({ timestamp }: Props) {
  const timeZone = headers().get("x-vercel-ip-timezone") ?? "UTC";
  const localTime = new Date(timestamp).toLocaleString("default", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    minute: "2-digit",
    hour: "2-digit",
    timeZone,
  });

  return <div>{localTime}</div>;
}

export default LocalTime;
