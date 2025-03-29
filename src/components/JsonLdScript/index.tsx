import { Product, WithContext } from "schema-dts";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type JsonLd = {
  name: string,
  description: string,
};

export function JsonLdScript({ data }: { data: JsonLd}) {
  const { name, description } = data;
  const logoUrl = `${BASE_URL}/logo.png`;
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: logoUrl,
    description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
