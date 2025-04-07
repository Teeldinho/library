"use client";

import { Suspense, use, useEffect } from "react";
import { AutocompleteHeadless, AutocompleteSuggestion } from "./auto-complete-headless";
import styles from "./auto-complete.module.css";
import { useTranslations } from "next-intl";
import { FetchResult } from "@/lib/api-helpers";
import { hasMinChars } from "@/lib/validators";
import { Label } from "@/components/ui/label/label";
import { LoadingList } from "@/components/ui/loading-state/loading-state";
import { EmptyList } from "@/components/ui/empty-state/empty-state";
import { Input } from "@/components/ui/input/input";

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
      {({ inputProps, listProps, getItemProps, isOpen, highlightedIndex, getHighlightedItem }) => (
        <div className={styles.autocomplete}>
          {label && (
            <Label htmlFor={inputProps.id} variant="default" weight="medium">
              {label}
            </Label>
          )}

          <Input {...inputProps} placeholder={placeholder} aria-describedby={listProps.id} />

          {isOpen && hasMinChars(inputValue) && (
            <div className={styles.suggestionsContainer}>
              <Suspense fallback={<LoadingList message={t("loadingSuggestions")} />}>
                <SuggestionsList
                  suggestions={suggestions}
                  inputValue={inputValue}
                  getItemProps={getItemProps}
                  highlightedIndex={highlightedIndex}
                  listProps={listProps}
                  itemToString={itemToString}
                  renderItem={renderItem}
                  onSelect={onSelect}
                  getHighlightedItem={getHighlightedItem}
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
  onSelect,
  getHighlightedItem,
}: {
  suggestions: T[] | Promise<FetchResult<T[]>>;
  inputValue: string;
  getItemProps: (index: number, item: T) => React.HTMLAttributes<HTMLLIElement>;
  highlightedIndex: number | null;
  listProps: React.HTMLAttributes<HTMLUListElement>;
  itemToString?: (item: T) => string;
  renderItem?: (props: { item: T; isHighlighted: boolean; isSelected: boolean }) => React.ReactNode;
  onSelect?: (item: T) => void;
  getHighlightedItem: (items: T[]) => T | undefined;
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

  // Handle Enter key selection
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && highlightedIndex !== null) {
        const highlightedItem = getHighlightedItem(filtered);
        if (highlightedItem && onSelect) {
          onSelect(highlightedItem);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filtered, highlightedIndex, onSelect, getHighlightedItem]);

  if (hasMinChars(inputValue) && filtered.length === 0) {
    return <EmptyList message={t("noSuggestions")} />;
  }

  return (
    <ul {...listProps} className={styles.suggestionsList}>
      {filtered.map((item, index) => (
        <li
          key={item.value}
          {...getItemProps(index, item)}
          className={`${styles.suggestionItem} ${highlightedIndex === index ? styles.highlighted : ""}`}
        >
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
