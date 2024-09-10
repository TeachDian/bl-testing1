"use client"
import React, { useState } from 'react';

export default function TimeInput() {
  const [time, setTime] = useState('');

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTime(e.target.value);
  };

  return (
    <div className="flex flex-col w-80">
      <input
        id="time"
        type="time"
        value={time}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
  );
}
