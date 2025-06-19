import React, { FC, useState } from "react";
import classnames from "classnames";
import Results, { getQuestionsLeftToAnswer } from "./Results";
import { formatContent, smoothScrollToCenter } from "../utils";
import { correctionContent } from "../correction-content";
import { formatQuestionContent, generateListOfCandidates } from "./QuizContent";
import {
  ANCHOR_LINK_DURATION,
  QUESTION_ANCHOR_LINK_OFFSET,
  SmoothScroll,
} from "./Links";
import { MatchingCandidates } from "./MatchingCandidates";
import { useAppStore } from "../useAppStore";
import { Methodology } from "./Methodology";
import { scroller } from "react-scroll";
import { OutboundLink } from "./Links";
import { kebabCase } from "../utils";

export const CircleIcon: FC<{ filledIn?: boolean }> = ({ filledIn }) => (
  <div
    className="is-inline-block"
    style={{
      width: "12px",
      height: "12px",
      borderRadius: "100%",
      backgroundColor: !!filledIn ? "#111111" : "transparent",
      boxShadow: !!filledIn ? "none" : "0px 0px 0px 1px #111111 inset",
    }}
  />
);

const Quiz = () => {
  const answers = useAppStore((state) => state.answers);
  const setAnswers = useAppStore((state) => state.setAnswers);

  const resetAnswers = useAppStore((state) => state.resetAnswers);

  const highestVisibleQuestion = useAppStore(
    (state) => state.highestVisibleQuestion
  );
  const setHighestVisibleQuestion = useAppStore(
    (state) => state.setHighestVisibleQuestion
  );

  const questions = formatQuestionContent();
  const hasStartedQuestions = answers.some(({ answer }) => answer !== null);

  const [methodologyVisible, setMethodologyVisible] = useState(false);
  const toggleMethodology = () => {
    const currentVisibility = methodologyVisible;
    setMethodologyVisible(!currentVisibility);
  };

  const candidates = generateListOfCandidates();

  const recordAnswer = (questionNumber: number, answer: string | null) => {
    const updatedAnswers = answers.map((answerObj) => {
      if (answerObj.questionNumber === questionNumber) {
        return { ...answerObj, answer };
      }
      return answerObj;
    });
    setAnswers(updatedAnswers);

    if (highestVisibleQuestion === questionNumber) {
      const prev = highestVisibleQuestion;
      setHighestVisibleQuestion(prev + 1);
    }
  };

  const questionsLeftToAnswer = getQuestionsLeftToAnswer();

  return (
    <>
      <div
        className="hero mb-6"
        id="quiz"
        tabIndex={-1}
        style={{
          minHeight: "110vh", // Make sure this section stays a consistent height
          // even when the content changes
        }}
      >
        <div className="hero-body">
          <div className="container" style={{ maxWidth: "600px" }}>
            <div>
              <h1 className="headline has-text-left">
                The Meet Your Mayor Quiz
              </h1>
              <p className="copy has-text-left mt-5">
                Take this 21-question quiz to see how{" "}
                <OutboundLink to="https://outliermedia.org/detroit-mayoral-election-candidates-guide/">
                  Detroit’s 11 mayoral candidates
                </OutboundLink>{" "}
                would tackle urgent issues facing Detroiters. You’ll be matched
                with ones who share your views about housing, safety and more.
                Two candidates — Rogelio Landin and Arnold Boyd — are write-ins,
                so their names won’t be printed on the ballot.
              </p>
              {Object.keys(correctionContent).length > 0 && (
                <>
                  {Object.entries(correctionContent).map(
                    ([correctionKey, { content }]) => (
                      <p
                        key={correctionKey.toString()}
                        className="italics copy has-text-left mt-2"
                      >
                        {content}
                      </p>
                    )
                  )}
                </>
              )}

              <div
                className="pb-3"
                style={{
                  minHeight: "500px",
                }}
              >
                {questionsLeftToAnswer.length === 0 ? (
                  <div className="my-4">
                    <h2 className="deck has-text-left">
                      You completed the quiz already!
                    </h2>

                    <div className="field is-grouped">
                      <SmoothScroll
                        to="results"
                        className="control button mb-1"
                      >
                        See my Results
                      </SmoothScroll>
                      <SmoothScroll
                        to="quiz"
                        onClick={() => resetAnswers()}
                        className="button is-white mb-1"
                      >
                        Reset Answers
                      </SmoothScroll>
                    </div>
                  </div>
                ) : hasStartedQuestions ? (
                  <div className="my-4">
                    <>
                      <h2 className="deck has-text-left">
                        You started the quiz already!
                      </h2>

                      <div className="field is-grouped">
                        <SmoothScroll
                          to={`question-${questionsLeftToAnswer[0]}`}
                          className="control button mb-1"
                        >
                          Continue
                        </SmoothScroll>
                        <SmoothScroll
                          className="button is-white mb-1"
                          to="quiz"
                          onClick={() => resetAnswers()}
                        >
                          Reset Answers
                        </SmoothScroll>
                      </div>
                    </>
                  </div>
                ) : (
                  <>
                    <h2 className="deck has-text-left has-text-weight-bold mt-0">
                      Ready to take the quiz?
                    </h2>
                    <button
                      className="button"
                      onClick={() => {
                        if (window.gtag) {
                          window.gtag("event", "form_start", {});
                        }
                        setMethodologyVisible(false);
                        setHighestVisibleQuestion(1);
                        setTimeout(() => {
                          scroller.scrollTo("question-1", {
                            duration: ANCHOR_LINK_DURATION,
                            delay: 0,
                            smooth: true,
                            offset: QUESTION_ANCHOR_LINK_OFFSET,
                          });
                        }, 100);
                      }}
                    >
                      Start
                    </button>
                  </>
                )}
                <div className="mb-5 mt-2">
                  <button
                    key="x"
                    className="eyebrow is-link is-inline-block"
                    onClick={() => toggleMethodology()}
                  >
                    How Meet Your Mayor Works{" "}
                    <span>{methodologyVisible ? "-" : "+"}</span>
                  </button>

                  {methodologyVisible && <Methodology />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section p-0" id="questions" tabIndex={-1}>
        {highestVisibleQuestion > 0 && (
          <div>
            <div>
              <div
                className="container is-hidden-desktop quiz-progress-mobile p-0"
                style={{
                  position: "sticky",
                  top: 0,
                  height: "30px",
                  width: "100vw",
                  zIndex: "100",
                  overflowX: "hidden",
                }}
              >
                <div className="is-flex is-justify-content-center pt-1">
                  {Object.entries(questions).map((questionGroup, i) => (
                    <div key={i} className="is-inline-block">
                      {questionGroup[1].map((question, i) => {
                        const questionAnswered = answers.find(
                          (answer) => answer.questionNumber === question.number
                        )?.answer;
                        return (
                          <span
                            key={i}
                            style={{
                              marginRight: "3px",
                            }}
                          >
                            {!!questionAnswered ? (
                              <CircleIcon filledIn />
                            ) : (
                              <CircleIcon />
                            )}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="columns ml-0">
                <div className="column is-one-quarter" />
                <div className="column is-half" style={{ maxWidth: "600px" }}>
                  <div className="container">
                    {Object.entries(questions).map((questionGroup, i) => (
                      <div
                        key={i}
                        id={`section-${kebabCase(questionGroup[0])}`}
                      >
                        {questionGroup[1].map((question, i) => {
                          const {
                            number,
                            title,
                            tellMeMore,
                            option1,
                            option2,
                            option3,
                            option4,
                            option5,
                            skipped,
                          } = question;

                          const optionSkipped = {
                            text: "Skip this question",
                            matchingCandidates: skipped.matchingCandidates,
                          };

                          const isFirstQuestionInSection = i === 0;

                          const answerSelected = answers.find(
                            (answer) => answer.questionNumber === number
                          )?.answer;

                          const isQuestionVisible =
                            highestVisibleQuestion >= number;

                          return (
                            <div key={i}>
                              {isFirstQuestionInSection && isQuestionVisible && (
                                <h2
                                  className="headline has-text-left pt-5"
                                  tabIndex={-1}
                                >
                                  {questionGroup[0]}
                                </h2>
                              )}
                              <div
                                key={number}
                                id={`question-${number}`}
                                style={{
                                  display: isQuestionVisible ? "block" : "none",
                                  minHeight: "100vh",
                                  margin: isFirstQuestionInSection
                                    ? "0 0 30vh 0"
                                    : "30vh 0",
                                }}
                              >
                                <h3
                                  className="deck has-text-left mb-2"
                                  tabIndex={-1}
                                >
                                  <div className="tag question-number-tag">
                                    {number}
                                  </div>
                                  {title}
                                </h3>

                                {!!tellMeMore && (
                                  <details className="mb-5">
                                    <summary className="eyebrow is-link">
                                      <span className="open-text">
                                        Tell me more +
                                      </span>
                                      <span className="close-text">
                                        Tell me less -
                                      </span>
                                    </summary>
                                    <div className="details-content copy mt-2">
                                      {formatContent(tellMeMore)}
                                    </div>
                                  </details>
                                )}
                                {[
                                  option1,
                                  option2,
                                  option3,
                                  option4,
                                  option5,
                                  optionSkipped,
                                ].map((optionInfo, i) => {
                                  const optionNumber =
                                    optionInfo.text === optionSkipped.text
                                      ? "0"
                                      : `${i + 1}`;
                                  /**
                                   * Unique id for smooth scrolling purposes:
                                   */
                                  const optionSlug = `question-${number}-option-${optionNumber}`;
                                  return !!optionInfo.text ? (
                                    <div key={i} id={optionSlug}>
                                      <div style={{ width: "100%" }}>
                                        <button
                                          aria-label={
                                            !!answerSelected
                                              ? `Change answer: ${optionInfo.text}`
                                              : `Select answer: ${optionInfo.text}`
                                          }
                                          className={classnames(
                                            "quiz-selection-button",
                                            "is-flex",
                                            "is-flex-direction-row",
                                            "is-align-items-start",
                                            "has-text-left",
                                            "mt-4",
                                            !!answerSelected
                                              ? answerSelected == optionNumber
                                                ? "is-selected"
                                                : "is-disabled"
                                              : "is-active"
                                          )}
                                          onClick={() => {
                                            recordAnswer(number, optionNumber);
                                            const id =
                                              document.getElementById(
                                                optionSlug
                                              );
                                            if (!!id) {
                                              smoothScrollToCenter(id);
                                            }
                                          }}
                                        >
                                          <div className="quiz-selection-oval mr-4" />
                                          <div className="copy">
                                            {optionInfo.text}
                                          </div>
                                        </button>
                                      </div>
                                      {!!answerSelected && (
                                        <div
                                          className={classnames(
                                            "matching-candidates",
                                            "mb-5",
                                            `option-number-${optionNumber}`,
                                            answerSelected == optionNumber
                                              ? "is-selected"
                                              : "is-disabled"
                                          )}
                                        >
                                          <MatchingCandidates
                                            candidates={
                                              optionInfo.matchingCandidates
                                            }
                                            isUserSelection={
                                              answerSelected == optionNumber
                                            }
                                            isSkipped={optionNumber === "0"}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div key={i} />
                                  );
                                })}

                                {!!answerSelected && (
                                  <div className="field is-grouped mt-6 question-controls is-flex is-flex-direction-column">
                                    <SmoothScroll
                                      to={`question-${number + 1}`}
                                      className="button is-link"
                                      style={{ maxWidth: "350px" }}
                                    >
                                      Next Question
                                    </SmoothScroll>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="column is-hidden-touch is-one-quarter">
                  <div
                    className="outlier-callout-box quiz-progress-desktop is-flex is-flex-direction-column has-text-right"
                    style={{
                      position: "sticky",
                      top: "6rem",
                      left: "100vw",
                      marginBottom: "60vh", // To avoid overlap with the next section
                      maxWidth: "260px",
                    }}
                  >
                    <p className="has-text-left eyebrow mb-2">PROGRESS:</p>
                    {Object.entries(questions).map((questionGroup, i) => {
                      const questionGroupSeen =
                        questionGroup[1][0].number <= highestVisibleQuestion;
                      const groupNameMap = {
                        "Neighborhood conditions": "Neighborhoods",
                        "Economy and affordability": "Affordability",
                      };

                      return (
                        <div
                          className="has-text-left"
                          key={i}
                          style={{ opacity: questionGroupSeen ? 1 : 0.4 }}
                        >
                          <SmoothScroll
                            key={i}
                            enableActiveClass
                            className="button-link mr-1 copy"
                            style={{
                              pointerEvents: questionGroupSeen ? "all" : "none",
                            }}
                            to={`section-${kebabCase(questionGroup[0])}`}
                          >
                            {groupNameMap[questionGroup[0]] || questionGroup[0]}
                          </SmoothScroll>
                          {questionGroup[1].map((question, i) => {
                            const questionAnswered = answers.find(
                              (answer) =>
                                answer.questionNumber === question.number
                            )?.answer;
                            return (
                              <span
                                key={i}
                                style={{
                                  marginRight: "1px",
                                }}
                              >
                                {!!questionAnswered ? (
                                  <CircleIcon filledIn />
                                ) : (
                                  <CircleIcon />
                                )}
                              </span>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <Results />
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
