'use client';

import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue = true, formatValue, min = 0, max = 100, value, ...props }, ref) => {
    const displayValue = formatValue
      ? formatValue(Number(value))
      : String(value);

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <label className="text-sm font-medium text-gray-700">{label}</label>
            )}
            {showValue && (
              <span className="text-sm font-semibold text-primary-600">
                {displayValue}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          value={value}
          className={cn(
            'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
            'accent-primary-600',
            className
          )}
          {...props}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatValue ? formatValue(Number(min)) : min}</span>
          <span>{formatValue ? formatValue(Number(max)) : max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export { Slider };
