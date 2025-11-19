"use client";
import React, { useState } from "react";
import { Input } from "../Reusable/UI/Input";
import Button from "../Reusable/UI/Button";
import { MdFlight } from "react-icons/md";
import Link from "next/link";
import { FooterSocailLinks } from "@/data/Footer/FooterSocials";
import Image from "next/image";

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
      <div className="md:py-20 py-10 flex flex-col gap-4 text-center ">
        <h1 className="mont md:text-[40px] md:leading-11 font-light uppercase tracking-tighter">
          Let’s Stay{" "}
          <span className="font-medium text-[#04256C]">Connected</span>
        </h1>
        <p className="md:text-[24px] text-[18px] md:leading-[26px] max-w-[990px] mx-auto">
          Got a question, idea, or a spark of curiosity? We’d love to hear from
          you. Whether you’re ready to book your mystery trip or just want to
          know how it all works, our team is here to help you take the first
          step toward the unknown.
        </p>
      </div>

      <div className="w-full flex flex-col">
        <form className="flex md:flex-row flex-col gap-5 items-center w-full" onSubmit={handleSubmit}>
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 mt-8">
          <Button
            label="SUMBIT"
            bgColor="#FFA62B"
            textColor="#FFFFFF"
            logo={<MdFlight size={22} color="#000" className="rotate-90" />}
            logoBg="#FFFFFF"
            height="h-12"
            width="w-full sm:w-35"
            className="px-5"
          />
          <div className="flex flex-row gap-4 md:gap-5 items-center">
            {FooterSocailLinks.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="transition-transform duration-300 hover:scale-103 cursor-pointer"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  width={40}
                  height={40}
                />
              </Link>
            ))}
          </div>
        </div>
      
      </div>
    </>
  );
};

export default Form;
