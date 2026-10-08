import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-neutral-900"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          w-full rounded-lg border
          bg-white px-3 py-2.5
          text-sm text-neutral-900
          outline-none
          transition
          placeholder:text-neutral-400
          focus:border-neutral-900
          focus:ring-2
          focus:ring-neutral-900/10
          disabled:cursor-not-allowed
          disabled:bg-neutral-100
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-neutral-200"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
