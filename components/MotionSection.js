"use client";

import { useMotionGate } from "@/lib/useMotionGate";

export default function MotionSection({
  as: Tag = "section",
  id,
  className,
  threshold,
  children,
}) {
  const { ref, motion } = useMotionGate(threshold);

  return (
    <Tag id={id} ref={ref} className={className} data-motion={motion}>
      {children}
    </Tag>
  );
}
