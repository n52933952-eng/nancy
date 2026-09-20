"use client";

import PageHeader from "@/components/PageHeader";
import { useContent } from "@/components/ContentProvider";

export default function ContentHeader({ page, compact = false }) {
  const { copy } = useContent();
  return <PageHeader {...copy[page]} compact={compact} />;
}
