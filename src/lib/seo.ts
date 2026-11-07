import { SITE } from "./site";

const OG_IMAGE = `${SITE.url}/og-image.png`;

/** Standard <head> tags for a page: title, description, canonical URL and share previews. */
export function pageHead({ title, description, path }: { title: string; description: string; path: string }) {
  const url = `${SITE.url}${path === "/" ? "/" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Tells Google the official name, logo, website and contact details of the business. */
export function brandJsonLd() {
  const sameAs = Object.values(SITE.socials).filter(Boolean);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        alternateName: ["Readmi", "ReadmiSolutions", "readmisolutions.com"],
        url: `${SITE.url}/`,
        logo: `${SITE.url}/logo-512.png`,
        email: SITE.email,
        ...(SITE.phone ? { telephone: SITE.phone } : {}),
        slogan: "Powering Your Digital Growth. Built with a Human Touch.",
        description: "Readmi Solutions is a digital marketing agency offering website design, SEO, social media marketing and e-mail marketing.",
        areaServed: "IN",
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        alternateName: ["Readmi", "readmisolutions.com"],
        url: `${SITE.url}/`,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
    ],
  });
}
