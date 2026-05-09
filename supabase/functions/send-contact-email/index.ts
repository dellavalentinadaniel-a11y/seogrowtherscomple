
// @ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// @ts-ignore
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { adminEmailTemplate, userConfirmationTemplate } from './templates.ts'

// @ts-ignore
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
// @ts-ignore
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
// @ts-ignore
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record_id, name, email, phone, subject, message } = await req.json()

    // 1. Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    // 2. Fetch the record to ensure it exists and get createdAt
    const { data: submission, error: fetchError } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', record_id)
      .single()

    if (fetchError || !submission) {
      throw new Error('Submission not found')
    }

    // 3. Send email to Admin (info@seogrowthers.com)
    const adminRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'SEO Growthers <notificaciones@seogrowthers.com>',
        to: ['seogrowthers@gmail.com', 'info@seogrowthers.com', 'servicio@seogrowthers.com'],
        subject: `NUEVA CONSULTA: ${subject}`,
        html: adminEmailTemplate(name, email, phone, subject, message, submission.created_at),
      }),
    })

    // 4. Send confirmation email to User
    const userRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'SEO Growthers <info@seogrowthers.com>',
        to: email,
        subject: `Confirmación de contacto: ${subject}`,
        html: userConfirmationTemplate(name, record_id, subject, message),
      }),
    })

    // 5. Update submission status to 'sent'
    await supabase
      .from('contact_submissions')
      .update({ status: 'sent' })
      .eq('id', record_id)

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    const err = error as Error;
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
