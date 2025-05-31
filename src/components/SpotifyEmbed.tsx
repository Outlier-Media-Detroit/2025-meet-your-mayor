import React, { type HTMLAttributes } from "react";

interface SpotifyEmbedProps extends HTMLAttributes<HTMLIFrameElement> {
  [key: string]: any;

  title: string;
  id: string;
  width?: number | string;
  height?: number | string;
}

export const SpotifyEmbed = ({
  title,
  id,
  width = "100%",
  height = 80,
  ...props
}: SpotifyEmbedProps) => (
  <iframe
    title={title}
    src={`https://open.spotify.com/embed/track/${id}?theme=0`}
    height={height}
    width={width}
    style={{ borderRadius: "12px" }}
    allowFullScreen
    allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    {...props}
  />
);
