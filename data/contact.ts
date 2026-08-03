import { contactDetails } from "@/config/contact";
import { contactSocialLinks } from "@/config/social";
import type { ContactContent } from "@/types/contact";

export const contactContent = {
  title: "Love to hear from you, Get in",
  emphasizedTitle: "touch",
  submitLabel: "Let’s Collaborate",
  fields: [
    {
      id: "name",
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "Enter your name",
      autocomplete: "name",
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Your Email",
      type: "email",
      placeholder: "Enter your email",
      autocomplete: "email",
      required: true,
    },
    {
      id: "interest",
      name: "interest",
      label: "What are you interested in?",
      type: "select",
      required: true,
      options: [
        { label: "Design & Branding", value: "design-branding" },
        { label: "Ecommerce", value: "ecommerce" },
        { label: "Specialist", value: "specialist" },
      ],
    },
    {
      id: "budget",
      name: "budget",
      label: "Project budget",
      type: "select",
      required: true,
      options: [
        { label: "Select your budget", value: "", disabled: true },
        { label: "$10,000", value: "10000" },
        { label: "$50,500", value: "50500" },
      ],
    },
    {
      id: "message",
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
    },
  ],
  details: {
    ...contactDetails,
    socialLinks: contactSocialLinks,
  },
} as const satisfies ContactContent;
