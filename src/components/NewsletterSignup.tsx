import React, { useState, FormEvent, ChangeEvent } from "react";
import { OutboundLink } from "./Links";

// TODO: Customize
const EMAIL_LIST_NAME = "Newsletter";

const FALLBACK_NEWSLETTER_LINK = "https://outliermedia.org/newsletters/";

type RequestStatus = "idle" | "loading" | "success" | "error";

export const NewsletterSignupBanner: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<RequestStatus>("idle");

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch(
        "", // TODO:
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");
    submitForm(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="newsletter-signup">
      <div className="container py-4">
        <form
          onSubmit={handleSubmit}
          className="is-flex is-justify-content-center"
        >
          <div className="field ">
            <div className="eyebrow mb-2 has-text-centered">
              Send me election updates from Outlier Media:
            </div>
            <div className="is-flex is-align-items-center">
              <div className="control mr-3 is-flex-grow-1">
                <input
                  className="input is-small"
                  type="email"
                  aria-label="Input your email for election updates"
                  placeholder="e.g. mayor@detroitmi.gov"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="control">
                <button
                  className="button is-small is-white mt-1"
                  type="submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting..." : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </form>
        {status === "success" ? (
          <p className="label mt-2 has-text-centered">You're signed up!</p>
        ) : status === "error" ? (
          <p className="label mt-2 has-text-centered">
            Something went wrong. Sign up manually via{" "}
            <OutboundLink to={FALLBACK_NEWSLETTER_LINK}>
              Outlier Media
            </OutboundLink>
            .
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
