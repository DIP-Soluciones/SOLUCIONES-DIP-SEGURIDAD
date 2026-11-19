export function getWhatsAppUrl(phone: string, message: string): string {
  // Limpia el número dejando solo los dígitos
  const cleanPhone = phone.replace(/\D/g, "");
  
  // Codifica el mensaje para que sea válido en una URL (espacios, tildes, etc.)
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}