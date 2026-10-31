"use client";

import AddResourceTypesButtons from "@/src/components/add-resource/AddResourceTypesButtons";
import { Button } from "@/src/components/ui/button";
import { LinkIcon, Plus } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [details, setDetails] = useState({
    link: "",
    title: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLinkSubmit = async () => {
    setError("");

    const trimmedLink = details.link.trim();
    const linkWithProtocol = /^https?:\/\//i.test(trimmedLink)
      ? trimmedLink
      : `https://${trimmedLink}`;

    try {
      const url = new URL(linkWithProtocol);

      if (!url.hostname.includes(".")) {
        throw new Error("Please enter a valid URL.");
      }

      setLoading(true);

      const response = await fetch("/api/links/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.href,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate link preview.");
      }

      sessionStorage.setItem(
        "soars-resource-draft",
        JSON.stringify({
          type: "link",
          ...data,
          userTitle: details.title.trim(),
        })
      );

      router.push("/add-resource/preview");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AddResourceTypesButtons />

      <div className="bg-soft-lavender/30 py-1 rounded-lg flex gap-x-4 items-center md:rounded-xl px-4 md:px-5">
        <LinkIcon className="text-charcoal-black/90 size-4 md:size-5" />

        <input
          type="url"
          name="link"
          value={details.link}
          onFocus={() => setError("")}
          onChange={handleInputChange}
          placeholder="Enter the url"
          className="w-full border-none outline-none text-sm text-charcoal-black md:text-xl py-3 md:py-4"
        />
      </div>

      <input
        type="text"
        name="title"
        value={details.title}
        onChange={handleInputChange}
        placeholder="Enter title (optional)"
        className="outline-none border-none rounded-lg md:rounded-xl bg-soft-lavender/30 p-4 md:p-5 w-2/5"
      />

      <Button
        onClick={handleLinkSubmit}
        disabled={!details.link.trim() || loading}
        className={`w-full flex items-center gap-x-1 md:gap-x-2.5 capitalize ${
          details.link.trim() && !loading
            ? "bg-brownish-amber hover:bg-brownish-amber"
            : "bg-brownish-amber/50 hover:bg-brownish-amber/50"
        } cursor-pointer text-white text-base p-6 md:text-2xl md:px-3 md:py-8 lg:text-xl lg:px-5 lg:py-6.5`}
      >
        <Plus className="size-4 md:size-5.5" />
        <span>{loading ? "generating preview..." : "save link"}</span>
      </Button>

      {error && <p className="text-red-500 text-base">{error}</p>}
    </>
  );
}