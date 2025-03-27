"use client";
import React, { useState } from "react";
import InputBox from "./inputBox";
import { motion } from "framer-motion";
import { z } from "zod";
import Image from "next/image";

const phoneNumberRegex = /^(?:\+1\s?)?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/;

const EstimateFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(4, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required").max(2, "Invalid state"),
  number: z.string().regex(phoneNumberRegex, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
});

type EstimateForm = z.infer<typeof EstimateFormSchema>;

export default function Estimate() {
  const [formData, setFormData] = useState<EstimateForm>({
    name: "",
    address: "",
    city: "",
    state: "",
    number: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormErrors({});
    setSuccessMessage(null);

    const results = EstimateFormSchema.safeParse(formData);

    if (results.success) {
      fetch("https://api.soldbyghost.com/api/submit/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          email: formData.email,
          number: formData.number,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            setSuccessMessage("Submitted successfully!");
            setTimeout(() => setSuccessMessage(null), 5000);
          } else {
            setFormErrors((prev) => ({
              ...prev,
              apiError: responseData.message || "An error occurred.",
            }));
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
          setFormErrors((prev) => ({
            ...prev,
            apiError: "Failed to submit. Please try again.",
          }));
        });
    } else {
      results.error.errors.forEach((error) => {
        setFormErrors((prev) => ({
          ...prev,
          [error.path.join(".")]: error.message,
        }));
      });
    }
    setTimeout(() => {
      setFormErrors({});
    }, 5000);
  };

  return (
    <motion.div
      className="overflow-hidden py-24 sm:py-32 bg-brand-neutral"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      viewport={{ once: true }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start">
          {/* Form Section */}
          <div className="lg:pt-4 lg:pr-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-brand-accent">
                Home Estimate
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-brand-primary sm:text-5xl">
                Get a Free Estimate of Your Home&apos;s Value
              </p>
              <p className="mt-6 text-lg/8 text-brand-primary/80">
                Curious about your home&apos;s value? Fill out the form below to
                get a free, no-obligation estimate sent directly to your inbox.
                Let us help you plan your next move!
              </p>
              <div className="mt-8">
                <form onSubmit={handleSubmit}>
                  <InputBox
                    type="text"
                    label={
                      <span>
                        Name<span className="text-red-500">*</span>
                      </span>
                    }
                    name="name"
                    placeholder="John Doe"
                    id="name"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {formErrors["name"] && (
                    <p className="text-red-500 mt-1">{formErrors["name"]}</p>
                  )}

                  <InputBox
                    type="text"
                    label={
                      <span>
                        Address<span className="text-red-500">*</span>
                      </span>
                    }
                    name="address"
                    placeholder="123 Main St"
                    id="address"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {formErrors["address"] && (
                    <p className="text-red-500 mt-1">{formErrors["address"]}</p>
                  )}

                  <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                      <InputBox
                        type="text"
                        label={
                          <span>
                            City<span className="text-red-500">*</span>
                          </span>
                        }
                        name="city" // Fixed: Corrected from "address" to "city"
                        placeholder="Chicago"
                        id="city"
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                      />
                      {formErrors["city"] && (
                        <p className="text-red-500 mt-1">
                          {formErrors["city"]}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      <InputBox
                        type="text"
                        label={
                          <span>
                            State<span className="text-red-500">*</span>
                          </span>
                        }
                        name="state" // Fixed: Corrected from "address" to "state"
                        placeholder="IL"
                        id="state"
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                      />
                      {formErrors["state"] && (
                        <p className="text-red-500 mt-1">
                          {formErrors["state"]}
                        </p>
                      )}
                    </div>
                  </div>

                  <InputBox
                    type="tel"
                    label={
                      <span>
                        Phone Number<span className="text-red-500">*</span>
                      </span>
                    }
                    placeholder="555-555-5555"
                    id="number"
                    name="number"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {formErrors["number"] && (
                    <p className="text-red-500 mt-1">{formErrors["number"]}</p>
                  )}

                  <InputBox
                    type="email"
                    label={
                      <span>
                        Email<span className="text-red-500">*</span>
                      </span>
                    }
                    placeholder="you@example.com"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {formErrors["email"] && (
                    <p className="text-red-500 mt-1">{formErrors["email"]}</p>
                  )}

                  {formErrors["apiError"] && (
                    <p className="text-red-500 mt-1">
                      {formErrors["apiError"]}
                    </p>
                  )}
                  {successMessage && (
                    <p className="text-green-500 mt-1">{successMessage}</p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex mt-4 rounded-md bg-brand-secondary px-3.5 py-2.5 text-sm font-semibold text-brand-primary shadow-md hover:bg-brand-accent hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300"
                  >
                    Get My Estimate!
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <Image
            alt="home on top of paper with charts on it and a compass next to the house"
            src="/HomeEstimate.webp"
            width={2560}
            height={1707}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-brand-primary/20 sm:w-[57rem] md:-ml-4 lg:ml-0"
          />
        </div>
      </div>
    </motion.div>
  );
}
