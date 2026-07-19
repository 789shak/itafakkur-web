/**
 * Default OG image — generated on-the-fly via next/og.
 *
 * Renders a branded 1200x630 image for social share previews. Applied
 * automatically to routes that don't provide their own opengraph-image.
 *
 * If we want per-route customization (e.g., verse-specific images for
 * each /quran/[surah] page), add opengraph-image.tsx inside those
 * route folders.
 */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'iTafakkur — Your daily Muslim companion';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, #F8F5EF 0%, #EFE8DD 50%, #E5D7B8 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Gold accent dot */}
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: '#D4AF37',
            marginBottom: '32px',
            boxShadow: '0 4px 24px rgba(212, 175, 55, 0.4)',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontFamily: 'serif',
            fontSize: '150px',
            fontWeight: 500,
            color: '#3A2812',
            letterSpacing: '-4px',
            lineHeight: 1,
            marginBottom: '24px',
          }}
        >
          iTafakkur
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: 'sans-serif',
            fontSize: '32px',
            color: '#5C4A32',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.35,
          }}
        >
          Your daily Muslim companion. Prayer times, the Qur&rsquo;an,
          and space to reflect.
        </div>

        {/* Bottom label */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            fontSize: '20px',
            color: '#8C7A62',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          Free · Ad-free · Forever
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: '20px',
            color: '#8C7A62',
          }}
        >
          itafakkur.com
        </div>
      </div>
    ),
    { ...size },
  );
}
