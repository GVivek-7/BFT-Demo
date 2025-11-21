"use client";
import { SOCIAL_LOGINS } from "@/data/Auth/Socials";
import Button from "@/components/Reusable/UI/Button";
import { Input } from "@/components/Reusable/UI/Input";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoArrowUpLeft } from "react-icons/go";
import Image from "next/image";
import { AuthBg1, AuthBg2, AuthBg3, AuthBg4, AuthBg5, AuthBg6 } from "@/assets/Auth";


interface FormFields {
  name: string;
  email: string;
  username: string;
  password: string;
  currentPassword: string;
}

type FormData = FormFields;
type FormErrors = Record<keyof FormFields, string>;

const Page = () => {
    const [bgIndex, setBgIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    username: "",
    password: "",
    currentPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    username: "",
    password: "",
    currentPassword: "",
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
      username: "",
      password: "",
      currentPassword: "",
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
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Current password validation (if needed)
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
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

  const BG_IMAGES = [
    {img:AuthBg1},
    {img:AuthBg2},
    {img:AuthBg3},
    {img:AuthBg4},
    {img:AuthBg5},
    {img:AuthBg6},

  ]

   useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BG_IMAGES.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, [BG_IMAGES.length]);


  return (
 <div className="relative w-full min-h-screen flex items-center justify-center md:justify-center px-4">
  <div className="absolute bg-black opacity-50 inset-0  z-10"/>
  {BG_IMAGES.map((bg, index) => (
    <div
      key={index}
      className="absolute inset-0 bg-cover z-0 bg-center transition-opacity duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${bg.img.src})`,
        opacity: index === bgIndex ? 1 : 0,
        zIndex: index === bgIndex ? 1 : 0,
      }}
    />
  ))}
  <div className="relative z-10 flex lg:flex-row flex-col-reverse items-center lg:items-start justify-center lg:justify-start gap-6 lg:gap-10 w-full lg:w-auto py-8 lg:py-0">
    <div className="bg-white/70 border border-white/20 rounded-[12px] p-6 sm:p-8 lg:p-12 w-full max-w-[504px]">

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="username"
            label="Username / email ID"
            placeholder="@johndoe"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="text-end">
          <Link href='/forgot-password' className="text-md hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mt-4">
          <Button
            label="LOGIN Now"
            bgColor="#FFA62B"
            textColor="#FFFFFF"
            logo={<GoArrowUpLeft size={22} color="#FFA62B" />}
            logoBg="#FFFFFF"
            height="h-12"
            width="w-full sm:w-80"
            className="px-5"
          />
          <Link
            href="/sign-up"
            className="bg-[#FFA62B] text-[14px] leading-[14px] flex items-center justify-center w-full sm:w-40 font-light rounded-full text-white py-4 px-5"
          >
            SIGN UP
          </Link>
        </div>

        <div className="flex items-center justify-center w-full py-2">
          <div className="flex-grow h-[1px] bg-[#969696]"></div>
          <span className="mont px-3 text-[#969696] text-xs sm:text-sm font-medium whitespace-nowrap">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow h-[1px] bg-[#969696]"></div>
        </div>

        <div className="flex flex-row gap-4 sm:gap-5 items-center justify-center mt-5">
          {SOCIAL_LOGINS.map((item) => (
            <div key={item.id} className="">
              <Image
                src={item.icon}
                alt={item.name}
                className="w-10 h-10 sm:w-11 sm:h-11"
              />
            </div>
          ))}
        </div>
      </form>
    </div>

    {/* <h1 className="text-black mont text-[24px] leading-[32px] sm:text-[28px] sm:leading-[38px] md:text-[30px] md:leading-[40px] xl:text-[40px] xl:leading-[50px] uppercase text-center lg:text-left px-4 lg:px-0">
      <span className="text-[#FFA62B]">
        WELCOME BACK <br />
      </span>
      ready for your next surprise?
    </h1> */}
  </div>
</div>
  );
};

export default Page;
