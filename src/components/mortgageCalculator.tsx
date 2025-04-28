"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Field, Label, Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { z } from "zod";

const phoneNumberRegex = /^(?:\+1\s?)?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/;
const numbersOnlyRegex = /^\d{1,3}(?:[,\.]\d{3})*(?:[\.]?\d+)?$/;

const MortgageDataSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  price: z
    .string()
    .min(5, "Price is required")
    .regex(numbersOnlyRegex, "Invalid price"),
  downPayment: z
    .string()
    .nonempty("Down payment is required")
    .regex(numbersOnlyRegex, "Invalid down payment"),
  interest: z
    .string()
    .nonempty("Interest rate is required")
    .regex(numbersOnlyRegex, "Invalid interest rate"),
  term: z
    .string()
    .nonempty("Loan term is required")
    .regex(numbersOnlyRegex, "Invalid loan term"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(phoneNumberRegex, "Invalid phone number"),
});

type MortgageData = z.infer<typeof MortgageDataSchema>;

export default function MortgageCalculator() {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState<MortgageData>({
    firstName: "",
    lastName: "",
    price: "",
    downPayment: "",
    interest: "",
    term: "",
    email: "",
    phoneNumber: "",
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

    const results = MortgageDataSchema.safeParse(formData);

    if (results.success) {
      fetch("http://localhost:8080/api/calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: formData.price,
          interest: formData.interest,
          years: formData.term,
          downPayment: formData.downPayment,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          number: formData.phoneNumber,
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
    <motion.div
      className="isolate px-6 py-24 sm:py-32 lg:px-8 bg-brand-neutral"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
      viewport={{ once: true }}
    >
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-secondary to-brand-accent opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-brand-primary sm:text-5xl">
          Calculate Your Mortgage in Seconds
        </h2>
        <p className="mt-2 text-lg/8 text-brand-primary/80">
          Get personalized payment estimates—fill out the form below and receive
          your results instantly.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm/6 font-semibold text-brand-primary"
            >
              First name<span className="text-red-500"> *</span>
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="firstName"
                placeholder="John"
                type="text"
                onChange={handleChange}
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              />
              {formErrors["firstName"] && (
                <p className="text-red-500 mt-1">{formErrors["firstName"]}</p>
              )}
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm/6 font-semibold text-brand-primary"
            >
              Last name<span className="text-red-500"> *</span>
            </label>
            <div className="mt-2.5">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                onChange={handleChange}
                autoComplete="family-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              />
              {formErrors["lastName"] && (
                <p className="text-red-500 mt-1">{formErrors["lastName"]}</p>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm/6 font-semibold text-brand-primary"
            >
              Price<span className="text-red-500"> *</span>
            </label>
            <div className="mt-2.5">
              <input
                id="price"
                name="price"
                placeholder="$200,000"
                onChange={handleChange}
                type="text"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              />
              {formErrors["price"] && (
                <p className="text-red-500 mt-1">{formErrors["price"]}</p>
              )}
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label
              htmlFor="downPayment"
              className="block text-sm/6 font-semibold text-brand-primary"
            >
              Down Payment<span className="text-red-500"> *</span>
            </label>
            <div className="mt-2.5">
              <input
                id="down-payment"
                name="downPayment"
                placeholder="3.5%"
                type="text"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              />
              {formErrors["downPayment"] && (
                <p className="text-red-500 mt-1">{formErrors["downPayment"]}</p>
              )}
            </div>
          </div>

          {/* Interest */}
          <div>
            <label
              htmlFor="interest"
              className="block text-sm/6 font-semibold text-brand-primary"
            >
              Interest<span className="text-red-500"> *</span>
            </label>
            <div className="mt-2.5">
              <input
                id="interest"
                name="interest"
                placeholder="6.4%"
                type="text"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              />
              {formErrors["interest"] && (
                <p className="text-red-500 mt-1">{formErrors["interest"]}</p>
              )}
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <label
              htmlFor="term"
              className="block text-sm/6 font-semibold text-brand-primary"
            >
              Loan Term<span className="text-red-500"> *</span>
            </label>
            <div className="mt-2.5">
              <input
                id="term"
                name="term"
                type="text"
                placeholder="30 Years"
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              />
              {formErrors["term"] && (
                <p className="text-red-500 mt-1">{formErrors["term"]}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-brand-primary"
            >
              Email<span className="text-red-500"> *</span>
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-primary border border-brand-secondary/50 placeholder:text-brand-primary/50 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent"
              />
              {formErrors["email"] && (
                <p className="text-red-500 mt-1">{formErrors["email"]}</p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm/6 font-semibold text-brand-primary"
            >
              Phone number<span className="text-red-500"> *</span>
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md bg-white border border-brand-secondary/50 focus-within:ring-2 focus-within:ring-brand-accent focus-within:border-brand-accent">
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    aria-label="Country"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-7 pl-3.5 text-base text-brand-primary/70 bg-transparent border-none focus:outline-none sm:text-sm/6"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-brand-primary/70 sm:size-4"
                  />
                </div>
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="text"
                  placeholder="123-456-7890"
                  onChange={handleChange}
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-brand-primary placeholder:text-brand-primary/50 bg-transparent border-none focus:outline-none sm:text-sm/6"
                />
              </div>
              {formErrors["phoneNumber"] && (
                <p className="text-red-500 mt-1">{formErrors["phoneNumber"]}</p>
              )}
            </div>
          </div>

          {/* Privacy Policy Switch */}
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-brand-neutral p-px ring-1 ring-brand-primary/20 transition-colors duration-200 ease-in-out ring-inset focus-visible:ring-2 focus-visible:ring-brand-accent data-checked:bg-brand-secondary"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="size-4 transform rounded-full bg-white shadow-xs ring-1 ring-brand-primary/20 transition duration-200 ease-in-out group-data-checked:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm/6 text-brand-primary/80">
              By selecting this, you agree to our{" "}
              <a
                href="#"
                className="font-semibold text-brand-accent hover:text-brand-secondary"
              >
                privacy policy
              </a>
              .
            </Label>
          </Field>

          {/* Error/Success Messages */}
          {formErrors["apiError"] && (
            <p className="text-red-500 mt-1">{formErrors["apiError"]}</p>
          )}
          {successMessage && (
            <p className="text-green-500 mt-1">{successMessage}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-brand-secondary px-3.5 py-2.5 text-center text-sm font-semibold text-brand-primary shadow-md hover:bg-brand-accent hover:text-brand-primary focus:ring-2 focus:ring-brand-accent transition-all duration-300"
          >
            Get My Estimate
          </button>
        </div>
      </form>
    </motion.div>
  );
}
