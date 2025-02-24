import { Product, WithContext } from "schema-dts";

export type JsonLd = {
  name: string,
  description: string,
};

const BASE_URL = process.env.BASE_URL;

export function JsonLdScript({ data }: { data: JsonLd}) {
  const { name, description } = data;
  const logo_url = `${BASE_URL}/logo.png`;

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
