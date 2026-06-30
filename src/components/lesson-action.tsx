"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Button, SafetyNote } from "@/components/ui/primitives";

export function LessonAction({
  completeLabel,
  feedback,
}: {
  completeLabel: string;
  feedback: string;
}) {
  const [complete, setComplete] = useState(false);

  return (
    <div className="space-y-4">
      <Button onClick={() => setComplete(true)} icon={<CheckCircle2 className="h-4 w-4" />}>
        {completeLabel}
      </Button>
      {complete ? <SafetyNote tone="calm">{feedback}</SafetyNote> : null}
    </div>
  );
}
