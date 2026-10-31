"use client";

import { makeStore } from "@/src/store/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import AddResourceHydrator from "@/src/components/add-resource/AddResourceHydrator";

export default function ProtectedLayoutWrapper({
  children,
  userData,
}: {
  children: ReactNode;
  userData: { id: string; email: string };
}) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(userData);
  }

  return (
    <Provider store={storeRef.current}>
      <AddResourceHydrator />
      {children}
    </Provider>
  );
}