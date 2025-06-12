import React from "react";
import { OutboundLink } from "./Links";

export const VoterInfo: React.FC = () => {
  return (
    <>
      <div className="mt-3">
        <p className="copy">
          The primary election is Aug. 5. Polls will be open 7 a.m. to 8 p.m.
          Early in-person voting begins July 26.
        </p>
        <p className="copy mb-0">
          <OutboundLink to="https://mvic.sos.state.mi.us/Voter/Index">
            ✅ Check if you are registered to vote
          </OutboundLink>
        </p>
        <p className="copy mb-0">
          <OutboundLink to="https://mvic.sos.state.mi.us/RegisterVoter/Index">
            🗳️ Register to vote
          </OutboundLink>
        </p>
        <p className="copy mb-0">
          <OutboundLink to="https://mvic.sos.state.mi.us/AVApplication/Index">
            ✉️ Request an absentee ballot
          </OutboundLink>
        </p>
        <p className="copy mb-0">
          <OutboundLink to="https://mvic.sos.state.mi.us/Voter/Index">
            🔄 Track your absentee ballot
          </OutboundLink>
        </p>
        <p className="copy mb-4">
          <OutboundLink to="https://mvic.sos.state.mi.us/Voter/Index">
            🔎 See what’s on your ballot
          </OutboundLink>
        </p>
        <p className="copy mb-0">
          <OutboundLink to="https://outliermedia.org/democracy/">
            📝 All voter guides and election news from Outlier
          </OutboundLink>
        </p>
        <p className="copy mb-4">
          <OutboundLink to="https://outliermedia.org/detroit-mayoral-race-election-guide/">
            💭How Outlier covers elections
          </OutboundLink>
        </p>
      </div>
      <div className="outlier-callout-box my-6">
        <p className="copy">
          Are you unsure how to get an absentee ballot, curious about a
          candidate’s policy positions or in need of other help? Text{" "}
          <span className="has-text-weight-bold">REPORTER</span> to{" "}
          <span className="has-text-weight-bold">67485</span> to{" "}
          <OutboundLink to="https://outliermedia.org/txt-outlier/">
            talk directly to an Outlier journalist
          </OutboundLink>
          .*
        </p>
        <p className="copy">
          Do you have questions you want candidates to answer or thoughts about
          what the city’s next leaders should tackle first?{" "}
          <OutboundLink to="https://outliermedia.org/detroit-mayoral-race-election-guide/#chime-in">
            Fill out this form
          </OutboundLink>{" "}
          to share your two cents.
        </p>
      </div>
      <p className="copy mt-5 mb-3">
        Outlier is a nonprofit newsroom designed to center and respond to
        Detroiters’ needs. Support our work:
      </p>
      <div className="is-flex is-justify-content-center">
        <OutboundLink
          className="outlier-donate-button"
          to="https://outliermedia.donorsupport.co/-/XGZBSJFF"
        >
          ♥ Donate
        </OutboundLink>
      </div>
    </>
  );
};
