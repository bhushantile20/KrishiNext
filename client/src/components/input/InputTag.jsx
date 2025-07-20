import React, { useState } from "react";

const InputTag = ({
  label,
  type,
  placeholder,
  outlineColor,
  value,
  setFormData,
  toUpdate,
  maxLen = 100,
  minLen = 1,
}) => {
  const [error, setError] = useState("");

  const validate = (val) => {
    if (toUpdate === "contact") {
      // Only digits allowed, exactly 10 digits
      if (!/^\d{0,10}$/.test(val)) {
        return "Only digits are allowed.";
      }
      if (val.length !== 10) {
        return "Mobile number must be exactly 10 digits.";
      }
    }
    if (type === "password") {
      // Password: min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(val)) {
        return "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
      }
    }
    if (val.length < minLen) {
      return `Minimum ${minLen} characters required.`;
    }
    if (val.length > maxLen) {
      return `Maximum ${maxLen} characters allowed.`;
    }
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return "Invalid email address.";
      }
    }
    return "";
  };

  const handleChange = (e) => {
    let val = e.target.value;
    // Prevent non-digit input for contact
    if (toUpdate === "contact") {
      val = val.replace(/\D/g, "");
    }
    setError(validate(val));
    setFormData((prev) => ({
      ...prev,
      [toUpdate]: val,
    }));
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm ${outlineColor} rounded-lg block w-full p-2.5`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        maxLength={maxLen}
        minLength={minLen}
        inputMode={toUpdate === "contact" ? "numeric" : undefined}
        pattern={toUpdate === "contact" ? "\\d{10}" : undefined}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};

export default InputTag;
