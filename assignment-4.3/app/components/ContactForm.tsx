"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  ContactFormInput,
} from "../lib/schemas/contact";


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
  reset,
  formState: { errors, isSubmitting },
} = useForm<ContactFormInput>({
  resolver: zodResolver(contactSchema),
});




  async function onSubmit(data: ContactFormInput) {
  await new Promise((resolve) =>
    setTimeout(resolve, 1500)
  );

  console.log(data);

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
  error={errors.name?.message}
  {...register("name")}
/>
<InputField
  label="Email"
  type="email"
  error={errors.email?.message}
  {...register("email")}
/>


      

      <div>
        <label className="mb-1 block font-medium">
          Message
        </label>

<textarea
  rows={5}
  className="w-full rounded border p-2"
  {...register("message")}
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