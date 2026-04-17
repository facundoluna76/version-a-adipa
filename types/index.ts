export type Modality = 'En Vivo' | 'Online' | 'Presencial';

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorTitle: string;
  category: string;
  modality: Modality;
  startDate: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  duration: string;
  description: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Category {
  id: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
