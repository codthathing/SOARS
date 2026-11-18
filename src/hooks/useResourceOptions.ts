import { useRouter } from "next/navigation";
import { ResourceType } from "../lib/db/types";
import { useState } from "react";

export const useResourceOptions = () => {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);

  const handleOpen = (url?: string) => {
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleView = (type: ResourceType, id: string) => {
    if (type === "file") {
      window.open(`/api/resources/${id}/file`, "_blank");
    } else {
      router.push(`/resources/${id}`);
    }
  };

  const handleDownload = (id: string) => {
    const link = document.createElement("a");
    link.href = `/api/resources/${id}/file?download=1`;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleAction = (action: () => void) => {
    action();
    setShowOptions(false);
  };

  return { handleOpen, handleView, handleDownload, showOptions, setShowOptions, handleAction };
}
