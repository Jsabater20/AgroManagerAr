export const DEMO_EMAIL = 'demo@agromanager.ar';

const PROTECTED_PRO_EMAILS = new Set([
  DEMO_EMAIL,
  'joaquinsabater@agromanagerar.com',
]);

export const isProtectedProAccount = (email: string | null | undefined) =>
  Boolean(email && PROTECTED_PRO_EMAILS.has(email.toLowerCase()));
