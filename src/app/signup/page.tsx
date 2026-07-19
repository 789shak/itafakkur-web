/**
 * /signup — new account.
 *
 * Same providers as /login. Password creation triggers a Supabase
 * confirmation email; magic link path skips password entirely.
 */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { name },
      },
    });
    if (error) {
      setMessage({ kind: 'error', text: error.message });
      setLoading(false);
      return;
    }
    if (data.session) {
      // No email confirmation required — straight to account
      window.location.href = '/account';
    } else {
      setMessage({
        kind: 'ok',
        text: 'Check your email to confirm your account, then sign in.',
      });
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <header className="text-center mb-10">
        <h1 className="font-serif text-brown text-4xl font-medium mb-2">Create an account</h1>
        <p className="text-muted text-sm">Sync your journal, habits, and bookmarks across web + mobile.</p>
      </header>

      <button
        onClick={withGoogle}
        disabled={loading}
        className="w-full h-11 rounded-full bg-white border border-border text-brown text-sm font-medium hover:bg-cream transition-colors disabled:opacity-50 flex items-center justify-center gap-3 mb-3"
      >
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        Sign up with Google
      </button>

      <div className="my-6 flex items-center gap-3 text-xs text-muted">
        <span className="flex-1 h-px bg-border" />
        <span>or</span>
        <span className="flex-1 h-px bg-border" />
      </div>

      <form onSubmit={withPassword} className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-11 px-4 rounded-full bg-white border border-border text-sm text-brown placeholder:text-muted focus:outline-none focus:border-gold"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-11 px-4 rounded-full bg-white border border-border text-sm text-brown placeholder:text-muted focus:outline-none focus:border-gold"
        />
        <input
          type="password"
          placeholder="Password (8+ characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          className="w-full h-11 px-4 rounded-full bg-white border border-border text-sm text-brown placeholder:text-muted focus:outline-none focus:border-gold"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Create account
        </button>
      </form>

      {message && (
        <div className={`mt-4 text-center text-sm ${message.kind === 'error' ? 'text-red-700' : 'text-brown'}`}>
          {message.text}
        </div>
      )}

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{' '}
        <Link href="/login" className="underline text-brown">
          Sign in
        </Link>
      </p>
      <p className="mt-4 text-center text-xs text-muted max-w-xs mx-auto">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="underline">Terms</Link> and{' '}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}
