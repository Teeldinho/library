"use client";

import { Suspense, use } from "react";
import { AutocompleteHeadless, AutocompleteSuggestion } from "@/components/ui/auto-complete/auto-complete/auto-complete-headless";
import styles from "@/components/ui/auto-complete/auto-complete/auto-complete.module.css";
import { useTranslations } from "next-intl";
import { FetchResult } from "@/lib/api-helpers";
import { hasMinChars } from "@/lib/validators";

interface AutoCompleteProps<T extends AutocompleteSuggestion> {
  suggestions: T[] | Promise<FetchResult<T[]>>;
  onSelect?: (item: T) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  itemToString?: (item: T) => string;
  renderItem?: (props: { item: T; isHighlighted: boolean; isSelected: boolean }) => React.ReactNode;
}

export function AutoComplete<T extends AutocompleteSuggestion>({
  suggestions,
  onSelect,
  inputValue,
  onInputChange,
  placeholder,
  label,
  itemToString,
  renderItem,
}: AutoCompleteProps<T>) {
  const t = useTranslations("HomePage");
  const resolvedSuggestions = suggestions instanceof Promise ? use(suggestions) : suggestions;

  return (
    <AutocompleteHeadless
      inputValue={inputValue}
      onInputChange={onInputChange}
      suggestions={
        Array.isArray(resolvedSuggestions) ? resolvedSuggestions : resolvedSuggestions.status === "success" ? resolvedSuggestions.data : []
      }
      onSelect={onSelect}
      itemToString={itemToString}
    >
      {({ inputProps, listProps, getItemProps, isOpen, highlightedIndex, suggestions }) => (
        <div className={styles.autocomplete}>
          {label && (
            <label className={styles.label} htmlFor={inputProps.id}>
              {label}
            </label>
          )}
          <input {...inputProps} className={styles.input} placeholder={placeholder} aria-describedby={listProps.id} />

          <div className={styles.suggestionsContainer}>
            {isOpen && (
              <Suspense
                fallback={
                  <div className={styles.loadingContainer}>
                    <div className={styles.loading}>{t("loadingSuggestions")}</div>
                  </div>
                }
              >
                <ul {...listProps} className={styles.suggestionsList}>
                  {!Array.isArray(resolvedSuggestions) && resolvedSuggestions.status === "error" ? (
                    <li className={styles.errorContainer}>
                      <span className={styles.errorText}>{t("fetchError", { message: resolvedSuggestions.message })}</span>
                    </li>
                  ) : hasMinChars(inputValue) && suggestions.length === 0 ? (
                    <li className={styles.customItem}>
                      <div className={styles.emptyState}>{t("noSuggestions")}</div>
                    </li>
                  ) : (
                    suggestions.map((item, index) => (
                      <li
                        key={item.value}
                        {...getItemProps(index)}
                        className={`${styles.suggestionItem} ${highlightedIndex === index ? styles.highlighted : ""}`}
                      >
                        {renderItem
                          ? renderItem({
                              item,
                              isHighlighted: highlightedIndex === index,
                              isSelected: false,
                            })
                          : itemToString
                          ? itemToString(item)
                          : item.label}
                      </li>
                    ))
                  )}
                </ul>
              </Suspense>
            )}
          </div>
        </div>
      )}
    </AutocompleteHeadless>
  );
}
