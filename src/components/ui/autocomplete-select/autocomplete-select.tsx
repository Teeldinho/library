// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/lib/utils";
// import type { ComponentProps } from "react";
// import styles from "./autocomplete-select.module.css";

// const autocompleteSelectVariants = cva(styles.base, {
//   variants: {
//     size: {
//       sm: styles.sizeSm,
//       md: styles.sizeMd,
//       lg: styles.sizeLg,
//     },
//     variant: {
//       default: styles.variantDefault,
//       primary: styles.variantPrimary,
//     },
//   },
//   defaultVariants: {
//     size: "md",
//     variant: "default",
//   },
// });

// type AutocompleteSelectProps = ComponentProps<"input"> &
//   VariantProps<typeof autocompleteSelectVariants> & {
//     options: { value: string; label: string }[];
//     inputSize?: "sm" | "md" | "lg";
//   };

// export const AutocompleteSelect = ({ className, options, inputSize, variant, ...props }: AutocompleteSelectProps) => (
//   <>
//     <input
//       {...props}
//       type="text"
//       className={cn(autocompleteSelectVariants({ size: inputSize, variant, className }))}
//       list={props.id ? `${props.id}-datalist` : "datalist"}
//       placeholder={props.placeholder || "Select..."}
//     />
//     <datalist id={props.id ? `${props.id}-datalist` : "datalist"}>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </datalist>
//   </>
// );

import React, { useState, useCallback, useMemo, ChangeEvent, KeyboardEvent } from "react";
// import { useDebounce } from "./useDebounce";
// import { fetchOptions } from "./fetchOptions";

interface Option {
  value: string;
  label: string;
}

interface AutocompleteProps {
  options?: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options = [], onSelect, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const debouncedInputValue = useDebounce(inputValue, 300);

  const asyncOptions = useMemo(() => {
    if (options.length > 0) return options;
    return fetchOptions(debouncedInputValue);
  }, [debouncedInputValue, options]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHighlightedIndex(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!Array.isArray(asyncOptions)) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex((prev) => (prev === null || prev === asyncOptions.length - 1 ? 0 : prev + 1));
        break;
      case "ArrowUp":
        setHighlightedIndex((prev) => (prev === null || prev === 0 ? asyncOptions.length - 1 : prev - 1));
        break;
      case "Enter":
        if (highlightedIndex !== null) {
          onSelect(asyncOptions[highlightedIndex]);
          setInputValue(asyncOptions[highlightedIndex].label);
          setIsFocused(false);
        }
        break;
      case "Escape":
        setIsFocused(false);
        break;
      default:
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleOptionClick = (option: Option) => {
    onSelect(option);
    setInputValue(option.label);
    setIsFocused(false);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={placeholder}
        aria-autocomplete="list"
        aria-controls="autocomplete-options"
        aria-activedescendant={highlightedIndex !== null ? `option-${highlightedIndex}` : undefined}
      />
      {isFocused && Array.isArray(asyncOptions) && asyncOptions.length > 0 && (
        <ul id="autocomplete-options" role="listbox">
          {asyncOptions.map((option, index) => (
            <li
              key={option.value}
              id={`option-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              onMouseDown={() => handleOptionClick(option)}
              className={highlightedIndex === index ? "highlighted" : ""}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
