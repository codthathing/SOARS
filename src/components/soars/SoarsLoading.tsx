import { LoaderCircle } from "lucide-react";

export default function SoarsLoading({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <div className="flex items-center gap-x-2 text-sm text-charcoal-black/60">
        <LoaderCircle className="size-4 animate-spin" />
        SOARS AI is searching your library...
      </div>
    )
  }
}