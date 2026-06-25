"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  async function onSubmit(data: ContactFormData) {
    setSuccess("");

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    console.log(data);

    setSuccess("Message sent successfully!");

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      {success && (
        <div className="rounded bg-green-100 p-3 text-green-700">
          {success}
        </div>
      )}

      <InputField
        label="Name"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...register("name", {
          required: "Name is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        })}
      />

      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
        })}
      />

      <div>
        <label className="mb-1 block font-medium">
          Message
        </label>

        <textarea
          rows={5}
          className="w-full rounded border p-2"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 2,
              message:
                "Message must be at least 2 characters",
            },
          })}
        />

        {errors.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}