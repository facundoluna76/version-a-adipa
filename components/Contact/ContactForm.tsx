'use client';

import { useState } from 'react';
import { CheckCircle, Send, Mail, User, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';
import type { ContactFormData, FormErrors } from '@/types';

const INITIAL_DATA: ContactFormData = { name: '', email: '', message: '' };
const INITIAL_ERRORS: FormErrors = {};

function validate(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = 'El nombre es obligatorio.';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  }
  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Ingresa un email válido.';
  }
  if (!data.message.trim()) {
    errors.message = 'El mensaje es obligatorio.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  }
  return errors;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function Field({ id, label, error, icon, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-adipa-dark dark:text-white"
      >
        <span className="text-adipa-purple" aria-hidden="true">{icon}</span>
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1 text-xs text-adipa-red"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase = clsx(
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-adipa-dark',
  'placeholder:text-adipa-gray-400',
  'transition-all duration-200',
  'focus:outline-none focus:ring-2',
  'dark:bg-adipa-gray-900/60 dark:text-white dark:placeholder:text-adipa-gray-500',
);

const inputValid = clsx(
  'border-adipa-gray-200 focus:border-adipa-purple focus:ring-adipa-purple/20',
  'dark:border-adipa-gray-700 dark:focus:border-adipa-purple',
);

const inputError = 'border-adipa-red focus:border-adipa-red focus:ring-adipa-red/20';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_DATA);
  const [errors, setErrors]     = useState<FormErrors>(INITIAL_ERRORS);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first error field
      const firstError = Object.keys(newErrors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    setIsSuccess(true);
    setFormData(INITIAL_DATA);
    setErrors(INITIAL_ERRORS);
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm dark:bg-adipa-gray-900/60"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-adipa-purple-50 dark:bg-adipa-purple-800/30">
          <CheckCircle size={32} className="text-adipa-purple" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-xl font-black text-adipa-dark dark:text-white">
          ¡Mensaje enviado!
        </h3>
        <p className="mb-6 text-adipa-gray-500 dark:text-white">
          Gracias por contactarnos. Nuestro equipo te responderá en menos de 24 horas.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          size="md"
        >
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulario de contacto"
      className="space-y-5"
    >
      {/* Name */}
      <Field
        id="name"
        label="Nombre completo"
        error={errors.name}
        icon={<User size={14} />}
      >
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej. Ana González"
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
          required
          minLength={2}
          className={clsx(inputBase, errors.name ? inputError : inputValid)}
        />
      </Field>

      {/* Email */}
      <Field
        id="email"
        label="Correo electrónico"
        error={errors.email}
        icon={<Mail size={14} />}
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@correo.com"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
          required
          className={clsx(inputBase, errors.email ? inputError : inputValid)}
        />
      </Field>

      {/* Message */}
      <Field
        id="message"
        label="Mensaje"
        error={errors.message}
        icon={<MessageSquare size={14} />}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Cuéntanos cómo podemos ayudarte..."
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          required
          minLength={10}
          className={clsx(
            inputBase,
            'resize-none',
            errors.message ? inputError : inputValid,
          )}
        />
        <p className="mt-1 text-right text-xs text-adipa-gray-400 dark:text-white">
          {formData.message.length}/500
        </p>
      </Field>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isLoading}
        className="mt-2"
      >
        <Send size={16} aria-hidden="true" />
        Enviar mensaje
      </Button>

      <p className="text-center text-xs text-adipa-gray-400 dark:text-white">
        Al enviar, aceptas nuestra{' '}
        <a href="#" className="text-adipa-purple hover:underline">
          Política de Privacidad
        </a>
      </p>
    </form>
  );
}
