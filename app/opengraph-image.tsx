import { ImageResponse } from 'next/og';
import { brand } from '@/lib/brand';

export const alt = `${brand.name} — injection moulds, dies and VMC machining in Nashik`;
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
          justifyContent: 'center',
          padding: '80px',
          background: '#101622',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, color: '#d95829', letterSpacing: 4 }}>{`EST. ${brand.establishedYear} · NASHIK`}</div>
        <div style={{ fontSize: 96, fontWeight: 800, marginTop: 20 }}>A S PLASTICS</div>
        <div style={{ fontSize: 40, marginTop: 24, color: '#cbd5e1' }}>
          Injection Moulds · Plastic Dies · Mould Bases · VMC Machining
        </div>
        <div style={{ fontSize: 28, marginTop: 48, color: '#94a3b8' }}>
          {`SICOF, Satpur MIDC, Nashik · +91 ${brand.phoneNumbers[0]}`}
        </div>
      </div>
    ),
    size
  );
}
