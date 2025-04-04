"use client";

import { Suspense, use } from "react";
import styles from "@/components/ui/auto-complete/auto-complete.module.css";
import { useTranslations } from "next-intl";
import { FetchResult } from "@/lib/api-helpers";
import { hasMinChars } from "@/lib/validators";

export interface Suggestion {
  value: string;
  label: string;
}

interface AutocompleteProps<T extends Suggestion> {
  suggestionsPromise: Promise<FetchResult<T[]>>;
  onInputChange: (value: string) => void;
  placeholder?: string;
  listId: string;
  inputValue: string;
}

export function Autocomplete<T extends Suggestion>({
  suggestionsPromise,
  onInputChange,
  placeholder = "Search...",
  listId,
  inputValue,
}: AutocompleteProps<T>) {
  const t = useTranslations("HomePage");

  return (
    <div className={styles.autocomplete}>
      <input
        type="text"
        list={listId}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        className={styles.input}
      />

      <div className={styles.suggestionsContainer}>
        <Suspense
          fallback={
            <div className={styles.loadingContainer}>
              <div className={styles.loading}>{t("loadingSuggestions")}</div>
            </div>
          }
        >
          <Suggestions datalistId={listId} suggestionsPromise={suggestionsPromise} inputValue={inputValue} />
        </Suspense>
      </div>
    </div>
  );
}

// Suggestions Component
function Suggestions<T extends Suggestion>({
  suggestionsPromise,
  datalistId,
  inputValue,
}: {
  suggestionsPromise: Promise<FetchResult<T[]>>;
  datalistId: string;
  inputValue: string;
}) {
  const t = useTranslations("HomePage");

  // Here we unwrap the promise sent from the server and get the result:
  const result = use(suggestionsPromise);

  // If there's an error, we display an error message:
  if (result.status === "error")
    return (
      <div className={styles.errorContainer}>
        <span className={styles.errorText}>{t("fetchError", { message: result.message })}</span>
      </div>
    );

  // Only show empty state when valid search was performed
  if (hasMinChars(inputValue) && result.data.length === 0) {
    return <div className={styles.emptyState}>{t("noSuggestions")}</div>;
  }

  // Only show suggestions when there are valid search characters
  return hasMinChars(inputValue) ? (
    <datalist id={datalistId} className={styles.datalist}>
      {result.data.map((item) => (
        <option key={item.value} value={item.value} className={styles.option}>
          {item.label}
        </option>
      ))}
    </datalist>
  ) : null;
}
