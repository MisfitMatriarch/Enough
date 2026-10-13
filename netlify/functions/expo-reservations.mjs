import { getStore } from '@netlify/blobs';
import settings from '../../content/expo.json' with { type: 'json' };
import { makeReservationHandler } from '../lib/reservations.mjs';

export default makeReservationHandler({ settings, getStores(context) {
  const production = context.deploy?.context === 'production';
  // A deploy preview must never read or write the production reservation store.
  const suffix = production ? 'production' : `preview-${context.deploy?.id || 'local'}`;
  return {
    reservations: getStore({ name: `expo-reservations-${suffix}`, consistency: 'strong' }),
    consents: getStore({ name: `expo-consents-${suffix}`, consistency: 'strong' })
  };
} });
export const config = {
  path: '/api/expo-reservations',
  rateLimit: { windowLimit: 20, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};
