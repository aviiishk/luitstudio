export type ContactFieldType = "email" | "select" | "text" | "textarea";

export interface ContactOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ContactField {
  id: string;
  name: string;
  label: string;
  type: ContactFieldType;
  placeholder?: string;
  autocomplete?: string;
  required?: boolean;
  options?: readonly ContactOption[];
}

export type SocialPlatform =
  | "behance"
  | "dribbble"
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin"
  | "x";

export interface SocialLink {
  label: string;
  href: string;
  platform: SocialPlatform;
}

export interface ContactInformation {
  email: string;
}

export interface ContactDetails extends ContactInformation {
  socialLinks: readonly SocialLink[];
}

export interface ContactContent {
  title: string;
  emphasizedTitle: string;
  fields: readonly ContactField[];
  submitLabel: string;
  details: ContactDetails;
}
