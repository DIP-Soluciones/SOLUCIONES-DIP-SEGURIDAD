export interface ContactData {
  name?: string;
  email?: string;
  message?: string;
  [key: string]: any;
}

export function validateContactForm(data: ContactData): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.name = "El nombre es obligatorio y debe tener al menos 2 caracteres.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
    errors.email = "Debes ingresar un correo electrónico válido.";
  }

  // Validación de mensaje (flexible en caso de que se agregue el campo a siteContent)
  if (data.message !== undefined && (typeof data.message !== 'string' || data.message.trim().length < 10)) {
    errors.message = "El mensaje debe tener al menos 10 caracteres.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}