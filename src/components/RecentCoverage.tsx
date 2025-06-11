import React from "react";
import { OutboundLink } from "./Links";

// TODO:
const THE_CITY_DONATION_URL = "https://donorbox.org/nycdonate";

const THE_CITY_DEFAULT_LINKS = [
  {
    text: "12 City Council Races to Watch in NYC’s June Election",
    href: "https://www.thecity.nyc/2025/05/05/11-city-council-races-election-june/",
  },
  {
    text: "Can Voters Game Out Their Ranked Choice Ballot?",
    href: "https://www.thecity.nyc/2025/05/01/ranked-choice-voting-strategy-mayoral-primary-cuomo-working-families/",
  },
  {
    text: "Following THE CITY’s Trail, Campaign Board Escalates Eric Adams Fraud Probe",
    href: "https://www.thecity.nyc/2025/04/30/eric-adams-campaign-finance-funds/",
  },
];

export const RecentCoverage: React.FC = () => {
  return (
    <>
      <div className="eyebrow mb-2 mt-3">THE CITY</div>
      <ul>
        {THE_CITY_DEFAULT_LINKS.map((link, i) => (
          <li key={i} className="label is-flex mb-0">
            <div className="mr-2 mt-1">●</div>{" "}
            <OutboundLink
              to={link.href}
              className="copy has-text-left ml-0"
              style={{ lineHeight: "1.4rem" }}
            >
              {link.text}
            </OutboundLink>
          </li>
        ))}
      </ul>
      <OutboundLink to={THE_CITY_DONATION_URL}>
        <div
          className="button is-white is-small mt-3"
          aria-label="Donate to THE CITY"
        >
          Donate
        </div>
      </OutboundLink>
    </>
  );
};
