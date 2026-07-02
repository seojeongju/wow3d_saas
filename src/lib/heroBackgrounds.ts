/** 히어로 섹션 배경 이미지 경로 (은은한 오버레이와 함께 사용) */
export const heroBackgrounds = {
  default: '/images/hero-bg/company.jpg',
  company: '/images/hero-bg/company.jpg',
  contact: '/images/hero-bg/contact.jpg',
  legal: '/images/hero-bg/legal.jpg',
  freeToolsLight: '/images/hero-bg/free-tools-light.jpg',
  retail: '/images/wow-smart-manager-dashboard.png',
  academy: '/images/lms-dashboard-hero.png',
  cbt: '/images/wow-cbt-hero.png',
  printing: '/images/hero-bg/printing.jpg',
  services: '/images/hero-bg/services.jpg',
  pricing: '/images/hero-bg/services.jpg',
  govSupport: '/images/gov/smart_manufacturing.jpg',
  education: '/images/hero-bg/education.jpg',
  hardware: '/images/hero-bg/services.jpg',
  printer: '/images/hero-bg/printing.jpg',
  hologram: '/images/hero-bg/hologram.jpg',
  achievements: '/images/gov/smart_factory.png',
  history: '/images/gov/smart_manufacturing.jpg',
  technology: '/images/ai-quote-system-hero.png',
  certifications: '/images/gov/smart_service.png',
  locations: '/images/ncs-curriculum.png',
  archive: '/images/hero-bg/legal.jpg',
  toolsDark: '/images/ai-quote-system-hero.png',
} as const;

export type HeroBgKey = keyof typeof heroBackgrounds;

const heroBgBase = {
  backgroundSize: 'cover' as const,
  backgroundPosition: 'center' as const,
  backgroundRepeat: 'no-repeat' as const,
};

export function darkHeroBg(image: string) {
  return {
    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.84) 55%, rgba(15, 23, 42, 0.88) 100%), url('${image}')`,
    ...heroBgBase,
  };
}

export function purpleHeroBg(image: string) {
  return {
    backgroundImage: `linear-gradient(135deg, rgba(107, 33, 168, 0.88) 0%, rgba(124, 58, 237, 0.84) 100%), url('${image}')`,
    ...heroBgBase,
  };
}

export function indigoHeroBg(image: string) {
  return {
    backgroundImage: `linear-gradient(135deg, rgba(49, 46, 129, 0.9) 0%, rgba(67, 56, 202, 0.86) 100%), url('${image}')`,
    ...heroBgBase,
  };
}

export function navyHeroBg(image: string) {
  return {
    backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.88) 100%), url('${image}')`,
    ...heroBgBase,
  };
}

export function hardwareHeroBg(image: string) {
  return {
    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(30, 58, 95, 0.85) 45%, rgba(30, 27, 75, 0.88) 100%), url('${image}')`,
    ...heroBgBase,
  };
}

export function lightHeroBg(image: string) {
  return {
    backgroundImage: `linear-gradient(180deg, rgba(248, 250, 252, 0.94) 0%, rgba(255, 255, 255, 0.9) 65%), url('${image}')`,
    ...heroBgBase,
  };
}

export function lightSubHeroBg(image: string) {
  return {
    backgroundImage: `linear-gradient(180deg, rgba(248, 250, 252, 0.96) 0%, rgba(255, 255, 255, 0.92) 100%), url('${image}')`,
    ...heroBgBase,
  };
}

export function darkSubHeroBg(image: string) {
  return {
    backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.92) 0%, rgba(30, 41, 59, 0.88) 100%), url('${image}')`,
    ...heroBgBase,
  };
}

export function legalHeaderBg(image: string) {
  return {
    backgroundImage: `linear-gradient(180deg, rgba(248, 250, 252, 0.97) 0%, rgba(241, 245, 249, 0.95) 100%), url('${image}')`,
    ...heroBgBase,
  };
}

export function getHeroBgStyle(key: HeroBgKey, variant: 'dark' | 'light' | 'purple' | 'indigo' | 'navy' | 'hardware' | 'legal' = 'dark') {
  const image = heroBackgrounds[key];
  switch (variant) {
    case 'light':
      return lightHeroBg(image);
    case 'purple':
      return purpleHeroBg(image);
    case 'indigo':
      return indigoHeroBg(image);
    case 'navy':
      return navyHeroBg(image);
    case 'hardware':
      return hardwareHeroBg(image);
    case 'legal':
      return legalHeaderBg(image);
    default:
      return darkHeroBg(image);
  }
}
