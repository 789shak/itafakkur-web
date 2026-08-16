/**
 * /dmca — copyright / DMCA notice-and-takedown policy.
 *
 * iTafakkur doesn't currently have a public user-generated-content
 * surface (journal, bookmarks, and chat are all private to the
 * account), but this policy is kept in place defensively — it's what
 * gives the standard 17 U.S.C. §512(c) safe-harbor protection if any
 * dispute ever arises, and it's the expected trust signal for an app
 * that quotes/reproduces third-party-attributed translations and
 * scholarly sources.
 *
 * IMPORTANT — before this is fully live/compliant:
 * 1. Replace the [MAILING ADDRESS] placeholder below with a real
 *    street address (P.O. boxes are not accepted by the Copyright
 *    Office without prior approval).
 * 2. Separately register that same agent contact info at
 *    https://www.copyright.gov/dmca-directory/ (~$6 fee, renews every
 *    3 years). This is a government filing tied to Alfie's identity —
 *    Claude does not and should not file this on his behalf. The page
 *    below is the *public-facing* policy; registration is what
 *    actually grants the safe-harbor protection.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Copyright / DMCA Policy',
  description: 'iTafakkur copyright and DMCA notice-and-takedown policy.',
};

const EFFECTIVE = 'August 16, 2026';
const SUPPORT_EMAIL = 'support.itafakkur@gmail.com';

export default function DmcaPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-10">
        <h1 className="font-serif text-brown text-4xl font-medium tracking-tight mb-2">
          Copyright / DMCA Policy
        </h1>
        <p className="text-muted text-sm">Effective {EFFECTIVE}</p>
      </header>

      <div className="prose prose-brown max-w-none space-y-6 text-brown leading-relaxed">
        <p>
          iTafakkur respects the intellectual property rights of others and
          expects users of the service to do the same. This policy explains
          how to report claimed copyright infringement and how we respond,
          consistent with the Digital Millennium Copyright Act (17 U.S.C. §
          512).
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">
          Reporting copyright infringement
        </h2>
        <p>
          If you believe material available through iTafakkur infringes a
          copyright you own or control, send a written notice to our
          designated agent (below) that includes all of the following:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-base">
          <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.</li>
          <li>Identification of the copyrighted work claimed to have been infringed.</li>
          <li>Identification of the specific material claimed to be infringing, and information reasonably sufficient to let us locate it (e.g. a screen, feature, or URL).</li>
          <li>Your contact information — name, mailing address, telephone number, and email address.</li>
          <li>A statement that you have a good-faith belief that the use is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement, made under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorized to act on their behalf.</li>
        </ul>
        <p>
          Notices missing any of these elements may not be actionable under
          the DMCA. Upon receiving a valid notice, we will remove or disable
          access to the identified material and make a good-faith effort to
          notify the affected user.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">
          Designated Agent
        </h2>
        <p>
          Copyright infringement notices should be sent to our designated
          agent:
        </p>
        <ul className="list-none pl-0 space-y-1 text-base">
          <li><strong>Copyright Agent, iTafakkur</strong></li>
          <li>
            Email:{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-gold-dark underline">
              {SUPPORT_EMAIL}
            </a>
          </li>
          <li>Mailing address: [MAILING ADDRESS]</li>
        </ul>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">
          Counter-notification
        </h2>
        <p>
          If material you submitted was removed or disabled by mistake or
          misidentification, you may send a counter-notice to the same
          address that includes:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-base">
          <li>Your physical or electronic signature.</li>
          <li>Identification of the material removed and its location before removal.</li>
          <li>A statement, under penalty of perjury, that you have a good-faith belief the material was removed as a result of mistake or misidentification.</li>
          <li>Your name, address, and telephone number, and a statement consenting to the jurisdiction of the federal court in your district (or, if outside the U.S., a jurisdiction in which iTafakkur may be found) and that you will accept service of process from the person who filed the original notice.</li>
        </ul>
        <p>
          On receiving a valid counter-notice, we may restore the material
          within 10&ndash;14 business days unless the original complainant
          notifies us they have filed a court action.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">
          Repeat infringers
        </h2>
        <p>
          We may, in appropriate circumstances and at our discretion, disable
          or terminate the accounts of users who are repeat infringers.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">
          Content on iTafakkur
        </h2>
        <p>
          Journal entries, bookmarks, and chat history in the iTafakkur app
          are private to your account and are not published or shared with
          other users. Qur&rsquo;anic text, translations, and hadith are
          reproduced from established, attributed sources as described in
          our{' '}
          <a href="/terms" className="text-gold-dark underline">
            Terms of Use
          </a>
          .
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">
          False claims
        </h2>
        <p>
          Under Section 512(f) of the DMCA, anyone who knowingly makes a
          material misrepresentation in a takedown or counter-notice may be
          liable for damages. Please make sure you have a good-faith basis
          before submitting a notice.
        </p>

        <h2 className="font-serif text-brown text-xl font-medium mt-8">Contact</h2>
        <p>
          Copyright questions:{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-gold-dark underline">
            {SUPPORT_EMAIL}
          </a>
          . We respond within one business day.
        </p>
      </div>
    </div>
  );
}
