"use client";
import {ReactNode} from "react";
import {Provider} from "react-redux";
import {store} from "@/src/store/store";

export default function PageLayoutWrapper({ children, className }: { children: ReactNode, className: string }) {
  return (
    <Provider store={store}>
      <body className={className}>{children}</body>
    </Provider>
  )
}