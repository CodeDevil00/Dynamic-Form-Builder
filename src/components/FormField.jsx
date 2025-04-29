import React from 'react';

function FormField({ field, value, onChange }) {
  const inputBaseClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelGroupClass = "flex flex-col gap-2";

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
          className={`${inputBaseClass} resize-none h-28`}
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
        <div className={labelGroupClass}>
          {field.options?.map((option) => (
            <label key={option.value} className="inline-flex items-center gap-2 text-sm text-gray-700">
              <input
                type="radio"
                name={field.fieldId}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="accent-blue-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      );

    case 'checkbox':
      return (
        <div className={labelGroupClass}>
          {field.options?.map((option) => (
            <label key={option.value} className="inline-flex items-center gap-2 text-sm text-gray-700">
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
                className="accent-blue-500"
              />
              {option.label}
            </label>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default FormField;
