import React from 'react';

function FormField({ field, value, onChange }) {
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
          className="border p-2 w-full mb-4"
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
          className="border p-2 w-full mb-4"
        />
      );
    case 'dropdown':
      return (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          className="border p-2 w-full mb-4"
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
        <div className="mb-4">
          {field.options?.map((option) => (
            <label key={option.value} className="mr-4">
              <input
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      );
    case 'checkbox':
      return (
        <div className="mb-4">
          {field.options?.map((option) => (
            <label key={option.value} className="block">
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
