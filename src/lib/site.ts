// One place for contact details and links. Edit here; the whole site updates.
// Leave a value empty ("") to hide it.
export const SITE = {
  name: "Readmi Solutions",
  url: "https://readmisolutions.com",
  email: "info@readmisolutions.com",
  phone: "+91 7093042999", 
  hours: "Mon – Sat · 10:00 – 19:00 IST", // confirm your real working hours
  socials: {
    instagram: "", // e.g. "https://www.instagram.com/yourhandle"
    twitter: "", // e.g. "https://x.com/yourhandle"
    linkedin: "", // e.g. "https://www.linkedin.com/company/yourpage"
    youtube: "", // e.g. "https://www.youtube.com/@yourchannel"
  },
};

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
