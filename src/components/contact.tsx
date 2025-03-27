"use client";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";

const phoneNumberRegex = /^(?:\+1\s?)?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/;

const ContactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(phoneNumberRegex, "Invalid phone number"),
  message: z.string().optional(),
});

type Contact = z.infer<typeof ContactSchema>;

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<Contact>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});
    setSuccessMessage(null);

    // Validate the form data using the Zod schema
    const results = ContactSchema.safeParse(formData);

    if (results.success) {
      fetch("https://api.soldbyghost.com/api/submit/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          number: formData.phoneNumber,
          message: formData.message,
          subscribed: true,
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
    <div className="relative isolate bg-brand-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left Section - Contact Info */}
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-brand-text/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-brand-text/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-brand-primary/20"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)",
                  }}
                  className="aspect-1155/678 w-[72.1875rem] bg-gradient-to-br from-brand-secondary to-brand-accent opacity-20"
                />
              </div>
            </div>
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.7 },
              }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-brand-text sm:text-5xl">
                We&apos;d Love to Hear From You
              </h2>
              <p className="mt-6 text-lg/8 text-brand-text/80">
                Have questions or ready to get started? Reach out to us and
                we'll respond as soon as possible!
              </p>
              <dl className="mt-10 space-y-4 text-base/7 text-brand-text/80">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon
                      aria-hidden="true"
                      className="h-7 w-6 text-brand-text/60"
                    />
                  </dt>
                  <dd>
                    545 Mavis Island
                    <br />
                    Chicago, IL 99191
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-brand-text/60"
                    />
                  </dt>
                  <dd>
                    <a
                      href="tel:+1 (224) 497-2554"
                      className="hover:text-brand-text transition-colors duration-200"
                    >
                      +1 (224) 497-2554
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-brand-text/60"
                    />
                  </dt>
                  <dd>
                    <a
                      href="mailto:Diego@stonebrgrealty.com"
                      className="hover:text-brand-text transition-colors duration-200"
                    >
                      Diego@stonebrgrealty.com
                    </a>
                  </dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </div>

        {/* Right Section - Form */}
        <form
          onSubmit={handleSubmit}
          className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
        >
          <motion.div
            className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm/6 font-semibold text-brand-text"
                >
                  First name<span className="text-red-500"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-brand-text/5 px-3.5 py-2 text-base text-brand-text border border-brand-secondary/50 placeholder:text-brand-text/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {formErrors["firstName"] && (
                    <p className="text-red-500 mt-1">
                      {formErrors["firstName"]}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm/6 font-semibold text-brand-text"
                >
                  Last name<span className="text-red-500"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-brand-text/5 px-3.5 py-2 text-base text-brand-text border border-brand-secondary/50 placeholder:text-brand-text/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {formErrors["lastName"] && (
                    <p className="text-red-500 mt-1">
                      {formErrors["lastName"]}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-semibold text-brand-text"
                >
                  Email<span className="text-red-500"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    autoComplete="email"
                    className="block w-full rounded-md bg-brand-text/5 px-3.5 py-2 text-base text-brand-text border border-brand-secondary/50 placeholder:text-brand-text/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {formErrors["email"] && (
                    <p className="text-red-500 mt-1">{formErrors["email"]}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm/6 font-semibold text-brand-text"
                >
                  Phone number<span className="text-red-500"> *</span>
                </label>
                <div className="mt-2.5">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    onChange={handleChange}
                    autoComplete="tel"
                    className="block w-full rounded-md bg-brand-text/5 px-3.5 py-2 text-base text-brand-text border border-brand-secondary/50 placeholder:text-brand-text/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {formErrors["phoneNumber"] && (
                    <p className="text-red-500 mt-1">
                      {formErrors["phoneNumber"]}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-brand-text"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-brand-text/5 px-3.5 py-2 text-base text-brand-text border border-brand-secondary/50 placeholder:text-brand-text/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
                    defaultValue={""}
                  />
                  {formErrors["apiError"] && (
                    <p className="text-red-500 mt-1">
                      {formErrors["apiError"]}
                    </p>
                  )}
                  {successMessage && (
                    <p className="text-green-500 mt-1">{successMessage}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-brand-secondary px-3.5 py-2.5 text-center text-sm font-semibold text-brand-primary shadow-md hover:bg-brand-accent hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
