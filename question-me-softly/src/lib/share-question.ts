import type { Locale } from "@/types/content";

export type ShareMethod = "native_share" | "copy_link" | "cancelled";

export function buildQuestionShareUrl(questionId: string, locale: Locale): string {
  const url = new URL(`/q/${questionId}`, window.location.origin);
  url.searchParams.set("lang", locale);
  return url.toString();
}

export async function shareQuestion(params: {
  questionId: string;
  locale: Locale;
  text: string;
}): Promise<ShareMethod> {
  const url = buildQuestionShareUrl(params.questionId, params.locale);

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Question Me Softly",
        text: params.text,
        url,
      });
      return "native_share";
    } catch {
      return "cancelled";
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(url);
    return "copy_link";
  }

  const tempInput = document.createElement("textarea");
  tempInput.value = url;
  tempInput.setAttribute("readonly", "");
  tempInput.style.position = "absolute";
  tempInput.style.left = "-9999px";
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  return "copy_link";
}
