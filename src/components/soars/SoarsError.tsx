export default function SoarsError({ error }: { error: string }) {
  if (error) {
    return (
      <p className="text-sm text-red-500" role="alert">
        {error}
      </p>
    );
  }
}
