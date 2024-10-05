import { Product, WithContext } from "schema-dts";

export type JsonLd = {
  name: string,
  description: string,
};

const base_url = process.env.BASE_URL;
const logo_url = `${base_url}/logo.png`;

export function JsonLdScript({ data }: { data: JsonLd}) {
  const { name, description } = data;

  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: logo_url,
    description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
