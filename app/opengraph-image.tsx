import { ImageResponse } from 'next/og';
import { profile, hero } from '@/data/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#fafbfd',
          backgroundImage:
            'linear-gradient(to right, rgba(29,78,216,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(29,78,216,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              borderRadius: 10,
              backgroundColor: '#1d4ed8',
              color: '#fff',
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ fontSize: 24, color: '#0b1220', fontWeight: 600 }}>{profile.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 920 }}>
          <div style={{ fontSize: 22, color: '#1d4ed8', fontWeight: 600, letterSpacing: 1 }}>
            {profile.headline.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: 54,
              color: '#0b1220',
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {hero.headline}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, color: '#5b6b82' }}>
          <div>{profile.location}</div>
          <div>olusegunibraheem.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
