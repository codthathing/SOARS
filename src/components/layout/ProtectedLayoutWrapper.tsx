"use client";
import { updateUser, useAppDispatch, useAppSelector } from "@/src/store/store";
import { ReactNode, useEffect } from "react";

interface UserProp {
  id: string;
  email: string
}

export default function ProtectedLayoutWrapper({ children, userData }: { children: ReactNode; userData: UserProp }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) dispatch(updateUser(userData));
  }, [userData]);

  return (
    <>{children}</>
  )
}