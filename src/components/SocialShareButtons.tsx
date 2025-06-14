import React from "react";
import { SocialIcon } from "react-social-icons";

type ScoreShareDetails = {
  topCandidate: string;
  /**
   * The percentage of the quiz that matches the top candidate.
   * This is a number between 0 and 100.
   */
  matchScore: number;
};

export const SocialButton: React.FC<{
  url: string;
  ariaLabel?: string;
  black?: boolean;
}> = ({ url, ariaLabel, black }) => (
  <SocialIcon
    className="social-button is-icon p-0"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel || "Share this link"}
    bgColor={black ? "#000000" : undefined}
    style={{
      width: "32px",
      height: "32px",
    }}
    url={url}
  />
);

const getShareText = (
  platform: "bluesky" | "whatsapp" | "threads" | "email",
  results?: ScoreShareDetails
) => {
  const outlierHandle =
    platform === "bluesky" ? "@outliermedia.org" : "Outlier Media";
  return !!results
    ? `I'm a ${results.matchScore}%25 match with ${results.topCandidate} on the Meet Your Mayor quiz! Find your own match, powered by ${outlierHandle}:`
    : `Check out the Meet Your Mayor quiz from ${outlierHandle}!`;
};

export const SocialShareButtons: React.FC<{
  /**
   * Details on the matching score with the top candidate — only present if the user has completed the quiz.
   */
  results?: ScoreShareDetails;
}> = ({ results }) => {
  const shareUrl = `${process.env.GATSBY_DOMAIN}${process.env.GATSBY_SLUG}`;
  return (
    <>
      <SocialButton
        url={`https://bsky.app/intent/compose?text=${getShareText(
          "bluesky",
          results
        )} ${shareUrl}`}
        ariaLabel="Share on Bluesky"
      />
      <SocialButton
        url={`https://threads.net/intent/post?text=${getShareText(
          "threads",
          results
        )} ${shareUrl}`}
        ariaLabel="Share on Threads"
      />
      <SocialButton
        url={`https://wa.me/?text=${getShareText(
          "whatsapp",
          results
        )} ${shareUrl}`}
        ariaLabel="Share on Whatsapp"
      />
      <SocialButton
        url={`mailto:?subject=Meet Your Mayor: 2025&body=${getShareText(
          "email",
          results
        )} ${shareUrl}`}
        ariaLabel="Share via Email"
      />
    </>
  );
};
