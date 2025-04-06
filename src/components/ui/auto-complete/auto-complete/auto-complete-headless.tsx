"use client";

import React, { useState, useId, useCallback, KeyboardEvent } from "react";

export interface AutocompleteSuggestion {
  value: string;
  label: string;
}

interface AutocompleteHeadlessProps<T extends AutocompleteSuggestion> {
  suggestions: T[];
  onSelect?: (item: T) => void;
  itemToString?: (item: T) => string;
  inputValue: string;
  onInputChange: (value: string) => void;
  children: (renderProps: {
    inputProps: React.InputHTMLAttributes<HTMLInputElement>;
    listProps: React.HTMLAttributes<HTMLUListElement>;
    getItemProps: (index: number) => React.LiHTMLAttributes<HTMLLIElement>;
    isOpen: boolean;
    highlightedIndex: number | null;
    suggestions: T[];
    inputValue: string;
  }) => React.ReactNode;
}

export function AutocompleteHeadless<T extends AutocompleteSuggestion>({
  suggestions,
  onSelect,
  itemToString,
  inputValue,
  onInputChange,
  children,
}: AutocompleteHeadlessProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const inputId = useId();
  const listId = useId();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange(value);
    setIsOpen(true);
    setHighlightedIndex(null);
  };

  const isSuggestionsAPromise = suggestions instanceof Promise;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      setHighlightedIndex(e.key === "ArrowDown" ? 0 : -1);
      e.preventDefault();
      return;
    }

    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % (isSuggestionsAPromise ? 0 : suggestions.length);
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          if (prev === null) return (isSuggestionsAPromise ? 0 : suggestions.length) - 1;
          return (prev - 1 + (isSuggestionsAPromise ? 0 : suggestions.length)) % (isSuggestionsAPromise ? 0 : suggestions.length);
        });
        break;
      case "Enter":
        if (highlightedIndex !== null && !isSuggestionsAPromise && suggestions[highlightedIndex]) {
          e.preventDefault();
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(null);
        break;
    }
  };

  const handleSelect = useCallback(
    (item: T) => {
      onInputChange(itemToString ? itemToString(item) : item.label);
      setIsOpen(false);
      onSelect?.(item);
    },
    [onSelect, itemToString, onInputChange]
  );

  const filteredSuggestions = suggestions.filter((item) => {
    const itemStr = itemToString ? itemToString(item) : item.label;
    return itemStr.toLowerCase().includes(inputValue.toLowerCase());
  });

  const getItemProps = (index: number): React.LiHTMLAttributes<HTMLLIElement> => ({
    role: "option",
    "aria-selected": highlightedIndex === index,
    onMouseEnter: () => setHighlightedIndex(index),
    onClick: () => {
      if (!isSuggestionsAPromise) {
        handleSelect(filteredSuggestions[index]);
      } else {
        suggestions.then((suggestions) => handleSelect(suggestions[index]));
      }
    },
    id: `${listId}-item-${index}`,
  });

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    id: inputId,
    value: inputValue,
    onChange: handleInputChange,
    onKeyDown: handleKeyDown,
    role: "combobox",
    "aria-autocomplete": "list",
    "aria-controls": listId,
    "aria-expanded": isOpen,
    "aria-activedescendant": highlightedIndex !== null ? `${listId}-item-${highlightedIndex}` : undefined,
  };

  const listProps: React.HTMLAttributes<HTMLUListElement> = {
    id: listId,
    role: "listbox",
    "aria-labelledby": inputId,
  };

  return children({
    inputProps,
    listProps,
    getItemProps,
    isOpen,
    highlightedIndex,
    suggestions: filteredSuggestions,
    inputValue,
  });
}
