import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Creative Agency`;
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

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
        <div
          style={{
            color: "#0001FD",
            display: "flex",
            flexDirection: "column",
            fontSize: "76px",
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 0.72,
          }}
        >
          <span>luit</span>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 500,
              letterSpacing: "0.38em",
              lineHeight: 1,
              marginTop: "22px",
            }}
          >
            studio
          </span>
        </div>
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
          Creative agency crafting distinctive brands and digital experiences.
        </div>
      </div>
    </div>,
    size,
  );
}
