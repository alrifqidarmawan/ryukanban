"use client";
import CustomButton from '@/components/CustomButton';
import React from 'react';

import { useRouter } from 'next/navigation';

export default function AboutPage() {
    const router = useRouter();
    return (
      <div>
          <CustomButton label="Back to home" variant="secondary" onClick={() => router.push("/")} />
      <h2>Welcome to the about page 🎉</h2>
    </div>
  )
}
