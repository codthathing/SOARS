import { useRouter } from "next/navigation";
import { FormikState } from "formik";

type resetFormType<Values> = (nextState?: Partial<FormikState<Values>>) => void;
type setSubmittingType = (isSubmitting: boolean) => void;

export const useFormSubmit = () => {
  const router = useRouter();

  return async <Values,>(method: () => Promise<void>, buttonLink: string, resetForm: resetFormType<Values>, setSubmitting: setSubmittingType, onError?: (message: string) => void) => {
    try {
      await method();
      router.push(buttonLink || "");
      resetForm();
    } catch (e) {
      onError?.(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }
}

export const useFormSubmitBasic = () => {
  const router = useRouter();

  return <Values,>(buttonLink: string, resetForm: resetFormType<Values>, setSubmitting: setSubmittingType) => {
    router.push(buttonLink || "");
    resetForm();
    setSubmitting(false);
  }
}