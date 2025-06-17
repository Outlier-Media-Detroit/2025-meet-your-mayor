import React, { useEffect } from "react";

import { Helmet } from "react-helmet";
import { OutboundLink } from "./Links";
import { SocialButton } from "./SocialShareButtons";
import { StaticImage } from "gatsby-plugin-image";

import "../styles/app.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Script } from "gatsby";

const OUTLIER_SITE_LINKS = {
  website: "https://outliermedia.org/",
  instagram: "https://www.instagram.com/media_outlier",
  facebook: "https://www.facebook.com/mediaoutlier",
  threads: "https://www.threads.net/@media_outlier",
  bluesky: "https://bsky.app/profile/outliermedia.org",
  tiktok: "https://www.tiktok.com/@media_outlier",
};

const THE_CITY_SITE_LINKS = {
  website: "https://www.thecity.nyc/",
  x: "https://x.com/intent/follow?screen_name=TheCityNY",
  instagram: "https://www.instagram.com/thecityny",
  facebook: "https://www.facebook.com/thecityny",
  bluesky: "https://bsky.app/profile/thecity.nyc",
};

const GOTHAMIST_SITE_LINKS = {
  website: "https://gothamist.com/",
  x: "https://x.com/gothamist",
  instagram: "https://www.instagram.com/gothamist",
  facebook: "https://www.facebook.com/gothamist",
  bluesky: "https://bsky.app/profile/gothamist.com",
};

const byline = process.env.GATSBY_AUTHOR
  ? JSON.parse(process.env.GATSBY_AUTHOR)
  : ([] as any);

const Header = () => (
  <nav className="nav">
    <div className="nav-container">
      <div className="nav-logo" style={{ width: "80px" }}>
        <OutboundLink
          to={OUTLIER_SITE_LINKS.website}
          aria-label="Outlier Media"
        >
          <StaticImage src={"../assets/logo.png"} alt="Outlier Media logo" />
        </OutboundLink>
      </div>
      <div className="nav-title"></div>
    </div>
  </nav>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div
        className="container is-flex is-flex-direction-column is-align-items-center p-0"
        style={{ maxWidth: "750px" }}
      >
        <p className="uppercase mb-4">Credits:</p>
        <p>
          <OutboundLink to="https://outliermedia.org/author/briana-rice/">
            Briana Rice
          </OutboundLink>
          , civic life reporter
        </p>
        <p>
          Photography:{" "}
          <OutboundLink to="https://outliermedia.org/author/cydni-elledge/">
            Cydni Elledge
          </OutboundLink>{" "}
          &bull; Illustrations:{" "}
          <OutboundLink to="https://dajahcallen.com/">
            Dajah Callen
          </OutboundLink>{" "}
          &bull; Development: Patrick Sier
        </p>
        <p>
          Editing and design:{" "}
          <OutboundLink to="https://outliermedia.org/author/sarah-hulett/">
            Sarah Hulett
          </OutboundLink>
          ,{" "}
          <OutboundLink to="https://outliermedia.org/author/dan-ignacio/">
            Dan Ignacio
          </OutboundLink>
          ,{" "}
          <OutboundLink to="https://outliermedia.org/author/kate-abbey-lambertz/">
            Kate Abbey-Lambertz
          </OutboundLink>
        </p>
        <p>
          Meet Your Mayor concept:{" "}
          <OutboundLink to="https://projects.thecity.nyc/meet-your-mayor-2025-election-quiz-candidates/">
            THE CITY
          </OutboundLink>
          . Original design:{" "}
          <OutboundLink to="https://www.samrabiyah.com/">
            Sam Rabiyah
          </OutboundLink>{" "}
          and THE CITY
        </p>
        <p className="mt-5 mb-5">
          Follow Outlier Media:{" "}
          <SocialButton
            black
            url="https://bsky.app/profile/outliermedia.org"
            ariaLabel="Bluesky"
          />
          <SocialButton
            black
            url="https://www.facebook.com/mediaoutlier"
            ariaLabel="Facebook"
          />
          <SocialButton
            black
            url="https://www.instagram.com/media_outlier/"
            ariaLabel="Instagram"
          />
          <SocialButton
            black
            url="https://www.linkedin.com/company/outlier-media/"
            ariaLabel="LinkedIn"
          />
          <SocialButton
            black
            url="https://www.threads.net/@media_outlier"
            ariaLabel="Threads"
          />
          <SocialButton
            black
            url="https://www.tiktok.com/@media_outlier"
            ariaLabel="TikTok"
          />
          <SocialButton
            black
            url="https://www.youtube.com/@media_outlier"
            ariaLabel="YouTube"
          />
        </p>
        <p>
          Text <span className="has-text-weight-bold">DETROIT</span> to{" "}
          <span className="has-text-weight-bold">67485</span> to get critical
          info or talk to an Outlier reporter via{" "}
          <OutboundLink to="https://outliermedia.org/txt-outlier/">
            TXT OUTLIER
          </OutboundLink>
          .*
        </p>
        <p className="small">
          * Message and data rates may apply. Message frequency varies based on
          your usage. Text HELP for help or STOP to cancel. Read our{" "}
          <OutboundLink to="https://outliermedia.org/about/privacy-policy/">
            terms and privacy policy
          </OutboundLink>
          .
        </p>
        <p className="mt-5">
          <OutboundLink to="https://outliermedia.org/about/privacy-policy/">
            Privacy Policy
          </OutboundLink>{" "}
          &bull;{" "}
          <OutboundLink to="https://outliermedia.org/about/">
            About Us
          </OutboundLink>{" "}
          &bull;{" "}
          <OutboundLink to="https://outliermedia.org/about/contact/">
            Contact
          </OutboundLink>
        </p>
        <p>© {year} Outlier Media</p>
      </div>
    </footer>
  );
};

const Analytics = () => (
  <>
    {/* Google Analytics & Google Tag Manager: */}
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=GT-T5MGVZ8"
    />
    <Script>
      {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'GT-T5MGVZ8');`}
    </Script>
    <Script
      id="parsely-cfg"
      src="//cdn.parsely.com/keys/outliermedia.org/p.js"
    />
  </>
);

type MetadataProps = {
  slug?: string;
  siteName?: string;
  /**
   * This should be the filename of an image in the `/static` directory in the root.
   */
  shareImageFilename?: string;
  seoHeadline?: string;
  seoDescription?: string;
  socialHeadline?: string;
  socialDescription?: string;
  author?: {
    name: string;
    url: string;
    "@type": string;
  }[];
};

/**
 * This component wraps child components with a header and footer and adds site metadata
 */
export const PageLayout: React.FC<{
  children: React.ReactNode;
  customMetadata?: MetadataProps;
}> = ({ children, customMetadata }) => {
  const slug = customMetadata?.slug || process.env.GATSBY_SLUG;
  const url = `${process.env.GATSBY_DOMAIN}${slug}/`;

  const siteName = customMetadata?.siteName || process.env.GATSBY_SITE_NAME;
  const shareImage = `${process.env.GATSBY_DOMAIN}${process.env.GATSBY_SLUG}/${
    customMetadata?.shareImageFilename || "social-image.jpg"
  }`;
  const seoHeadline =
    customMetadata?.seoHeadline || process.env.GATSBY_SEO_HEADLINE;
  const seoDescription =
    customMetadata?.seoDescription || process.env.GATSBY_SEO_DESCRIPTION;
  const socialHeadline =
    customMetadata?.socialHeadline || process.env.GATSBY_SOCIAL_HEADLINE;
  const socialDescription =
    customMetadata?.socialDescription || process.env.GATSBY_SOCIAL_DESCRIPTION;
  const author = customMetadata?.author || process.env.GATSBY_AUTHOR;

  return (
    <article id="main">
      <Header />
      <Helmet>
        <title>{`${siteName}`}</title>
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={seoDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={socialHeadline} />
        <meta property="og:description" content={socialDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en-US" />
        <meta property="twitter:title" content={socialHeadline} />
        <meta property="twitter:description" content={socialDescription} />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:image" content={shareImage} />
        <meta property="twitter:card" content="summary_large_image" />

        <script type="application/ld+json">{`{
          "@type": "NewsArticle",
          "@context": "http://schema.org",
          "headline": "${seoHeadline}",
          "image": {
              "@type": "ImageObject",
              "contentUrl": "${shareImage}",
              "url": "${shareImage}",
              "representativeOfPage": ${true}
          },
          "dateCreated": "${process.env.GATSBY_PUB_DATE}",
          "datePublished": "${process.env.GATSBY_PUB_DATE}",
          "dateModified": "${process.env.GATSBY_UPDATE_DATE}",
          "articleSection": "News Apps",
          "mainEntityOfPage": "${url}",
          "description": "${seoDescription}",
          "publisher": {
              "@type": "Organization",
              "name": "Outlier Media",
              "url": "https://outliermedia.org/"
          },
          "author": ${author}
        }`}</script>
      </Helmet>
      <Analytics />
      {children}
      <Footer />
    </article>
  );
};
