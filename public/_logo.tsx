import React from "react";
import { Image } from "@chakra-ui/react"
import Link from "next/link";

export function Logo() {
  const fillColor = "#2a6f97";

  return (
    <div style={{ width: 125, padding: 6, cursor: "pointer" }}>
      <Link href="/home" passHref>
        <Image
          src="/iReviewer-Logo.svg"
          alt="Random unsplash image"
        />
      </Link>
    </div>
  );
}
