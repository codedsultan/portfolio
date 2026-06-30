import type { LucideIcon } from 'lucide-react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/codedsultan',
    icon: Github,
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/codesultan',
    icon: Linkedin,
  },
  {
    platform: 'email',
    label: 'Email',
    url: 'mailto:codesultan369@gmail.com',
    icon: Mail,
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/15879719955',
    icon: MessageCircle,
  },
];
