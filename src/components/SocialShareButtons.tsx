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
  if (!results) {
    if (platform === "bluesky") {
      return "Having trouble sorting through Detroit's crowded mayoral race? @outliermedia.org got you.%0A%0ATake their Meet Your Mayor quiz to find out which candidate matches your priorities. go.outliermedia.org/mayor-quiz #DetroitMayorMatch";
    } else if (platform === "threads") {
      return "There are 11+ candidates in the Detroit mayoral primary. You can only vote for one.%0A%0A@media_outlier made a quiz to help you find out which candidates share your values. Take it here: go.outliermedia.org/mayor-quiz #DetroitMayorMatch";
    } else {
      return "Having trouble sorting through Detroit's crowded mayoral race? Take Outlier Media's Meet Your Mayor quiz to find out which candidates share your values: go.outliermedia.org/mayor-quiz";
    }
  } else {
    if (platform === "bluesky") {
      return `I took the Detroit Meet Your Mayor quiz, and guess what? I'm a ${results.matchScore}%25 match with ${results.topCandidate}!%0A%0AFind your mayoral match with this quiz by @outliermedia.org: go.outliermedia.org/mayor-quiz #DetroitMayorMatch`;
    } else if (platform === "threads") {
      return `I'm a ${results.matchScore}%25 match with ${results.topCandidate}! Find your match for Detroit mayor with the Meet Your Mayor quiz by @media_outlier: go.outliermedia.org/mayor-quiz #DetroitMayorMatch`;
    } else {
      return `I'm a ${results.matchScore}%25 match with ${results.topCandidate} for the Detroit mayoral race this August. Find your own match with the Meet Your Mayor quiz from Outlier Media: go.outliermedia.org/mayor-quiz`;
    }
  }
};

export const SocialShareButtons: React.FC<{
  /**
   * Details on the matching score with the top candidate — only present if the user has completed the quiz.
   */
  results?: ScoreShareDetails;
}> = ({ results }) => {
  return (
    <>
      <SocialButton
        url={`https://bsky.app/intent/compose?text=${getShareText(
          "bluesky",
          results
        )}`}
        ariaLabel="Share on Bluesky"
      />
      <SocialButton
        url={`https://threads.net/intent/post?text=${getShareText(
          "threads",
          results
        )}`}
        ariaLabel="Share on Threads"
      />
      <SocialButton
        url={`https://wa.me/?text=${getShareText("whatsapp", results)}`}
        ariaLabel="Share on Whatsapp"
      />
      <SocialButton
        url={`mailto:?subject=Detroit Meet Your Mayor Quiz&body=${getShareText(
          "email",
          results
        )}`}
        ariaLabel="Share via Email"
      />
    </>
  );
};
