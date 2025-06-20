import React from "react";
import { Link as AnchorLink } from "react-scroll";

export const OutboundLink: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ to, children, className, style }) => {
  return (
    <a
      className={className}
      style={style}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

/**
 * How many pixels above each section we should jump to when we click on an anchor link.
 */
export const QUESTION_ANCHOR_LINK_OFFSET = -150;

export const ANCHOR_LINK_DURATION = 800;

const LINKS_WITH_REMOVED_OFFSET = ["quiz", "results"];

export const SmoothScroll: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  extraOffset?: number;
  style?: React.CSSProperties;
  enableActiveClass?: boolean;
  onClick?: () => void;
}> = ({
  to,
  children,
  className,
  extraOffset,
  style,
  enableActiveClass,
  onClick,
}) => {
  return (
    <AnchorLink
      className={className}
      style={style}
      activeClass={enableActiveClass ? "has-text-weight-bold" : ""}
      href=""
      spy={true}
      smooth={true}
      duration={ANCHOR_LINK_DURATION}
      offset={
        (LINKS_WITH_REMOVED_OFFSET.includes(to)
          ? 0
          : QUESTION_ANCHOR_LINK_OFFSET) + (extraOffset || 0)
      }
      to={to}
      onClick={() => {
        if (onClick) onClick();
        setTimeout(() => {
          if (to.startsWith("question-")) {
            document.querySelector(`#${to} h3`)?.focus();
          } else if (to.startsWith("section-")) {
            document.querySelector(`#${to} h2`)?.focus();
          } else {
            document.getElementById(to)?.focus();
          }
        }, 1000);
      }}
    >
      {children}
    </AnchorLink>
  );
};
