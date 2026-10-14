import { describe, it } from 'node:test';
import assert from 'node:assert';
import { whatsappUrl } from '../lib/brand.ts';

describe('WhatsApp enquiry destination', () => {
  it('does not send customers to the incomplete country code supplied by the owner', () => {
    assert.strictEqual(whatsappUrl('+91'), null);
  });

  it('builds an enquiry with the selected product for a complete Indian number', () => {
    const url = whatsappUrl('+91 98765 43210', 'Cap moulds');
    assert.ok(url?.startsWith('https://wa.me/919876543210?text='));
    assert.ok(decodeURIComponent(url || '').includes('Cap moulds'));
  });
});
