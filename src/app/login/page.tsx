/**
 * /login — sign in.
 *
 * Client component with three paths:
 *   1. Email + password (existing users)
 *   2. Magic link (passwordless — sends email)
 *   3. Google OAuth (redirects to /auth/callback)
 *
 * Apple OAuth deferred to W6 — requires Apple Services ID setup that's
 * more configuration than in-scope for W5.
 *
 * On success, redirects to /account.
 */
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Mail, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ kind: 'error' | 'ok'; text: string } | null>(null);

  const withGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setMessage({ kind: 'error', text: error.message });
      setLoading(false);
    }
  };

  const withPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage({ kind: 'error', text: error.message });
      setLoading(false);
      return;
    }
    router.push('/account');
    router.refresh();
  };

  const withMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      setMessage({ kind: 'error', text: error.message });
    } else {
      setMessage({ kind: 'ok', text: 'Check your email for the sign-in link.' });
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <header className="text-center mb-10">
        <h1 className="font-serif text-brown text-4xl font-medium mb-2">Welcome back</h1>
        <p className="text-muted text-sm">Sign in to iTafakkur to sync with your app.</p>
      </header>

      <button
        onClick={withGoogle}
        disabled={loading}
        className="w-full h-11 rounded-full bg-white border border-border text-brown text-sm font-medium hover:bg-cream transition-colors disabled:opacity-50 flex items-center justify-center gap-3 mb-3"
      >
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted">
        <span className="flex-1 h-px bg-border" />
        <span>or</span>
        <span className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={mode === 'password' ? withPassword : withMagicLink} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-11 px-4 rounded-full bg-white border border-border text-sm text-brown placeholder:text-muted focus:outline-none focus:border-gold"
        />
        {mode === 'password' && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full h-11 px-4 rounded-full bg-white border border-border text-sm text-brown placeholder:text-muted focus:outline-none focus:border-gold"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {mode === 'password' ? 'Sign in' : 'Email me a sign-in link'}
        </button>
      </form>

      <div className="mt-4 text-center text-xs text-muted">
        <button
          type="button"
          onClick={() => { setMode(mode === 'password' ? 'magic' : 'password'); setMessage(null); }}
          className="underline hover:text-brown"
        >
          {mode === 'password' ? (<span className="inline-flex items-center gap-1"><Mail size={12} /> Use a magic link instead</span>) : 'Use password instead'}
        </button>
      </div>

      {message && (
        <div className={`mt-4 text-center text-sm ${message.kind === 'error' ? 'text-red-700' : 'text-brown'}`}>
          {message.text}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="underline text-brown">
          Sign up
        </Link>
      </p>
    </div>
  );
}
