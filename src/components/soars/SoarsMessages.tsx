import { ChatMessage } from "@/src/lib/types";
import { LinkIcon, FileText, StickyNote, ExternalLink, Download } from "lucide-react";

export default function SoarsMessages({ messages }: { messages: ChatMessage[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className={`flex flex-col gap-y-3 ${message.role === "user" ? "items-end" : "items-start"}`}>
          <div className={`max-w-[90%] rounded-2xl p-3 md:p-4 text-sm md:text-base ${message.role === "user" ? "bg-brownish-amber text-white rounded-br-sm" : "bg-white text-charcoal-black rounded-bl-sm"}`}>{message.content}</div>

          {message.role === "assistant" && message.resources && message.resources.length > 0 && (
            <div className="w-full flex flex-col gap-y-3">
              <p className="text-xs md:text-sm text-charcoal-black/60">Found {message.resources.length} relevant {message.resources.length === 1 ? "resource" : "resources"} in your library</p>

              {message.resources.map((resource) => (
                <article key={resource.id} className="bg-white rounded-xl p-4 flex flex-col gap-y-3 border border-soft-lavender/50">
                  <div className="flex items-start gap-x-3">
                    <div className="size-10 shrink-0 rounded-lg bg-soft-lavender/40 flex items-center justify-center">{resource.type === "link" ? <LinkIcon className="size-5 text-brownish-amber" /> : resource.type === "file" ? <FileText className="size-5 text-brownish-amber" /> : <StickyNote className="size-5 text-brownish-amber" />}</div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm md:text-base text-charcoal-black">{resource.title}</h3>
                      <p className="text-xs text-charcoal-black/50 capitalize mt-1">{resource.type} · {resource.collection}</p>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal-black/80 leading-relaxed">{resource.summary}</p>
                  <p className="text-xs text-charcoal-black/50">{resource.reason}</p>

                  {resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {resource.tags.map((tag) => <span key={tag} className="text-[11px] rounded-full bg-brownish-amber/10 text-brownish-amber px-2 py-1">#{tag}</span>)}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-soft-lavender/50">
                    {(resource.type === "link" && resource.url) && <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brownish-amber hover:underline"><ExternalLink className="size-3.5" /> Open link</a>}

                    {(resource.type === "file" && resource.viewUrl) && (
                      <>
                        <a href={resource.viewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brownish-amber hover:underline"><ExternalLink className="size-3.5" /> View PDF</a>
                        {resource.downloadUrl && <a href={resource.downloadUrl} className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brownish-amber hover:underline"><Download className="size-3.5" /> Download</a>}
                      </>
                    )}

                    {(resource.type === "note" && resource.viewUrl) && <a href={resource.viewUrl} className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-brownish-amber hover:underline"><ExternalLink className="size-3.5" /> View note</a>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}