import { useRouter } from "next/navigation";

type setSubmittingType = (isSubmitting: boolean) => void;

export const useFormSubmit = () => {
  const router = useRouter();

  return async (method: () => Promise<void>, buttonLink: string, setSubmitting: setSubmittingType, onError?: (message: string) => void) => {
    try {
      await method();
      router.push(buttonLink || "");
    } catch (e) {
      onError?.(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
}

export const useFormSubmitBasic = () => {
  const router = useRouter();

  return (buttonLink: string, setSubmitting: setSubmittingType) => {
    router.push(buttonLink || "");
    setSubmitting(false);
  }
}