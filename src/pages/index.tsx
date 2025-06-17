import React from "react";
import { PageLayout } from "../components/PageLayout";
import Quiz from "../components/Quiz";
import { CandidateSelectorMenu } from "../components/CandidateSelectorMenu";
import { SocialShareButtons } from "../components/SocialShareButtons";
import { SmoothScroll } from "../components/Links";
import { VoterInfo } from "../components/VoterInfo";
import { IntroAnimation } from "../components/IntroAnimation";
import { NewsletterSignupBanner } from "../components/NewsletterSignup";
import { navigate } from "gatsby";
import { getQuestionsLeftToAnswer } from "../components/Results";
import { useAppStore } from "../useAppStore";
import { OutboundLink } from "../components/Links";

const getDateUpdated = () => {
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  const timestamp = process.env.GATSBY_UPDATE_DATE;
  if (!timestamp) {
    throw new Error("No publication date defined in .env file!");
  } else {
    const date = new Date(timestamp.replace(/-/g, "/"));
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }
};

const Homepage = () => {
  const answers = useAppStore((state) => state.answers);
  const hasStartedQuestions = answers.some(({ answer }) => answer !== null);
  const questionsLeftToAnswer = getQuestionsLeftToAnswer();

  return (
    <PageLayout>
      <div className="hero is-fullheight-with-navbar has-color-background">
        <IntroAnimation isMobile />
        <div className="hero-body pt-6">
          <div className="columns" style={{ width: "100%" }}>
            <div className="column is-half">
              <h1 className="headline main-headline has-text-left mt-0 uppercase">
                Meet Your Mayor 2025
              </h1>
              <div className="attribution">
                <p className="eyebrow has-text-left mb-2">
                  Updated: {getDateUpdated()}
                </p>
                <p className="deck has-text-left" style={{ maxWidth: "600px" }}>
                  This year, Detroit voters will pick the city’s next mayor, the
                  first new person to hold the office{" "}
                  <OutboundLink to="https://outliermedia.org/detroit-mayoral-race-election-guide/">
                    in more than a decade
                  </OutboundLink>
                  . Need help deciding who to vote for? Take our quiz to find
                  your match.
                </p>
                <div className="is-flex is-flex-direction-column my-6">
                  <SmoothScroll
                    className="mb-4"
                    to={
                      questionsLeftToAnswer.length === 0
                        ? "results"
                        : !!hasStartedQuestions
                        ? `question-${questionsLeftToAnswer[0]}`
                        : "quiz"
                    }
                  >
                    <button
                      className="button is-extra-dark"
                      style={{ width: "100%", maxWidth: "350px" }}
                    >
                      {questionsLeftToAnswer.length === 0
                        ? "View my results"
                        : !!hasStartedQuestions
                        ? "Continue the quiz"
                        : "Take the quiz"}
                    </button>
                  </SmoothScroll>

                  <button
                    className="button is-white"
                    onClick={() =>
                      // Since we use the #candidates container to smooth scroll to the #results
                      // section from a Candidate page, we need to make sure this button here
                      // clears the location state so that it indeed goes to #candidates.
                      navigate("#candidates", { replace: true })
                    }
                    style={{ width: "100%", maxWidth: "350px" }}
                  >
                    See the candidates{" "}
                  </button>
                </div>
                <div className="eyebrow has-text-left mt-4 mb-2 is-flex is-align-items-center">
                  <div className="mr-3 is-flex-shrink-2">
                    Share Meet Your Mayor:
                  </div>{" "}
                  <SocialShareButtons />
                </div>
              </div>
            </div>
            <IntroAnimation />
          </div>
        </div>
      </div>
      <NewsletterSignupBanner />
      <Quiz />
      <NewsletterSignupBanner />
      <div className="hero is-fullheight-with-navbar pt-6">
        <div className="container mt-6 pt-5" id="candidates">
          <div className="columns">
            <div className="column is-two-thirds">
              <div className="eyebrow">
                <a href="#quiz">
                  <div
                    className="mr-1"
                    style={{
                      display: "inline-block",
                      transform: "rotate(-135deg)",
                    }}
                  >
                    ↗
                  </div>
                  Take our quiz
                </a>
              </div>
              <h1
                className="headline has-text-left mt-2"
                style={{ maxWidth: "500px" }}
              >
                About the candidates
              </h1>
              <CandidateSelectorMenu />
            </div>
            <div className="column">
              <div className="eyebrow is-inline-block"> </div>
              <h1 className="headline has-text-left mt-1">
                Detroit voter info
              </h1>
              <VoterInfo />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Homepage;
