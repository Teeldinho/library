"use client";

import { Suspense, use } from "react";
import { AutocompleteHeadless, AutocompleteSuggestion } from "./auto-complete-headless";
import styles from "./auto-complete.module.css";
import { useTranslations } from "next-intl";
import { FetchResult } from "@/lib/api-helpers";
import { hasMinChars } from "@/lib/validators";
import { Label } from "@/components/ui/label/label";

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

export function AutoComplete<T extends AutocompleteSuggestion>(props: AutoCompleteProps<T>) {
  const { suggestions, onSelect, inputValue, onInputChange, placeholder, label, itemToString, renderItem } = props;

  const t = useTranslations("HomePage");

  return (
    <AutocompleteHeadless
      suggestions={suggestions}
      onSelect={onSelect}
      inputValue={inputValue}
      onInputChange={onInputChange}
      itemToString={itemToString}
    >
      {({ inputProps, listProps, getItemProps, isOpen, highlightedIndex }) => (
        <div className={styles.autocomplete}>
          {label && (
            <Label htmlFor={inputProps.id} variant="default" weight="medium">
              {label}
            </Label>
          )}
          <input {...inputProps} className={styles.input} placeholder={placeholder} aria-describedby={listProps.id} />

          {isOpen && hasMinChars(inputValue) && (
            <div className={styles.suggestionsContainer}>
              <Suspense
                fallback={
                  <ul className={styles.suggestionsList}>
                    <li className={styles.suggestionItem}>
                      <Label variant="muted" weight="medium">
                        {t("loadingSuggestions")}
                      </Label>
                    </li>
                  </ul>
                }
              >
                <SuggestionsList
                  suggestions={suggestions}
                  inputValue={inputValue}
                  getItemProps={getItemProps}
                  highlightedIndex={highlightedIndex}
                  listProps={listProps}
                  itemToString={itemToString}
                  renderItem={renderItem}
                />
              </Suspense>
            </div>
          )}
        </div>
      )}
    </AutocompleteHeadless>
  );
}

function SuggestionsList<T extends AutocompleteSuggestion>({
  suggestions,
  inputValue,
  getItemProps,
  highlightedIndex,
  listProps,
  itemToString,
  renderItem,
}: {
  suggestions: T[] | Promise<FetchResult<T[]>>;
  inputValue: string;
  getItemProps: (index: number) => React.HTMLAttributes<HTMLLIElement>;
  highlightedIndex: number | null;
  listProps: React.HTMLAttributes<HTMLUListElement>;
  itemToString?: (item: T) => string;
  renderItem?: (props: { item: T; isHighlighted: boolean; isSelected: boolean }) => React.ReactNode;
}) {
  const t = useTranslations("HomePage");

  const resolvedSuggestions = suggestions instanceof Promise ? use(suggestions) : suggestions;
  const items = Array.isArray(resolvedSuggestions) ? resolvedSuggestions : resolvedSuggestions.status === "success" ? resolvedSuggestions.data : [];

  // Add artificial delay for empty results to ensure loading state is visible
  if (items.length === 0 && suggestions instanceof Promise) {
    // This will cause the component to suspend for a moment even after data resolves
    use(new Promise((resolve) => setTimeout(resolve, 500)));
  }

  const filtered = items.filter((item) => {
    const str = itemToString ? itemToString(item) : item.label;
    return str.toLowerCase().includes(inputValue.toLowerCase());
  });

  if (hasMinChars(inputValue) && filtered.length === 0) {
    return (
      <ul className={styles.suggestionsList}>
        <li className={styles.suggestionItem}>
          <Label variant="muted" weight="medium">
            {t("noSuggestions")}
          </Label>
        </li>
      </ul>
    );
  }

  return (
    <ul {...listProps} className={styles.suggestionsList}>
      {filtered.map((item, index) => (
        <li key={item.value} {...getItemProps(index)} className={`${styles.suggestionItem} ${highlightedIndex === index ? styles.highlighted : ""}`}>
          {renderItem ? (
            renderItem({
              item,
              isHighlighted: highlightedIndex === index,
              isSelected: false,
            })
          ) : (
            <Label variant="default" size="sm">
              {itemToString ? itemToString(item) : item.label}
            </Label>
          )}
        </li>
      ))}
    </ul>
  );
}
