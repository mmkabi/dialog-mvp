"use client";

import { Check, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/primitives";

export function MockActionButton({
  idleLabel,
  doneLabel,
}: {
  idleLabel: string;
  doneLabel: string;
}) {
  const [done, setDone] = useState(false);

  return (
    <Button variant={done ? "secondary" : "primary"} onClick={() => setDone(true)} icon={done ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}>
      {done ? doneLabel : idleLabel}
    </Button>
  );
}
