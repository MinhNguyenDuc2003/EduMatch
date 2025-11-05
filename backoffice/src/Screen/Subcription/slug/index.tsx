'use client';
import { useParams } from 'next/navigation';
import React from 'react';

export default function SongDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-700 mb-4">Chi tiết bài hát</h1>
      <p>ID bài hát: <span className="font-mono text-blue-600">{id}</span></p>
      {/* Bạn có thể fetch API chi tiết tại đây */}
    </div>
  );
}
