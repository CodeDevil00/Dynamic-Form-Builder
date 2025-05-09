import React from 'react';

function FormField({ field, value, onChange }) {
  const inputBaseClass =
    "w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out";

  const checkboxRadioLabelClass =
    "inline-flex items-center gap-3 text-gray-700 cursor-pointer mb-1";

  switch (field.type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'date':
      return (
        <input
          type={field.type}
          placeholder={field.placeholder}
          required={field.required}
          maxLength={field.maxLength}
          minLength={field.minLength}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputBaseClass}
        />
      );

    case 'textarea':
      return (
        <textarea
          placeholder={field.placeholder}
          required={field.required}
          maxLength={field.maxLength}
          minLength={field.minLength}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBaseClass} resize-none h-32`}
        />
      );

    case 'dropdown':
      return (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className={inputBaseClass}
        >
          <option value="">Select an option</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case 'radio':
      return (
        <div className="mb-4 flex flex-col gap-2">
          {field.options?.map((option) => (
            <label key={option.value} className={checkboxRadioLabelClass}>
              <input
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-base">{option.label}</span>
            </label>
          ))}
        </div>
      );

    case 'checkbox':
      return (
        <div className="mb-4 flex flex-col gap-2">
          {field.options?.map((option) => (
            <label key={option.value} className={checkboxRadioLabelClass}>
              <input
                type="checkbox"
                value={option.value}
                checked={value?.includes(option.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onChange([...(value || []), option.value]);
                  } else {
                    onChange(value.filter((v) => v !== option.value));
                  }
                }}
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-base">{option.label}</span>
            </label>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default FormField;