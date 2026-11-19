'use client';

import React, { useState } from 'react';
import { siteContent } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { getWhatsAppUrl } from '@/lib/whatsapp';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type FieldErrors = Record<string, string>;

const fieldBaseClassName =
  'w-full px-4 py-3 bg-surface text-foreground border border-line rounded-xl focus:ring-2 focus:ring-brand outline-none placeholder:text-muted-text transition-colors';

export function ContactForm() {
  const {
    fields,
    selectPlaceholder,
    submitLabel,
    successMessage,
    errorMessage,
  } = siteContent.sections.contact.form;
  const whatsappNumber = siteContent.sections.contact.whatsapp.number;

  const [status, setStatus] = useState<FormStatus>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const clearFieldError = (name: string) => {
    if (!fieldErrors[name]) return;
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    setStatus('loading');
    setFieldErrors({});

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const name = data.name ? String(data.name) : '';
    const email = data.email ? String(data.email) : '';
    const phone = data.phone ? String(data.phone) : 'No proporcionado';
    const serviceId = data.service ? String(data.service) : '';
    const serviceLabel =
      siteContent.services.find((s) => s.id === serviceId)?.label ||
      serviceId ||
      'No especificado';
    const message = data.message ? String(data.message) : '';

    const whatsappMessage = `Hola, mi nombre es *${name}*.\nCorreo: ${email}\nTeléfono: ${phone}\nServicio de interés: ${serviceLabel}\nMensaje: ${message}`;
    const whatsappUrl = getWhatsAppUrl(whatsappNumber, whatsappMessage);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        setFieldErrors({});
        form.reset();

        // Abre WhatsApp con el mensaje estructurado de inmediato
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        return;
      }

      if (res.status === 400) {
        const result = await res.json().catch(() => null);
        if (result?.errors && typeof result.errors === 'object') {
          setFieldErrors(result.errors as FieldErrors);
          setStatus('idle');
          return;
        }
      }

      setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5" noValidate>
      <div aria-hidden="true" className="hidden">
        <label htmlFor="honeypot">No llenar este campo</label>
        <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      {fields.map((field) => {
        const errorText = fieldErrors[field.name];
        const errorId = `${field.name}-error`;
        const helperId = `${field.name}-helper`;

        const describedBy =
          [field.helperText ? helperId : null, errorText ? errorId : null]
            .filter(Boolean)
            .join(' ') || undefined;

        const invalidClass = errorText ? 'border-brand' : '';

        return (
          <div key={field.name} className="flex flex-col gap-1.5">
            <label htmlFor={field.name} className="text-sm font-medium text-foreground/90">
              {field.label}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                minLength={field.name === 'message' ? 10 : undefined}
                rows={4}
                aria-invalid={Boolean(errorText) || undefined}
                aria-describedby={describedBy}
                onChange={() => clearFieldError(field.name)}
                className={`${fieldBaseClassName} resize-none ${invalidClass}`}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                required={field.required}
                defaultValue=""
                aria-invalid={Boolean(errorText) || undefined}
                aria-describedby={describedBy}
                onChange={() => clearFieldError(field.name)}
                className={`${fieldBaseClassName} ${invalidClass}`}
              >
                <option value="">
                  {field.placeholder ?? selectPlaceholder}
                </option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                aria-invalid={Boolean(errorText) || undefined}
                aria-describedby={describedBy}
                onChange={() => clearFieldError(field.name)}
                className={`${fieldBaseClassName} ${invalidClass}`}
              />
            )}

            {field.helperText && (
              <p id={helperId} className="text-xs text-muted-text">
                {field.helperText}
              </p>
            )}

            {errorText && (
              <p id={errorId} role="alert" className="text-xs font-medium text-brand">
                {errorText}
              </p>
            )}
          </div>
        );
      })}

      <div aria-live="polite" className="min-h-[24px] text-center text-sm font-medium">
        {status === 'success' && <p className="text-foreground">{successMessage}</p>}
        {status === 'error' && <p className="text-foreground font-bold">{errorMessage}</p>}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          isLoading={status === 'loading'}
          className="w-full"
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}