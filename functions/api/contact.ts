/**
 * Cloudflare Pages Function: /functions/api/contact.ts
 * handles contact form submissions and sends emails via Resend API
 */

interface Env {
  RESEND_API_KEY: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const formData = await request.json() as ContactFormData;
    const { name, email, phone, company, service, message } = formData;

    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: { message: 'Resend API key is not configured' } }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Send email via Resend API using fetch
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'WOW DataBiz <onboarding@resend.dev>',
        to: ['wow3d16@naver.com'],
        subject: `[문의접수] ${name}님의 문의가 접수되었습니다.`,
        html: `
          <h2>신규 문의 접수 내역</h2>
          <p><strong>이름:</strong> ${name}</p>
          <p><strong>이메일:</strong> ${email}</p>
          <p><strong>연락처:</strong> ${phone}</p>
          <p><strong>회사명:</strong> ${company || '없음'}</p>
          <p><strong>관심 서비스:</strong> ${service || '없음'}</p>
          <p><strong>문의 내용:</strong></p>
          <div style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
          <br />
          <hr />
          <p style="font-size: 12px; color: #666;">본 메일은 WOW DataBiz 홈페이지 문의하기 폼을 통해 자동 발송되었습니다.</p>
        `
      })
    });

    const result = await resendResponse.json();

    if (!resendResponse.ok) {
      return new Response(JSON.stringify({ error: result }), {
        status: resendResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ data: result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: { message } }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
};
