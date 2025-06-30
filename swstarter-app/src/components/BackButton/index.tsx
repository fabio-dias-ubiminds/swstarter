"use client";

import { useRouter } from "next/navigation";
import { Button } from "../Button";

export const BackButton = () => {
  const router = useRouter();
  return <Button label="back to search" onClick={() => router.push("/")} />;
};
