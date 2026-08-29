import { useMemo } from "react";

export const normalizeArabicText = (text) => {
  if (text === undefined || text === null) {
    return "";
  }

  return String(text)
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
};

const valueToSearchText = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value !== "object") {
    return String(value);
  }

  return [value.key, value.name, value.label, value.value, value.title]
    .filter(
      (item) => item !== undefined && item !== null && typeof item !== "object",
    )
    .map(String)
    .join(" ");
};
export const getSearchableText = (item = {}) => {
  const values = [
    item.workerName,
    item.name,

    item.title,

    item.category,

    item.description,

    item.location,
    item.residence,
    item.governorate,
    item.city,
    item.area,
    item.district,
    item.detailedAddress,
    item.address,
  ];

  return values.map(valueToSearchText).filter(Boolean).join(" ");
};

export default function useInstantSearch({
  searchableData = [],
  maxResults = 6,
  searchTerm = "",
}) {
  const safeData = Array.isArray(searchableData) ? searchableData : [];

  const safeSearchTerm =
    searchTerm === undefined || searchTerm === null ? "" : String(searchTerm);

  const filteredResults = useMemo(() => {
    const query = normalizeArabicText(safeSearchTerm);

    if (!query) {
      return [];
    }

    return safeData
      .filter((item) => {
        const searchableText = normalizeArabicText(getSearchableText(item));

        return searchableText.includes(query);
      })
      .slice(0, maxResults);
  }, [safeData, safeSearchTerm, maxResults]);

  return filteredResults;
}
