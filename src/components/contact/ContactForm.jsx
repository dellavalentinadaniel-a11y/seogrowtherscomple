
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website_url: '', // Honeypot
    privacy: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = "El nombre debe tener al menos 2 caracteres.";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido.";
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
       newErrors.phone = "Formato de teléfono inválido.";
    }
    if (!formData.subject || formData.subject.length < 5) newErrors.subject = "Selecciona un asunto válido.";
    if (!formData.message || formData.message.length < 10) newErrors.message = "El mensaje debe tener al menos 10 caracteres.";
    if (!formData.privacy) newErrors.privacy = "Debes aceptar la política de privacidad.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // Honeypot check
    if (formData.website_url) {
        setSubmitStatus('success');
        return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // 1. Insert into Supabase (Pending state)
      const { data: insertData, error: insertError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: 'pending',
          user_agent: navigator.userAgent
        }])
        .select()
        .single();

      if (insertError) throw new Error("Error al guardar el mensaje. Inténtalo de nuevo.");

      // 2. Call Edge Function
      const { data: funcData, error: funcError } = await supabase.functions.invoke('send-contact-email', {
        body: { 
            record_id: insertData.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message,
            website_url: formData.website_url
        }
      });

      if (funcError) throw new Error(funcError.message || "Error al procesar el envío.");
      if (funcData && !funcData.success) throw new Error(funcData.error || "Error desconocido del servidor.");

      // Success
      setSubmitStatus('success');
      toast({
        title: "¡Mensaje enviado!",
        description: "Revisa tu email de confirmación. Te responderemos pronto.",
        className: "bg-green-600 border-none text-white"
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website_url: '',
        privacy: false
      });

    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
      const msg = err.message.includes("Demasiados mensajes") 
        ? "Demasiados mensajes. Intenta de nuevo más tarde." 
        : err.message || "Hubo un problema. Inténtalo de nuevo.";
      
      setErrorMessage(msg);
      toast({
        title: "Error al enviar",
        description: msg,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const retry = () => {
    setSubmitStatus(null);
    setErrorMessage('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-slate-900/80 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-container via-secondary-container to-tertiary-container"></div>
      
      <h2 className="font-headline text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary-container">rocket_launch</span>
        Formulario de Consulta
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Honeypot Field - Hidden */}
        <input 
            type="text" 
            name="website_url" 
            value={formData.website_url}
            onChange={(e) => handleChange('website_url', e.target.value)}
            className="hidden" 
            autoComplete="off"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 group">
            <Label htmlFor="name" className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/70 ml-1">Identidad_ID <span className="text-red-500">*</span></Label>
            <Input 
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-6 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Nombre completo o alias"
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="email" className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/70 ml-1">Enlace_Protocolo <span className="text-red-500">*</span></Label>
            <Input 
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-6 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body ${errors.email ? 'border-red-500' : ''}`}
              placeholder="correo@neuronal.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2 group">
            <Label htmlFor="phone" className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/70 ml-1">Frecuencia_Tel <span className="text-xs text-gray-500 normal-case tracking-normal">(Opcional)</span></Label>
            <Input 
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-6 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="+34 600 000 000"
              disabled={isSubmitting}
            />
             {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone}</p>}
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="subject" className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/70 ml-1">Vector_Motivo <span className="text-red-500">*</span></Label>
            <Select 
              value={formData.subject} 
              onValueChange={(val) => handleChange('subject', val)}
              disabled={isSubmitting}
            >
              <SelectTrigger className={`bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-6 text-on-surface focus:ring-1 focus:ring-primary-container outline-none transition-all font-body ${errors.subject ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Selecciona un vector" />
              </SelectTrigger>
              <SelectContent className="bg-surface-container-low border border-white/10 text-on-surface">
                <SelectItem value="Desarrollo de Arquitectura">Desarrollo de Arquitectura</SelectItem>
                <SelectItem value="Consultoría de Vibe Coding">Consultoría de Vibe Coding</SelectItem>
                <SelectItem value="Expansión de Capacidad Neural">Expansión de Capacidad Neural</SelectItem>
                <SelectItem value="Error en el Sistema">Error en el Sistema</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
              </SelectContent>
            </Select>
            {errors.subject && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.subject}</p>}
          </div>
        </div>

        <div className="space-y-2 group">
          <Label htmlFor="message" className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/70 ml-1">Carga_Mensaje <span className="text-red-500">*</span></Label>
          <Textarea 
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all font-body min-h-[150px] resize-none ${errors.message ? 'border-red-500' : ''}`}
            placeholder="Escribe tu consulta aquí..."
            disabled={isSubmitting}
          />
          {errors.message && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.message}</p>}
        </div>

        <div className="flex items-start gap-3">
          <Checkbox 
            id="privacy" 
            checked={formData.privacy}
            onCheckedChange={(checked) => handleChange('privacy', checked)}
            disabled={isSubmitting}
            className={`border-outline-variant/50 data-[state=checked]:bg-primary-container data-[state=checked]:border-primary-container ${errors.privacy ? 'border-red-500' : ''}`}
          />
          <Label htmlFor="privacy" className="text-xs text-on-surface-variant leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Acepto los <a href="/terms-of-service" className="text-primary-container hover:underline">términos de servicio</a> y la <a href="/privacy-policy" className="text-primary-container hover:underline">política de privacidad</a>.
          </Label>
        </div>
        {errors.privacy && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.privacy}</p>}

        {submitStatus === 'error' && (
            <div className="p-4 bg-error-container/20 border border-error-container/50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-error text-xs font-bold">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                </div>
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={retry}
                    className="h-8 text-error hover:text-white hover:bg-error-container/40"
                >
                    <RefreshCcw size={14} className="mr-1" /> Reintentar
                </Button>
            </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting || submitStatus === 'success'}
          className={`group relative w-full md:w-auto px-10 py-5 rounded-2xl font-headline font-bold text-xs uppercase tracking-[0.3em] overflow-hidden transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${
            submitStatus === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-primary-container text-on-primary-container hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]'
          }`}
        >
          <div className="relative z-10 flex items-center justify-center gap-3">
            {isSubmitting ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> PROCESANDO...</>
            ) : submitStatus === 'success' ? (
              <><CheckCircle2 className="h-4 w-4" /> TRANSMITIDO</>
            ) : (
              <>
                <span>Transmitir Intento</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
              </>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
