import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

import { IconManager } from "../icon-manager";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SelectItem {
  value: string | number;
  label: string;
}

interface BaseSelectProps {
  selectItems?: SelectItem[];
  titleFixed?: string;
  hasSearch?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
}

interface SingleSelectProps extends BaseSelectProps {
  multiSelect?: false;
  value?: string | number;
  onValueChange?: (value: string | number) => void;
}

interface MultiSelectProps extends BaseSelectProps {
  multiSelect: true;
  value?: (string | number)[];
  onValueChange?: (value: (string | number)[]) => void;
}

type SelectProps = SingleSelectProps | MultiSelectProps;

export function Select(props: SelectProps) {
  const {
    selectItems = [],
    titleFixed,
    hasSearch = false,
    placeholder = "Selecione",
    onValueChange,
    className,
    value,
    disabled = false,
    multiSelect = false,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (multiSelect) {
      const arrayValue = Array.isArray(value) ? value : [];
      setInternalValue(arrayValue);
    } else {
      const singleValue =
        value !== undefined && !Array.isArray(value) ? [value] : [];
      setInternalValue(singleValue);
    }
  }, [value, multiSelect]);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  const selectedValues = internalValue;

  const handleSelect = (selectedValue: string | number) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(selectedValue)
        ? selectedValues.filter((v) => v !== selectedValue)
        : [...selectedValues, selectedValue];

      setInternalValue(newValues);
      (onValueChange as MultiSelectProps["onValueChange"])?.(newValues);
    } else {
      setInternalValue([selectedValue]);
      (onValueChange as SingleSelectProps["onValueChange"])?.(selectedValue);
      setOpen(false);
    }
  };

  const filteredItems = useMemo(() => {
    if (!search) return selectItems;
    return selectItems.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [selectItems, search]);

  const selectedLabels = useMemo(() => {
    return selectItems
      .filter((item) => selectedValues.includes(item.value))
      .map((item) => ({ value: item.value, label: item.label }));
  }, [selectItems, selectedValues]);

  const displayValue = useMemo(() => {
    if (titleFixed) return titleFixed;

    if (selectedLabels.length === 0) return placeholder;

    if (multiSelect) {
      return `${selectedLabels.length} selecionado${
        selectedLabels.length > 1 ? "s" : ""
      }`;
    }

    return selectedLabels[0]?.label;
  }, [titleFixed, selectedLabels, placeholder, multiSelect]);

  const hasActiveFilters = selectedValues.length > 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={props.id}
          type="button"
          disabled={disabled}
          className={cn(
            "text-foreground file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-primary-600 focus-visible:ring-primary-600/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            "relative cursor-pointer justify-between items-center flex gap-2",
            className
          )}
        >
          <span
            className={cn("truncate", {
              "text-muted-foreground": selectedLabels.length === 0,
            })}
          >
            {displayValue}
          </span>

          <div className="flex items-center gap-1 shrink-0">
            {titleFixed && hasActiveFilters && (
              <div className="rounded-full bg-primary w-2 h-2 animate-pulse absolute top-[-2px] right-[-2px]" />
            )}
            {!disabled && (
              <IconManager
                name={open ? "ChevronUp" : "ChevronDown"}
                className="size-4 text-gray-500"
              />
            )}
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" sideOffset={2} className="w-max p-0">
        <Command shouldFilter={false} loop>
          {hasSearch && (
            <div className="px-3 pt-2 pb-1 bg-white sticky top-0 z-50 border-b">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquise..."
                className="h-9"
              />
            </div>
          )}

          <CommandList className="max-h-72 overflow-auto">
            {filteredItems.length === 0 && (
              <CommandEmpty className="p-0">
                <div className="text-sm p-4 text-center text-muted-foreground">
                  Nenhum item encontrado
                </div>
              </CommandEmpty>
            )}

            {filteredItems.length > 0 && (
              <CommandGroup>
                {filteredItems.map((item) => {
                  const isSelected = selectedValues.includes(item.value);

                  return (
                    <CommandItem
                      key={item.value}
                      value={String(item.value)}
                      onSelect={() => handleSelect(item.value)}
                      className={cn("px-3 py-2 cursor-pointer", {
                        "bg-accent": isSelected && !multiSelect,
                      })}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        {multiSelect && (
                          <div
                            className={cn(
                              "size-4 border rounded flex items-center justify-center mr-2 shrink-0",
                              {
                                "bg-primary border-primary": isSelected,
                                "border-input": !isSelected,
                              }
                            )}
                          >
                            {isSelected && (
                              <IconManager
                                name="Check"
                                className="size-3 text-white"
                              />
                            )}
                          </div>
                        )}

                        <span className="flex-1 truncate">{item.label}</span>

                        {!multiSelect && isSelected && (
                          <IconManager
                            name="Check"
                            className="size-4 text-primary shrink-0"
                          />
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
