"use client";

import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: SelectOption | SelectOption[] | null;
  onChange: (value: SelectOption | SelectOption[] | null) => void;
  placeholder?: string;
  isMulti?: boolean;
  disabled?: boolean;
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L11.1 11.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isMulti = false,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const isSelected = useCallback(
    (option: SelectOption) => {
      if (isMulti && Array.isArray(value)) {
        return value.some((v) => v.value === option.value);
      }
      if (!isMulti && value && !Array.isArray(value)) {
        return value.value === option.value;
      }
      return false;
    },
    [value, isMulti],
  );

  const handleSelect = (option: SelectOption) => {
    if (isMulti) {
      const currentValue = (value as SelectOption[]) || [];
      const isAlreadySelected = currentValue.some(
        (v) => v.value === option.value,
      );

      if (isAlreadySelected) {
        onChange(currentValue.filter((v) => v.value !== option.value));
      } else {
        onChange([...currentValue, option]);
      }
      setSearchQuery("");
    } else {
      onChange(option);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const handleRemoveTag = (
    optionToRemove: SelectOption,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    if (isMulti && Array.isArray(value)) {
      onChange(value.filter((v) => v.value !== optionToRemove.value));
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(isMulti ? [] : null);
    setSearchQuery("");
  };

  const getDisplayValue = () => {
    if (isMulti) return null;
    if (value && !Array.isArray(value)) {
      return value.label;
    }
    return null;
  };

  const hasValue = isMulti
    ? Array.isArray(value) && value.length > 0
    : value !== null && value !== undefined;

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2
          rounded-lg border bg-white px-3 py-2 transition-all
          ${disabled ? "cursor-not-allowed bg-gray-100 opacity-60" : "hover:border-gray-400"}
          ${isOpen ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-300"}
        `}
      >
        <div className="flex flex-1 flex-wrap items-center gap-1.5">
          {isMulti && Array.isArray(value) && value.length > 0 && (
            <>
              {value.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveTag(option, e)}
                    className="rounded-sm p-0.5 transition-colors hover:bg-blue-200"
                    aria-label={`Remove ${option.label}`}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </>
          )}

          {!isMulti && (
            <span
              className={`text-sm ${getDisplayValue() ? "text-gray-900" : "text-gray-500"}`}
            >
              {getDisplayValue() || placeholder}
            </span>
          )}

          {isMulti && (!Array.isArray(value) || value.length === 0) && (
            <span className="text-sm text-gray-500">{placeholder}</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Clear selection"
            >
              <XIcon className="h-4 w-4" />
            </button>
          )}

          <ChevronDownIcon
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
          <div className="border-b border-gray-100 p-2">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-gray-500">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => {
                const selected = isSelected(option);
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors
                      ${selected ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}
                    `}
                  >
                    <span className={selected ? "font-medium" : ""}>
                      {option.label}
                    </span>
                    {selected && (
                      <svg
                        className="h-4 w-4 text-blue-600"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3334 4L6.00008 11.3333L2.66675 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
