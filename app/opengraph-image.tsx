import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Design & Build Studio in Guwahati, Assam`;
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

const logoDataUrl = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/logo/luit-logo.png"),
).toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#FEFAF6",
        color: "#0B1220",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: "42px",
          width: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og (Satori) requires a plain <img>, not next/image */}
        <img src={logoDataUrl} width={124} height={112} alt="" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "72px",
            fontWeight: 600,
            letterSpacing: "-0.045em",
            lineHeight: 1.02,
            maxWidth: "980px",
          }}
        >
          Design & build studio in Guwahati, Assam — working with clients
          across India and abroad.
        </div>
      </div>
    </div>,
    size,
  );
}
