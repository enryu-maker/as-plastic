export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://asplastics.in';

export const brand = {
  name: 'A S Plastics',
  alternateNames: ['A. S. Plastics', 'AS Plastics'],
  owner: 'Azharuddin Sheikh',
  phoneNumbers: ['7588133167', '7972630439'] as const,
  landline: '(0253) 4534690',
  email: 'azhar.s1983@gmail.com',
  gstin: '27BLOPS4341C1ZZ',
  address: 'Plot No. 69, Gala No. 394, SICOF MIDC, Satpur, Nashik - 422 007',
  city: 'Nashik',
  state: 'Maharashtra',
  pincode: '422007',
  establishedYear: '2015',
  tagline: 'Tool Room & Moulding Job Works | Nashik',
  description: 'Precision tool room and moulding job works, injection moulding dies, mould bases, and heavy VMC machining services Nashik. Established in 2015.',
  servicesLine: 'All Types of Tool Room, Moulding Job Works & Mould Maintenance',
  whatsappNumber: '917588133167', // Primary business line (Azharuddin Sheikh)
};

export function whatsappUrl(number: string, product?: string) {
  const digits = number.replace(/[^0-9]/g, '');
  if (!/^91[6-9][0-9]{9}$/.test(digits)) return null;
  const message = `Hello A S Plastics, I would like to enquire about ${product || 'your moulds and machining services'}. Please share details and a quotation.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}