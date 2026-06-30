import "server-only";

import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

export async function getDictionary(locale: Locale) {
  return messages[locale];
}
