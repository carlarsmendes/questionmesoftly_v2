import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#1F6F8B",
          color: "#F7F4EF",
          fontFamily: "Avenir Next, Avenir, sans-serif",
        }}
      >
        <div style={{ fontSize: 34, opacity: 0.9 }}>Question Me Softly</div>
        <div style={{ fontSize: 70, lineHeight: 1.08, marginTop: 24, fontWeight: 600 }}>
          What happens if we ask better questions?
        </div>
      </div>
    ),
    size,
  );
}
