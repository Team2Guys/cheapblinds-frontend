"use client";

import React, { useState } from "react";

interface FormData {
  contactType: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    contactType: "Email",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Form submitted successfully!");
        setFormData({
          contactType: "Email",
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert("Something went wrong. Try again!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="mx-auto text-black py-10 font-open_Sans">
      <h2 className="text-lg font-semibold mb-2">Still Need Help?</h2>
      <p className="font-bold mb-6">Get in touch with us.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact Type */}
        <div>
          <label className="block mb-1 text-[16px]">Still Need Help?</label>
          <select
            name="contactType"
            value={formData.contactType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option>Email</option>
            <option>Call</option>
            <option>WhatsApp</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 text-[16px]">Your name</label>
          <input
            type="text"
            name="name"
            className="w-full border border-gray-300 rounded-md p-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-[16px]">Your email</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-md p-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-[16px]">Mobile Number</label>
          <input
            type="tel"
            name="phone"
            className="w-full border border-gray-300 rounded-md p-2"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-[16px]">Your message (optional)</label>
          <textarea
            name="message"
            rows={4}
            className="w-full border border-gray-300 rounded-md p-2"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 cursor-pointer text-[16px] font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
