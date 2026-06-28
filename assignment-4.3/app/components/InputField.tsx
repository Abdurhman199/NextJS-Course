"use client";

import { forwardRef } from "react";

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
};

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, type = "text", placeholder, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block font-medium">{label}</label>

        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className="w-full rounded border p-2"
          {...props}
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;