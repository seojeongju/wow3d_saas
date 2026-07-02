/** 사이트 공통 연락처 (이메일·전화) */
export const siteContact = {
  phones: {
    seoul: '02-3144-3137',
    gumi: '054-464-3137',
  },
  emails: ['3dcookiehd@naver.com', 'wow3d16@naver.com'] as const,
  /** 문의 폼·EmailJS 수신 주소 */
  inquiryEmail: 'wow3d16@naver.com',
} as const;

export function formatEmailsForDisplay(separator = ' / ') {
  return siteContact.emails.join(separator);
}
