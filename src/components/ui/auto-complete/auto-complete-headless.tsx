"use client";

import React, { useState, useId, useCallback, KeyboardEvent } from "react";
import { FetchResult } from "@/lib/api-helpers";

export interface AutocompleteSuggestion {
  value: string;
  label: string;
}

interface AutocompleteHeadlessProps<T extends AutocompleteSuggestion> {
  suggestions: T[] | Promise<FetchResult<T[]>>;
  onSelect?: (item: T) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  itemToString?: (item: T) => string;
  children: (props: {
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    listProps: React.HTMLAttributes<HTMLUListElement>;
    getItemProps: (index: number, item: T) => React.HTMLAttributes<HTMLLIElement>;
    isOpen: boolean;
    highlightedIndex: number | null;
    getHighlightedItem: (items: T[]) => T | undefined;
  }) => React.ReactNode;
}

export function AutocompleteHeadless<T extends AutocompleteSuggestion>({
  onSelect,
  inputValue,
  onInputChange,
  itemToString,
  children,
}: AutocompleteHeadlessProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const inputId = useId();
  const listId = useId();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      onInputChange(value);
      setIsOpen(true);
      setHighlightedIndex(null);
    },
    [onInputChange]
  );

  const getHighlightedItem = useCallback(
    (items: T[]) => {
      if (highlightedIndex === null || highlightedIndex < 0 || highlightedIndex >= items.length) {
        return undefined;
      }
      return items[highlightedIndex];
    },
    [highlightedIndex]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prev) => (prev === null ? 0 : prev + 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prev) => (prev === null ? 0 : Math.max(0, prev - 1)));
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(null);
          break;
        case "Enter":
          if (isOpen && highlightedIndex !== null) {
            event.preventDefault();
            // The actual selection happens in the SuggestionsList component
            // since it has access to the filtered items
          }
          break;
      }
    },
    [highlightedIndex, isOpen]
  );

  const getItemProps = useCallback(
    (index: number, item: T) => ({
      onMouseEnter: () => setHighlightedIndex(index),
      onMouseLeave: () => setHighlightedIndex(null),
      onClick: () => {
        if (onSelect) onSelect(item);
        setIsOpen(false);
        setHighlightedIndex(null);
      },
    }),
    [onSelect]
  );

  return children({
    inputProps: {
      id: inputId,
      value: inputValue,
      onChange: handleInputChange,
      onKeyDown: handleKeyDown,
      onFocus: () => setIsOpen(true),
      onBlur: () => {
        setTimeout(() => {
          setIsOpen(false);
          setHighlightedIndex(null);
        }, 200);
      },
      role: "combobox",
      "aria-expanded": isOpen,
      "aria-autocomplete": "list",
      "aria-controls": listId,
    },
    listProps: {
      id: listId,
      role: "listbox",
    },
    getItemProps,
    isOpen,
    highlightedIndex,
    getHighlightedItem,
  });
}
