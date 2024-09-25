"use client"; // If your page component uses client-side features

import { LoginWrapper } from "@/components/LoginWrapper"; // Import the renamed component

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <LoginWrapper>
        {/* Protected content goes here */}
        <p>
          Welcome to the home page! This content is only visible to logged-in
          users.
        </p>
      </LoginWrapper>
    </div>
  );
}
