
"use client";

import HomeHeader from "@/src/components/home/HomeHeader";
import { Button } from "@/src/components/ui/button";
import { useState, FormEvent } from "react";
import {
  Send,
  Link as LinkIcon,
  FileText,
  StickyNote,
  ExternalLink,
  Download,
  Sparkles,
  LoaderCircle,
} from "lucide-react";

interface AIResource {
  id: string;
  type: "link" | "file" | "note";
  title: string;
  summary: string;
  tags: string[];
  collection: string;
  reason: string;
  url?: string;
  viewUrl?: string;
  downloadUrl?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  resources?: AIResource[];
}

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userPrompt = prompt.trim();

    if (!userPrompt || loading) return;

    setPrompt("");
    setError("");

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: userPrompt,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/soars-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "SOARS AI could not respond.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.answer,
          resources: data.resources || [],
        },
      ]);
    } catch (err) {
      console.error("SOARS AI chat error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HomeHeader
        topic="soarsAI"
        showAvatar={true}
        showArrowLeft={false}
      />

      <section className="flex flex-col px-6 py-4 gap-y-4 h-full overflow-y-hidden md:p-7 md:gap-y-10 lg:gap-y-5">
        <div className="flex-1 overflow-y-auto flex flex-col gap-y-5 pb-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center flex-1 gap-y-3">
              <div className="rounded-2xl bg-soft-lavender/40 p-4">
                <Sparkles className="size-8 text-brownish-amber" />
              </div>

              <h2 className="text-lg md:text-2xl font-semibold text-charcoal-black">
                Your library, intelligently connected.
              </h2>

              <p className="text-sm md:text-base text-charcoal-black/60 max-w-md">
                Ask SOARS AI about anything you've saved. I'll search your
                links, PDFs, notes and collections to find what you need.
              </p>

              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {[
                  "About development",
                  "My saved tutorials",
                  "Resources about design",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setPrompt(suggestion)}
                    className="rounded-full border border-soft-lavender px-3 py-2 text-xs md:text-sm text-charcoal-black hover:bg-soft-lavender/30"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col gap-y-3 ${
                message.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-2xl p-3 md:p-4 text-sm md:text-base ${
                  message.role === "user"
                    ? "bg-brownish-amber text-white rounded-br-sm"
                    : "bg-white text-charcoal-black rounded-bl-sm"
                }`}
              >
                {message.content}
              </div>

              {message.role === "assistant" &&
                message.resources &&
                message.resources.length > 0 && (
                  <div className="w-full flex flex-col gap-y-3">
                    <p className="text-xs md:text-sm text-charcoal-black/60">
                      Found {message.resources.length} relevant{" "}
                      {message.resources.length === 1
                        ? "resource"
                        : "resources"}{" "}
                      in your library
                    </p>

                    {message.resources.map((resource) => (
                      <article
                        key={resource.id}
                        className="bg-white rounded-xl p-4 flex flex-col gap-y-3 border border-soft-lavender/50"
                      >
                        <div className="flex items-start gap-x-3">
                          <div className="size-10 shrink-0 rounded-lg bg-soft-lavender/40 flex items-center justify-center">
                            {resource.type === "link" ? (
                              <LinkIcon className="size-5 text-brownish-amber" />
                            ) : resource.type === "file" ? (
                              <FileText className="size-5 text-brownish-amber" />
                            ) : (
                              <StickyNote className="size-5 text-brownish-amber" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-sm md:text-base text-charcoal-black">
                              {resource.title}
                            </h3>

                            <p className="text-xs text-charcoal-black/50 capitalize mt-1">
                              {resource.type} · {resource.collection}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-charcoal-black/80 leading-relaxed">
                          {resource.summary}
                        </p>

                        <p className="text-xs text-charcoal-black/50">
                          {resource.reason}
                        </p>

                        {resource.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {resource.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] rounded-full bg-brownish-amber/10 text-brownish-amber px-2 py-1"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-soft-lavender/50">
                          {resource.type === "link" && resource.url && (
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brownish-amber hover:underline"
                            >
                              <ExternalLink className="size-3.5" />
                              Open link
                            </a>
                          )}

                          {resource.type === "file" && resource.viewUrl && (
                            <>
                              <a
                                href={resource.viewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brownish-amber hover:underline"
                              >
                                <ExternalLink className="size-3.5" />
                                View PDF
                              </a>

                              {resource.downloadUrl && (
                                <a
                                  href={resource.downloadUrl}
                                  className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brownish-amber hover:underline"
                                >
                                  <Download className="size-3.5" />
                                  Download
                                </a>
                              )}
                            </>
                          )}

                          {resource.type === "note" && resource.viewUrl && (
                            <a
                              href={resource.viewUrl}
                              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brownish-amber hover:underline"
                            >
                              <ExternalLink className="size-3.5" />
                              View note
                            </a>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-x-2 text-sm text-charcoal-black/60">
              <LoaderCircle className="size-4 animate-spin" />
              SOARS AI is searching your library...
            </div>
          )}

          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white w-full rounded-2xl p-3 md:p-4 flex items-center gap-x-3 border border-soft-lavender/50"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything about your library..."
            disabled={loading}
            className="bg-soft-lavender/20 border border-charcoal-black/20 rounded-lg p-3 w-full outline-none text-sm md:text-base disabled:opacity-60"
          />

          <Button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="bg-brownish-amber hover:bg-brownish-amber text-white text-sm capitalize shrink-0 disabled:opacity-50"
          >
            <Send className="size-4" />
            <span className="hidden md:inline">Send</span>
          </Button>
        </form>
      </section>
    </>
  );
}
