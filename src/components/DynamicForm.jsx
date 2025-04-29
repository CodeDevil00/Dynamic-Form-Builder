import React, { useState } from "react";
import FormField from "./FormField";

function DynamicForm({ formResponse }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [thanks, setThanks] = useState(false);

  const currentSection = formResponse.form.sections[currentSectionIndex];

  const handleFieldChange = (fieldId, value) => {
    setFormData({ ...formData, [fieldId]: value });
    setErrors({ ...errors, [fieldId]: null });
  };

  const validateSection = () => {
    let newErrors = {};

    currentSection.fields.forEach((field) => {
      const value = formData[field.fieldId];

      if (field.required) {
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        if (!value && !isEmptyArray) {
          newErrors[field.fieldId] =
            field.validation?.message || `${field.label} is required.`;
          return;
        }
      }

      if (typeof value === "string") {
        if (field.minLength && value.length < field.minLength) {
          newErrors[field.fieldId] =
            field.validation?.message ||
            `${field.label} must be at least ${field.minLength} characters.`;
        } else if (field.maxLength && value.length > field.maxLength) {
          newErrors[field.fieldId] =
            field.validation?.message ||
            `${field.label} must be less than ${field.maxLength} characters.`;
        }
      }

      if (
        field.type === "email" &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[field.fieldId] =
          field.validation?.message || `Invalid email format.`;
      }

      if (field.type === "date" && value) {
        const today = new Date();
        const dob = new Date(value);
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        if (age < 16) {
          newErrors[field.fieldId] =
            field.validation?.message || `You must be at least 16 years old.`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      setCurrentSectionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    if (validateSection()) {
      console.log("Collected Form Data:", formData);
      setThanks(true);

      setTimeout(() => {
        setFormData({});
        setCurrentSectionIndex(0);
        setThanks(false);
      }, 3000);
    }
  };

  if (thanks) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] transition-opacity duration-700 ease-in-out animate-fadeIn">
        <div className="bg-green-50 border border-green-300 text-green-700 px-8 py-6 rounded-2xl shadow-lg text-center animate-fadeInUp">
          <p className="text-2xl font-semibold mb-2">🎉 Thank you!</p>
          <p className="text-lg">Your form has been successfully submitted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-xl rounded-3xl">
      <h2 className="text-4xl font-bold mb-10 text-blue-700 text-center">
        {currentSection.title}
      </h2>
      {currentSection.fields.map((field) => (
        <div
          key={field.fieldId}
          className="mb-8 bg-gray-50 p-5 rounded-xl shadow-sm"
        >
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            {field.label}
          </label>
          <FormField
            field={field}
            value={formData[field.fieldId]}
            onChange={(value) => handleFieldChange(field.fieldId, value)}
          />
          {errors[field.fieldId] && (
            <div className="text-red-500 text-sm mt-1 font-medium">
              {errors[field.fieldId]}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-12">
        {currentSectionIndex > 0 ? (
          <button
            className="px-8 py-3 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition transform hover:scale-105"
            onClick={handlePrev}
          >
            Prev
          </button>
        ) : (
          <div />
        )}

        {currentSectionIndex < formResponse.form.sections.length - 1 ? (
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition transform hover:scale-105"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
          <button
            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition transform hover:scale-105"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default DynamicForm;
