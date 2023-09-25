"use client";

import React, { useState } from "react";

const WaitlistSignup: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/addToWaitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
    } catch (error) {
      console.log(
        "There was an error adding the email to the waitlist:",
        error
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="email" className="mb-0 p-2">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 rounded"
      />
      <button
        type="submit"
        className="py-2 px-4 text-black font-bold rounded-lg bg-ctaBtn m-4"
      >
        Join Waitlist
      </button>
    </form>
  );
};

export default WaitlistSignup;
