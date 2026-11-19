import { NextResponse } from 'next/server';
import { validateContactForm } from '@/lib/contact-validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Comprobación de honeypot: si un bot llena este campo, ignoramos pero devolvemos 200 OK
    if (typeof body?.honeypot === 'string' && body.honeypot.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const { isValid, errors } = validateContactForm(body);

    if (!isValid) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[DEV] Contacto validado:', {
        name: body.name,
        email: body.email,
        phone: body.phone,
        service: body.service,
        message: body.message,
      });
    }

    // TODO: Integrar aquí el servicio de correo (ej. Resend, SendGrid)
    // Usar variables de entorno para las credenciales seguras
    // const apiKey = process.env.EMAIL_API_KEY;
    // await sendEmail({ to: process.env.CONTACT_EMAIL, subject: 'Nuevo Contacto', body });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'No se pudo procesar la solicitud.' },
      { status: 500 }
    );
  }
}