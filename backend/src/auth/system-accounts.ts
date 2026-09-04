export const DEMO_EMAIL = 'demo@agromanager.ar';
export const DEMO_EMPRESA_EMAIL = 'demoempresa@agromanager.ar';

const PROTECTED_PRO_EMAILS = new Set([
  DEMO_EMAIL,
  DEMO_EMPRESA_EMAIL,
  'joaquinsabater@agromanagerar.com',
]);

export const isProtectedProAccount = (email: string | null | undefined) =>
  Boolean(email && PROTECTED_PRO_EMAILS.has(email.toLowerCase()));

export const isDemoAccount = (email: string | null | undefined) =>
  Boolean(email && [DEMO_EMAIL, DEMO_EMPRESA_EMAIL].includes(email.toLowerCase()));
