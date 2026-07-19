/**
 * /contact — simple contact page.
 *
 * MVP: mailto link + typical response time. A proper contact form
 * with a backend endpoint can land in W7 polish if needed.
 */
import type { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach the iTafakkur team.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-16 text-center">
      <Mail className="mx-auto mb-4 text-gold-dark" size={32} strokeWidth={1.5} />
      <h1 className="font-serif text-brown text-4xl font-medium tracking-tight mb-4">
        Get in touch
      </h1>
      <p className="text-muted text-base mb-8 leading-relaxed">
        Feedback, questions, corrections on Islamic content, bug reports —
        write to us. Every message is read by a real person, usually within
        one business day.
      </p>

      <a
        href="mailto:support.itafakkur@gmail.com?subject=Hello%20from%20iTafakkur"
        className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-gold text-brown text-sm font-semibold hover:bg-gold-dark hover:text-cream transition-colors"
      >
        <Mail size={16} />
        support.itafakkur@gmail.com
      </a>

      <p className="mt-10 text-xs text-muted italic max-w-xs mx-auto">
        Please note: we do not offer personal fatwas or religious rulings.
        For those, please contact your local imam or a qualified scholar.
      </p>
    </div>
  );
}
