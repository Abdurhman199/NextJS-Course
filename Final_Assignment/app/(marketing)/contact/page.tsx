"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormInput } from "../../lib/schemas/contact";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormInput) => {
    setSuccess(false);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      // server field errors → map to form
      if (result?.errors) {
        Object.entries(result.errors).forEach(([field, message]) => {
          setError(field as keyof ContactFormInput, {
            type: "server",
            message: message as string,
          });
        });
      }
      return;
    }

    setSuccess(true);
    reset();
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Message sent successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <input
            placeholder="Name"
            {...register("name")}
            disabled={isSubmitting}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <input
            placeholder="Email"
            {...register("email")}
            disabled={isSubmitting}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            placeholder="Message"
            {...register("message")}
            disabled={isSubmitting}
            className="w-full border p-2 rounded min-h-[120px]"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}