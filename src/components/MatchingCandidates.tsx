import React, { FC } from "react";
import classnames from "classnames";
import { arrayToNiceList, formatContent } from "../utils";
import { Bobblehead } from "./Illustration";

type MatchingCandidate = {
  name: string;
  quote: string | null;
  source: string | null;
};

export const abbreviateName = (name: string) => {
  const lastName = name.split(" ")[name.split(" ").length - 1];
  return lastName === "III" ? "Durhal" : lastName;
};

const ListOfCandidates: FC<{ candidates: MatchingCandidate[] }> = ({
  candidates,
}) => {
  const names = candidates.map((candidate) => abbreviateName(candidate.name));
  return arrayToNiceList(names);
};

/**
 *
 * This component shows the set of matching candidates
 * that selected a particular response to a quiz question.
 *
 * It has two states, compact (where it just shows the candidates' icons
 * in a list), or expanded, where it shows each candidate's specific
 * reply to the quiz survey, explaining their response.
 *
 */
export const MatchingCandidates: FC<{
  candidates: MatchingCandidate[];
  /**
   * Are these the candidates that match with the user's selected response,
   * or another quiz option?
   */
  isUserSelection: boolean;
  /**
   * Is this the "Skip" question option?
   */
  isSkipped: boolean;
}> = ({ candidates, isUserSelection, isSkipped }) => {
  return (
    <div
      className={classnames(
        "is-flex",
        "is-flex-wrap-wrap",
        "is-flex-direction-row"
      )}
    >
      {candidates.map((candidate, i) => {
        const { name } = candidate;
        const abbreviatedName = abbreviateName(name);

        return isUserSelection ? (
          <div key={i}>
            <div
              key={i}
              className="is-flex is-flex-direction-column is-align-items-center mr-3"
            >
              <Bobblehead candidateName={name} size="is-64x64" showBustOnly />
              <span aria-hidden="true" className="label has-text-centered">{abbreviatedName}</span>
            </div>
          </div>
        ) : (
          <div key={i}></div>
        );
      })}

      {candidates.length > 0 && (
        <div
          className={classnames(
            "mx-2 is-inline-block ",
            isUserSelection ? "mt-3" : "ml-4"
          )}
        >
          {!isUserSelection && (
            <span className="label is-inline-block mr-3">
              <ListOfCandidates candidates={candidates} />
            </span>
          )}
        </div>
      )}

      {!isSkipped && candidates.length === 0 && (
        <div
          className={classnames(
            "label has-text-left ml-4",
            isUserSelection && "has-text-weight-semibold"
          )}
        >
          No matching candidates
        </div>
      )}
    </div>
  );
};
