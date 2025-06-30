'use client';
import { api } from '../lib/api';

export default function GoogleLogin() {
  const handle = async () => {
    try {
      const data = await api<{ url: string }>('/auth/google');
      window.location.href = data.url;
    } catch {
      alert('Google auth failed');
    }
  };

  return <button onClick={handle}>Login with Google</button>;
}
