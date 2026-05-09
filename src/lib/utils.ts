import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from 'dompurify';
import { format, parseISO } from 'date-fns';
import es from 'date-fns/locale/es';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Remove duplicate hyphens
}

export function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html);
}

export function formatDate(dateString: string | null | undefined): string {
    if (!dateString) return '';
    // Usar parseISO para un manejo de fechas más robusto que `new Date()`.
    // `new Date(string)` puede tener comportamientos inconsistentes entre navegadores.
    const date = parseISO(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function truncateText(text: string, length: number = 100): string {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}
