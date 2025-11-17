"use client";
import React, { useState } from "react";
import { Input } from "../Reusable/UI/Input";
import Button from "../Reusable/UI/Button";
import { MdFlight } from "react-icons/md";


interface FormFields {
  name: string;
  email: string;
  message: string;
}

type FormData = FormFields;
type FormErrors = Record<keyof FormFields, string>;

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: "",
      email: "",
      message: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Username validation
    if (!formData.message.trim()) {
      newErrors.message = "message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      if (validateForm()) {
        console.log("Form submitted:", formData);
        // Handle form submission here
      }
    };


  return (
    <>
      <div className="py-20 flex flex-col gap-4 text-center ">
        <h1 className="mont md:text-[40px] md:leading-11 font-light uppercase tracking-tighter">
          Let’s Stay{" "}
          <span className="font-medium text-[#04256C]">Connected</span>
        </h1>
        <p className="text-[24px] leading-[26px] max-w-[990px] mx-auto">
          Got a question, idea, or a spark of curiosity? We’d love to hear from
          you. Whether you’re ready to book your mystery trip or just want to
          know how it all works, our team is here to help you take the first
          step toward the unknown.
        </p>
      </div>

      <div className="w-full flex flex-col">
        <form className="flex flex-row gap-5 items-center w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <Input
              type="text"
              name="name"
              label="Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="w-full">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              type="text"
              name="message"
              label="Message"
              placeholder="type here"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
        </form>
        <Button
                label="SUMBIT"
                bgColor="#FFA62B"
                textColor="#FFFFFF"
                logo={<MdFlight size={22} color="#000" className="rotate-90" />}
                logoBg="#FFFFFF"
                height="h-12"
                width="w-90 sm:w-35"
                className="px-5 mt-8"
              />
      </div>
    </>
  );
};

export default Form;
