import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLinkHook = () => {
  const router = useRouter();

  const [details, setDetails] = useState({ link: "", title: "" });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLinkSubmit = async () => {
    setError("");

    const trimmedLink = details.link.trim();
    const linkWithProtocol = /^https?:\/\//i.test(trimmedLink) ? trimmedLink : `https://${trimmedLink}`;

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
          title: details.title
        }),
      });

      const data = await response.json();

      if (!response.ok)  throw new Error(data.error || "Unable to generate link preview.");

      sessionStorage.setItem("soars-resource-draft",
        JSON.stringify({
          type: "link",
          ...data,
        }),
      );

      router.push("/add-resource/preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { error, setError, details, setDetails, loading, handleLinkSubmit };
}
