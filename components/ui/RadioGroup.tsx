import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioOption {
  label: React.ReactNode;
  value: string;
}

interface RadioGroupProps {
  options: (string | RadioOption)[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  columns?: number;
}

export function RadioGroup({ options, value, onChange, className, error, columns }: RadioGroupProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div
        className={cn(columns ? "grid gap-[0.6rem]" : "flex flex-wrap gap-[0.6rem]")}
        style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined}
      >
        {options.map((opt, i) => {
          const isObj = typeof opt === 'object' && opt !== null;
          const optValue = isObj ? (opt as RadioOption).value : (opt as string);
          const optLabel = isObj ? (opt as RadioOption).label : (opt as string);
          const isSelected = value === optValue;
          return (
            <button
              key={optValue + i}
              type="button"
              onClick={() => onChange(optValue)}
              className={cn(
                "min-w-0 text-center py-[0.6rem] px-[0.5rem] rounded-[0.75rem] border text-[0.85rem] font-medium cursor-pointer select-none transition-all duration-200",
                columns ? "leading-tight" : "flex-[1_1_auto] whitespace-nowrap",
                isSelected
                  ? "bg-primary border-primary text-white shadow-[0_3px_10px_-6px_rgba(113,95,219,0.5)]"
                  : "bg-input border-border text-foreground hover:border-[rgba(113,95,219,0.6)]"
              )}
            >
              {optLabel}
            </button>
          )
        })}
      </div>
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  )
}
