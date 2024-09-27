'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const q = searchParams.get('q') || '';

  useEffect(() => {
    setSearch(q);
  }, [q]);

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    if (!search || search === q) return;

    router.push(`/search?q=${search}`);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleChangeSearch}
        onKeyDown={handleKeydown}
      />
      <button onClick={handleSubmit}>검색</button>
    </div>
  );
}
