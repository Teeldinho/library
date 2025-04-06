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
    getItemProps: (index: number) => React.HTMLAttributes<HTMLLIElement>;
    isOpen: boolean;
    highlightedIndex: number | null;
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

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) => (prev === null ? 0 : prev + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) => (prev === null ? 0 : prev - 1));
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(null);
        break;
      case "Enter":
        // Handle in the SuggestionsList component
        break;
    }
  }, []);

  const getItemProps = useCallback(
    (index: number) => ({
      onMouseEnter: () => setHighlightedIndex(index),
      onMouseLeave: () => setHighlightedIndex(null),
      onClick: () => {
        setIsOpen(false);
        setHighlightedIndex(null);
      },
    }),
    []
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
  });
}
