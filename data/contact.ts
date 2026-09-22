import { services } from "@/components/sections/services/service-data";
import { contactDetails } from "@/config/contact";
import { contactSocialLinks } from "@/config/social";
import type { ContactContent } from "@/types/contact";

export const contactContent = {
  title: "We'd love to hear from you — get in",
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
        { label: "Select a service", value: "", disabled: true },
        ...services.map((service) => ({
          label: service.title,
          value: service.id,
        })),
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
        { label: "Under $1,000", value: "under-1000" },
        { label: "$1,000 – $5,000", value: "1000-5000" },
        { label: "$5,000 – $15,000", value: "5000-15000" },
        { label: "$15,000+", value: "15000-plus" },
        { label: "Not sure yet", value: "not-sure" },
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
