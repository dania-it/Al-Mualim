import React from "react";
import { normalizeArabicText } from "./useInstantSearch";

export default function HighlightedText({ text = "", highlight = "" }) {
  const original = text === null || text === undefined ? "" : String(text);

  const query =
    highlight === null || highlight === undefined
      ? ""
      : String(highlight).trim();

  if (!query || !original) {
    return <>{original}</>;
  }

  const normalizedQuery = normalizeArabicText(query);

  if (!normalizedQuery) {
    return <>{original}</>;
  }

  const chars = Array.from(original);

  const normalizedChars = chars.map((char) => normalizeArabicText(char));

  const result = [];
  let i = 0;

  while (i < chars.length) {
    let match = false;
    let matchedOriginalCharCount = 0;
    let accumulatedNormalized = "";

    for (let j = i; j < chars.length; j++) {
      accumulatedNormalized += normalizedChars[j];
      matchedOriginalCharCount++;

      if (accumulatedNormalized === normalizedQuery) {
        match = true;
        break;
      }

      if (accumulatedNormalized.length > normalizedQuery.length) {
        break;
      }
    }

    if (match && matchedOriginalCharCount > 0) {
      const matchedText = chars.slice(i, i + matchedOriginalCharCount).join("");

      result.push(
        <mark
          key={`highlight-${i}`}
          className="
            bg-[#ffb53e]
            text-[#080d28]
            rounded
            px-0.5
            font-bold
          "
        >
          {matchedText}
        </mark>,
      );

      i += matchedOriginalCharCount;
    } else {
      result.push(
        <React.Fragment key={`text-${i}`}>{chars[i]}</React.Fragment>,
      );

      i++;
    }
  }

  return <>{result}</>;
}
