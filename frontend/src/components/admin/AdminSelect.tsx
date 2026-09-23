"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check, LucideIcon } from "lucide-react";

export interface AdminSelectOption {
  value: string;
  label: string;
}

interface AdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly (AdminSelectOption | string)[];
  label?: string;
  icon?: LucideIcon;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export default function AdminSelect({
  value,
  onChange,
  options,
  label,
  icon: Icon,
  placeholder = "Pilih opsi...",
  className = "",
  selectClassName = "",
  required = false,
  disabled = false,
  id,
  name,
}: AdminSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedOptions: AdminSelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const selectedIndex = normalizedOptions.findIndex((opt) => opt.value === value);
  const selectedOption = normalizedOptions[selectedIndex];

  const toggleDropdown = () => {
    if (disabled) return;
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < 240 && spaceAbove > spaceBelow) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
    setIsOpen((prev) => !prev);
  };

  // Tutup dropdown saat klik di luar container
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  // Keyboard navigation & accessibility
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          toggleDropdown();
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < normalizedOptions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : normalizedOptions.length - 1
        );
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
          onChange(normalizedOptions[highlightedIndex].value);
          setIsOpen(false);
        }
      }
    },
    [isOpen, highlightedIndex, normalizedOptions, onChange, disabled]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleOutsideClick, handleKeyDown]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-[#bc0c11]">*</span>}
        </label>
      )}

      {/* Hidden input untuk integrasi form standar */}
      {name && <input type="hidden" name={name} value={value} />}

      <div className="relative">
        {/* Tombol Pemicu Dropdown Kustom */}
        <button
          type="button"
          id={id}
          disabled={disabled}
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`w-full flex items-center justify-between rounded-xl border bg-white py-2.5 text-xs font-semibold shadow-2xs transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-left ${
            isOpen
              ? "border-[#bc0c11] ring-2 ring-red-100 bg-white"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 focus:border-[#bc0c11] focus:ring-2 focus:ring-red-100"
          } ${Icon ? "pl-9" : "pl-3.5"} pr-9 ${selectClassName}`}
        >
          {Icon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon className="size-4" />
            </div>
          )}

          <span
            className={`truncate ${
              selectedOption ? "text-slate-800" : "text-slate-400 font-normal"
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>

          <div
            className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#bc0c11]" : "text-slate-400"
            }`}
          >
            <ChevronDown className="size-4" />
          </div>
        </button>

        {/* Menu Popover Kustom (Menggantikan menu polos OS/browser) */}
        {isOpen && (
          <div
            role="listbox"
            className={`absolute left-0 right-0 z-50 min-w-[200px] w-full rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-xl animate-in fade-in-0 zoom-in-95 duration-150 ${
              openUpward ? "bottom-full mb-1.5" : "top-full mt-1.5"
            }`}
          >
            <div className="max-h-60 overflow-y-auto admin-modal-scrollbar space-y-0.5">
              {normalizedOptions.map((opt, idx) => {
                const isSelected = opt.value === value;
                const isHighlighted = idx === highlightedIndex;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-all cursor-pointer text-left ${
                      isSelected
                        ? "bg-red-50 text-[#bc0c11] font-bold"
                        : isHighlighted
                        ? "bg-slate-100 text-slate-900 font-medium"
                        : "text-slate-700 font-medium hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="size-3.5 text-[#bc0c11] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
