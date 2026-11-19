"use client";
import { useState, type FormEvent } from "react";

type CommunityArticle = {
  id: string;
  headline: string;
  source: string;
  requestedBy: string;
  contributions: number;
};

const requestedArticles: CommunityArticle[] = [
  {
    id: "article_123",
    headline: "Government announces major changes to economic policy",
    source: "BBC News",
    requestedBy: "Community member",
    contributions: 12,
  },
  {
    id: "article_456",
    headline: "New study claims a significant rise in unemployment",
    source: "The Hindu",
    requestedBy: "Community member",
    contributions: 8,
  },
  {
    id: "article_789",
    headline: "Scientists report a breakthrough in climate research",
    source: "Reuters",
    requestedBy: "Community member",
    contributions: 5,
  },
];

// Displays article requests and collects community assessments.
export default function FactCheckPage() {
  const [articleId, setArticleId] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [selectedArticle, setSelectedArticle] =
    useState<CommunityArticle | null>(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const [verdict, setVerdict] = useState("");
  const [reason, setReason] = useState("");

  const [requestMessage, setRequestMessage] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Handles requests to fact-check an article.

async function handleRequest(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (!articleId.trim() || requestReason.trim().length < 10) {
    setRequestMessage("Provide an article ID and a reason of at least 10 characters.");
    return;
  }

  try {
    const res = await fetch("/api/fact-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleId: articleId.trim(),
        reason: requestReason.trim(),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Request failed");
    }

    setRequestMessage("Fact-check request submitted successfully.");
    setArticleId("");
    setRequestReason("");
  } catch (err) {
    setRequestMessage(
      err instanceof Error ? err.message : "Something went wrong."
    );
  }
}


  // Handles a community member's assessment of an article.
  function handleCommunitySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!verdict || !reason.trim()) {
      setFeedbackMessage("Please select a verdict and provide a reason.");
      return;
    }

    setFeedbackMessage("Your assessment has been recorded locally.");

    setVerdict("");
    setReason("");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      {/* Heading */}
      <section>
        <p className="text-sm font-medium uppercase tracking-wider text-investigative-amber">
          Community Verification
        </p>

        <h1 className="mt-2 font-serif text-3xl font-bold text-investigative-navy">
          Fact Check
        </h1>

        <p className="mt-3 text-sm leading-6 text-investigative-slate">
          Request verification of questionable articles or contribute your own
          assessment to help investigate claims.
        </p>
      </section>

      {/* Request a fact check */}
      <section className="rounded-xl border border-investigative-border bg-investigative-card p-6 sm:p-8">
        <h2 className="font-serif text-xl font-bold">Request a Fact Check</h2>

        <p className="mt-2 text-sm text-investigative-slate">
          Enter the ID of an article available on our platform and explain why
          it should be investigated.
        </p>

        <form onSubmit={handleRequest} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="articleId"
              className="mb-2 block text-sm font-semibold"
            >
              Article ID
            </label>

            <input
              id="articleId"
              value={articleId}
              onChange={(e) => setArticleId(e.target.value)}
              placeholder="Enter article ID..."
              className="w-full rounded-lg border border-investigative-border bg-white px-4 py-3 text-sm outline-none focus:border-investigative-amber"
            />
          </div>

          <div>
            <label
              htmlFor="requestReason"
              className="mb-2 block text-sm font-semibold"
            >
              Why should this article be fact-checked?
            </label>

            <textarea
              id="requestReason"
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              placeholder="Explain the questionable claim..."
              rows={4}
              className="w-full resize-y rounded-lg border border-investigative-border bg-white px-4 py-3 text-sm outline-none focus:border-investigative-amber"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-investigative-navy px-5 py-3 text-sm font-semibold text-white hover:bg-investigative-amber"
          >
            Request Fact Check →
          </button>

          {requestMessage && (
            <p className="text-sm text-investigative-slate">{requestMessage}</p>
          )}
        </form>
      </section>

      {/* Community requests */}
      <section className="space-y-5">
        <div>
          <h2 className="font-serif text-2xl font-bold">
            Community Fact Checks
          </h2>

          <p className="mt-2 text-sm text-investigative-slate">
            Articles submitted by users for verification. Select an article to
            contribute your assessment.
          </p>
        </div>

        <div className="space-y-4">
          {requestedArticles.map((article) => (
            <article
              key={article.id}
              className="rounded-xl border border-investigative-border bg-investigative-card p-5"
            >
              <p className="text-xs text-investigative-slate">
                {article.source} · {article.requestedBy}
              </p>

              <h3 className="mt-2 font-serif text-lg font-semibold">
                {article.headline}
              </h3>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-investigative-slate">
                  {article.contributions} community contributions
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedArticle(article);
                    setFeedbackMessage("");
                  }}
                  className="rounded-lg border border-investigative-border px-4 py-2 text-sm font-semibold hover:bg-slate-100"
                >
                  Contribute →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Community assessment form */}

      {selectedArticle && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
          <section className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-investigative-border bg-investigative-card p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-investigative-amber">
                  Community Assessment
                </p>

                <h2 className="mt-2 font-serif text-xl font-bold">
                  {selectedArticle.headline}
                </h2>

                <p className="mt-2 text-xs text-investigative-slate">
                  Article ID: {selectedArticle.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="text-sm text-investigative-slate hover:text-red-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCommunitySubmit} className="mt-6 space-y-5">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">
                  What is your assessment?
                </legend>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { value: "True", label: "True" },
                    { value: "False", label: "False" },
                    {
                      value: "Misleading",
                      label: "Partially true / Missing context",
                    },
                    { value: "Unverified", label: "Cannot verify" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm ${
                        verdict === option.value
                          ? "border-investigative-amber bg-amber-50"
                          : "border-investigative-border hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="verdict"
                        value={option.value}
                        checked={verdict === option.value}
                        onChange={(e) => setVerdict(e.target.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="reason"
                  className="mb-2 block text-sm font-semibold"
                >
                  Explain your assessment
                </label>

                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={5}
                  placeholder="Explain your reasoning and provide evidence or source links..."
                  className="w-full resize-y rounded-lg border border-investigative-border bg-white px-4 py-3 text-sm outline-none focus:border-investigative-amber"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-investigative-navy px-5 py-3 text-sm font-semibold text-white hover:bg-investigative-amber"
              >
                Submit Assessment →
              </button>

              {feedbackMessage && (
                <p className="text-sm text-investigative-slate">
                  {feedbackMessage}
                </p>
              )}
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
