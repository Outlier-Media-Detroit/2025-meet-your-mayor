import React from "react";
import { PageLayout } from "./PageLayout";
import { Link } from "gatsby";
import { formatCandidateContent } from "./QuizContent";
import { convertToHtml, formatContent, kebabCase } from "../utils";
import { CandidateSelectorMenu } from "./CandidateSelectorMenu";
import { SocialShareButtons } from "./SocialShareButtons";
import { VoterInfo } from "./VoterInfo";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NewsletterSignupBanner } from "./NewsletterSignup";
import { useAppStore } from "../useAppStore";
import { getQuestionsLeftToAnswer } from "./Results";
import { SpotifyEmbed } from "./SpotifyEmbed";

const CandidatePage: React.FC<{ pageContext: any }> = ({ pageContext }) => {
  const { candidateName } = pageContext;
  const score = useAppStore((state) => state.score);

  const candidateInfo = formatCandidateContent().find(
    (candidate) => candidate.name === candidateName
  );

  const candidateStats =
    score &&
    score.find((candidate) => candidate.candidateName === candidateName);

  const questionsLeftToAnswer = getQuestionsLeftToAnswer();

  const candidateScore =
    questionsLeftToAnswer.length === 0
      ? !!candidateStats
        ? Math.round(
            (candidateStats.totalScore / candidateStats.totalPossibleScore) *
              100
          )
        : 0
      : null;

  if (!candidateInfo) return <></>;

  const { age, neighborhood, bio, quotes } = candidateInfo;
  const contacts = ["website", "instagram", "facebook", "email"]
    .filter((c) => !!candidateInfo[c])
    .map((contact) => ({
      label: contact.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase()),
      value: candidateInfo[contact],
    }));

  return (
    <PageLayout
      customMetadata={{
        siteName: `${candidateName} | ${process.env.GATSBY_SITE_NAME}`,
        shareImageFilename: `social/${kebabCase(candidateName)}-social.jpg`,
        seoHeadline: `${candidateName} | Detroit Meet Your Mayor Quiz`,
        socialHeadline: `${candidateName} | Detroit Meet Your Mayor Quiz`,
        socialDescription: `${candidateName} is running for Detroit mayor in the 2025 primary. Take Outlier's Meet Your Mayor quiz to find the candidates you match with on the issues.`,
        seoDescription: `${candidateName} is running for Detroit mayor in the 2025 primary. Take Outlier's Meet Your Mayor quiz to find the candidates you match with on the issues.`,
      }}
    >
      <div className="container pt-6" style={{ maxWidth: "1100px" }}>
        <div className="eyebrow">
          <Link to="/">
            <div
              className="mr-2"
              style={{
                display: "inline-block",
                transform: "rotate(-135deg)",
              }}
            >
              ↗
            </div>
            Meet your mayor
          </Link>
        </div>
        <div className="candidate-page-intro candidate-page-content">
          <h1 className="headline has-text-left my-5">{candidateName}</h1>
          <figure
            className="image mb-5"
            style={{
              // This reduces the flickr affect when the photo is still loading
              // by maintaining a certain height on the container
              minHeight: "275px",
            }}
          >
            <LazyLoadImage
              src={`../photos/${kebabCase(candidateName)}-square.jpg`}
              effect="blur"
              alt={candidateName}
              fetchPriority="high"
              style={{
                maxWidth: "275px",
                maxHeight: "275px",
                borderRadius: "100%",
              }}
            />
          </figure>
          {questionsLeftToAnswer.length === 0 && (
            <div className="eyebrow is-align-items-center mb-5">
              Based on your quiz results, you’re a{" "}
              <b>{candidateScore}% match</b>
            </div>
          )}
          <Link to="/">
            <button className="button is-white mb-1">
              {questionsLeftToAnswer.length === 0
                ? `Revisit the quiz`
                : "See if you’re a match"}
            </button>
          </Link>

          <div className="eyebrow has-text-left mt-5 mb-2 is-flex is-align-items-center">
            <div className="mr-3 is-flex-shrink-2">Share Meet Your Mayor:</div>{" "}
            <SocialShareButtons />
          </div>
        </div>
      </div>
      <div className="container candidate-page-content">
        <div className="copy mt-5 pt-5">
          <span className="has-text-weight-bold">Age:</span> {age} &bull;{" "}
          <span className="has-text-weight-bold">Lives in:</span> {neighborhood}
        </div>
        <div className="copy">{formatContent(bio)}</div>
        {candidateInfo.correction && (
          <div className="copy mt-2 italics">
            <p>{candidateInfo.correction}</p>
          </div>
        )}
        <div className="copy mt-5">
          <p>
            <span className="has-text-weight-bold">Contact:</span>{" "}
            {contacts.map(({ label, value }, index) => (
              <>
                <a href={value}>{label}</a>{" "}
                {index < contacts.length - 1 ? <>&bull; </> : null}
              </>
            ))}
          </p>
        </div>
      </div>
      <div
        className="container candidate-page-content pt-5"
        style={{ margin: "auto" }}
      >
        <h2 className="subhed">Notable responses</h2>
      </div>
      <div className="container mb-5">
        <div className="columns">
          {quotes.map((quoteInfo, i) => {
            const { subject, quote, source } = quoteInfo;
            return (
              <div className="column" key={i}>
                <div
                  className="container outlier-callout-box"
                  style={{
                    height: "100%",
                  }}
                >
                  <div className="eyebrow has-color-background mb-4 px-1 is-inline-flex">
                    ON: {subject}
                  </div>
                  <div className="mb-5">
                    <div className="copy">{formatContent(quote)}</div>
                    {source && (
                      <p key={i} className="copy mb-0">
                        {
                          convertToHtml(source.replace("</a>", "</a><br/>")) // Add a line break after each hyperlink
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container pt-5 mb-5" style={{ maxWidth: "600px" }}>
        <h2 className="subhed">Favorite song with a Detroit connection</h2>
        {candidateInfo.spotifyId && (
          <SpotifyEmbed
            title={candidateInfo.songTitle}
            id={candidateInfo.spotifyId}
          />
        )}
        {candidateInfo.youtubeId && (
          <iframe
            width="100%"
            height="315"
            src={`https://youtube.com/embed/${candidateInfo.youtubeId}`}
            title={candidateInfo.songTitle}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
      <hr />
      <div
        className="container is-flex is-flex-direction-column"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="headline has-text-left">About the candidates</h1>
        <div className="is-flex is-flex-direction-column is-align-items-center">
          <CandidateSelectorMenu />
        </div>
      </div>
      <div className="container pt-5 mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="headline has-text-left mt-6">Detroit voter info</h1>
        <VoterInfo />
        <div className="mt-6">
          <NewsletterSignupBanner />
        </div>
      </div>
    </PageLayout>
  );
};

export default CandidatePage;
