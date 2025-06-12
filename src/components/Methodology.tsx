import React from "react";
import { OutboundLink } from "./Links";

export const Methodology = () => (
  <div className="copy">
    <p className="mt-2">
      When you take the quiz below, you can choose how you’d want the next mayor
      to address key areas of concern, then see how candidates answered.
    </p>
    <p className="mt-2">
      In May, we sent a matching survey to candidates, including the two
      write-in candidates who had filed by June 1. All 11 candidates completed
      the survey.
    </p>
    <p className="mt-2">
      The questions don’t address every issue you might care about, but are
      focused on four categories most frequently identified by Detroiters who
      responded to questions Outlier Media commissioned from the{" "}
      <OutboundLink to="https://outliermedia.org/detroit-community-concerns-public-safety-neighborhood-conditions/">
        Detroit Metro Area Communities Survey
      </OutboundLink>
      .
    </p>
    <p className="mt-2">
      Candidates were asked to answer every question and could only choose one
      answer. This made for some tough choices — and that’s the point! Detroit’s
      next mayor will have to make difficult decisions and balance competing
      interests, and our quiz is intended to help voters discern differences
      between candidates.
    </p>
    <p className="mt-2">
      You get to answer those same questions. (You can also skip any question!)
      Each question you answer the same as a candidate initially scores them 1
      point. At the end of the quiz, you can select up to two issues that matter
      most to you. Each of your matching answers in those categories scores an
      additional point. Candidates’ total scores will be used to rank your
      matches.
    </p>
    <p className="mt-2">
      Your quiz answers are private, though we do collect anonymous data in
      aggregate.
    </p>
    <p className="mt-2">
      Outlier was able to create this quiz thanks to the generosity of{" "}
      <OutboundLink to="https://projects.thecity.nyc/meet-your-mayor-2025-election-quiz-candidates/">
        The City
      </OutboundLink>{" "}
      in New York City, which came up with the idea and{" "}
      <OutboundLink to="https://github.com/thecityny/2025-meet-your-mayor">
        made the code open source
      </OutboundLink>{" "}
      for all to use.
    </p>
    <p className="mt-2">
      If you have any questions about the quiz, the candidates, the election or
      anything else, please reach out to Outlier’s Civic Life Reporter Briana
      Rice at{" "}
      <a href="mailto:briana@outliermedia.org">briana@outliermedia.org</a>.
    </p>
    <p className="mt-2">
      If you’re part of a Detroit newsroom that wants to republish this quiz,
      contact Product Director Kate Abbey-Lambertz at{" "}
      <a href="mailto:kate@outliermedia.org">kate@outliermedia.org</a>.
    </p>
  </div>
);
