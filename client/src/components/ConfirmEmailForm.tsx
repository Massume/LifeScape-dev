'use client';
import { useState } from 'react';
import { api } from '../lib/api';
import { useRouter } from 'next/navigation';

export default function ConfirmEmailForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api('/auth/confirm-email', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });
      router.push('/login');
    } catch {
      setError('Confirmation failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Confirm Email</h2>
      {error && <p>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Code" value={code} onChange={e => setCode(e.target.value)} />
      <button type="submit">Confirm</button>
    </form>
  );
}
