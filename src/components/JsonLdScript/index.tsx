"use client";

import { Product, WithContext } from "schema-dts";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export type JsonLd = {
  name: string,
  description: string,
};

type Props = {
  data: JsonLd;
};

export function JsonLdScript({ data }: Props) {
  const { name, description } = data;
  const image = `${BASE_URL}/logo.png`;
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image,
    description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
