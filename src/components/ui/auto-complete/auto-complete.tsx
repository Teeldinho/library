"use client";

import { Suspense, use } from "react";
import styles from "@/components/ui/auto-complete/auto-complete.module.css";
import { useTranslations } from "next-intl";

export interface Suggestion {
  value: string;
  label: string;
}

interface AutocompleteProps<T extends Suggestion> {
  suggestionsPromise: Promise<T[]>;
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
          <Suggestions datalistId={listId} suggestionsPromise={suggestionsPromise} />
        </Suspense>
      </div>
    </div>
  );
}

// Suggestions Component
function Suggestions<T extends Suggestion>({ suggestionsPromise, datalistId }: { suggestionsPromise: Promise<T[]>; datalistId: string }) {
  const suggestions = use(suggestionsPromise);

  return (
    <datalist id={datalistId} className={styles.datalist}>
      {suggestions.map((item) => (
        <option key={item.value} value={item.value} className={styles.option}>
          {item.label}
        </option>
      ))}
    </datalist>
  );
}
