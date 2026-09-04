const WHATSAPP_BUSINESS_URL = 'https://wa.me/message/WOZD5LXERFNUE1';

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16.02 3C8.84 3 3 8.84 3 16.02c0 2.3.6 4.54 1.75 6.51L3 29l6.66-1.71A12.96 12.96 0 0 0 16.02 29C23.2 29 29 23.18 29 16.02 29 8.84 23.2 3 16.02 3Zm0 23.65c-2.04 0-4.03-.55-5.76-1.6l-.41-.24-3.95 1.02 1.05-3.85-.27-.4a10.62 10.62 0 1 1 9.34 5.07Zm5.83-7.97c-.32-.16-1.91-.95-2.2-1.05-.3-.1-.52-.16-.74.16-.22.32-.85 1.05-1.04 1.27-.19.21-.39.24-.71.08-.32-.16-1.36-.5-2.58-1.6-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.4-.3.32-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.37c.16.21 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.49.21 2.05.13.63-.1 1.91-.78 2.18-1.54.27-.76.27-1.41.19-1.54-.08-.13-.3-.21-.63-.38Z" />
    </svg>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_BUSINESS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp Business de AgroManager AR"
      title="Escribinos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1fbd5a] focus:outline-none focus:ring-4 focus:ring-green-200"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}

export { WHATSAPP_BUSINESS_URL };
