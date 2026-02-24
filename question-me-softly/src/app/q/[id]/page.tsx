import { notFound } from "next/navigation";
import { hasQuestionId } from "@/data/questions";
import QuestionPageClient from "./question-page-client";

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!hasQuestionId(id)) {
    notFound();
  }

  return <QuestionPageClient id={id} />;
}
