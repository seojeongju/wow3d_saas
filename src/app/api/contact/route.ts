import { Resend } from 'resend';



interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, company, service, message } = await req.json() as ContactFormData;

    const { data, error } = await resend.emails.send({
      from: 'WOW DataBiz <onboarding@resend.dev>', // Should be a verified domain in production
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
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error('API Route Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
