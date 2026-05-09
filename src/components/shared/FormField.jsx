
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const FormField = ({
  label,
  name,
  type = "text",
  error,
  touched,
  required = false,
  helperText,
  className,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  const isInvalid = touched && !!error;
  const isValid = touched && !error && value && value.length > 0;

  return (
    <div className={cn("space-y-2 mb-4", className)}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-300"
        >
          {label}
          {required && <span className="text-cyan-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={isInvalid}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            aria-required={required}
            className={cn(
              "flex min-h-[120px] w-full rounded-lg border bg-slate-950 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              isInvalid ? "border-red-500 focus-visible:ring-red-500" : "border-slate-800 focus-visible:ring-cyan-500",
              isValid ? "border-green-500/50 focus-visible:ring-green-500" : ""
            )}
            {...props}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={isInvalid}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            aria-required={required}
            className={cn(
              "flex h-11 w-full rounded-lg border bg-slate-950 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              isInvalid ? "border-red-500 focus-visible:ring-red-500" : "border-slate-800 focus-visible:ring-cyan-500",
              isValid ? "border-green-500/50 focus-visible:ring-green-500" : ""
            )}
            {...props}
          />
        )}

        {/* Validation Icons */}
        <div className="absolute right-3 top-3 pointer-events-none">
          {isInvalid && <AlertCircle className="h-5 w-5 text-red-500" />}
          {isValid && type !== 'textarea' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
        </div>
      </div>

      {/* Error Message */}
      {isInvalid && (
        <p 
          id={`${name}-error`} 
          role="alert" 
          className="text-xs text-red-400 mt-1 font-medium flex items-center gap-1 animate-in slide-in-from-top-1 fade-in"
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {!isInvalid && helperText && (
        <p 
          id={`${name}-helper`} 
          className="text-xs text-gray-500 mt-1"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;
