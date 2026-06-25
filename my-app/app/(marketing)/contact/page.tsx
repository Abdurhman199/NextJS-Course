"use client";

import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-black">
        Contact Us
      </h1>

      <ContactForm />
    </main>
  );
}