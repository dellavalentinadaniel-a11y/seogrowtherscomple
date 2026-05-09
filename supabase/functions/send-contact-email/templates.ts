
export const adminEmailTemplate = (
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  createdAt: string
) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: #0a0e27; padding: 30px; text-align: center; }
    .header h1 { color: #00d9ff; margin: 0; font-size: 24px; font-weight: bold; }
    .content { padding: 40px 30px; }
    .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; display: block; }
    .value { font-size: 16px; color: #111; margin-bottom: 20px; font-weight: 500; }
    .message-box { background: #f8fafc; border-left: 4px solid #00d9ff; padding: 20px; margin: 20px 0; border-radius: 4px; }
    .footer { background: #111827; padding: 20px; text-align: center; color: #6b7280; font-size: 12px; }
    .button { display: inline-block; background: #00d9ff; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SEO Growthers</h1>
    </div>
    <div class="content">
      <h2 style="margin-top: 0; color: #111827;">Nuevo Mensaje de Contacto</h2>
      <p style="color: #666;">Has recibido una nueva consulta a través del formulario web.</p>
      
      <div style="margin-top: 30px;">
        <span class="label">Nombre</span>
        <div class="value">${name}</div>

        <span class="label">Email</span>
        <div class="value"><a href="mailto:${email}" style="color: #00d9ff; text-decoration: none;">${email}</a></div>

        <span class="label">Teléfono</span>
        <div class="value">${phone || 'No proporcionado'}</div>

        <span class="label">Asunto</span>
        <div class="value">${subject}</div>

        <span class="label">Mensaje</span>
        <div class="message-box">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <span class="label">Fecha</span>
        <div class="value">${new Date(createdAt).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}</div>
      </div>

      <div style="text-align: center;">
        <a href="https://seogrowthers.com/admin" class="button">Responder en Panel</a>
      </div>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} SEO Growthers. Panel de Administración.</p>
    </div>
  </div>
</body>
</html>
`;

export const userConfirmationTemplate = (
  name: string,
  messageId: string,
  subject: string,
  message: string
) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f9; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { background: #0a0e27; padding: 30px; text-align: center; }
    .header h1 { color: #00d9ff; margin: 0; font-size: 24px; font-weight: bold; }
    .content { padding: 40px 30px; }
    .hero-text { font-size: 20px; color: #111827; font-weight: 600; margin-bottom: 20px; text-align: center; }
    .summary { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0; border: 1px solid #e2e8f0; }
    .footer { background: #111827; padding: 30px; text-align: center; color: #9ca3af; font-size: 14px; }
    .social-links { margin-top: 20px; }
    .social-link { color: #00d9ff; text-decoration: none; margin: 0 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>SEO Growthers</h1>
    </div>
    <div class="content">
      <div class="hero-text">¡Gracias por contactarnos, ${name.split(' ')[0]}!</div>
      <p style="text-align: center; color: #4b5563;">
        Hemos recibido tu mensaje correctamente. Nuestro equipo revisará tu consulta y nos pondremos en contacto contigo en un plazo máximo de <strong>24 horas</strong>.
      </p>

      <div class="summary">
        <h3 style="margin-top: 0; font-size: 16px; color: #111827;">Resumen de tu mensaje:</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 5px;"><strong>Asunto:</strong> ${subject}</p>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 0;"><strong>Referencia:</strong> #${messageId.slice(0, 8)}</p>
      </div>

      <p style="text-align: center; font-size: 14px; color: #64748b;">
        Si necesitas asistencia inmediata, puedes llamarnos al <a href="tel:+34123456789" style="color: #00d9ff; text-decoration: none;">+34 123 456 789</a>.
      </p>
    </div>
    <div class="footer">
      <p>SEO Growthers - Web Development, SEO & Analytics</p>
      <p>Calle Principal 123, Madrid, España</p>
      <div class="social-links">
        <a href="#" class="social-link">LinkedIn</a> •
        <a href="#" class="social-link">Twitter</a> •
        <a href="#" class="social-link">Instagram</a>
      </div>
      <p style="font-size: 12px; margin-top: 20px; opacity: 0.6;">&copy; ${new Date().getFullYear()} SEO Growthers. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
`;
