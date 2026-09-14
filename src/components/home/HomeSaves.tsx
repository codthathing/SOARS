"use client";
import {useAppSelector} from "@/src/store/store";
import ResourceCard from "../common/ResourceCard";


export default function HomeSaves() {
  const saves = useAppSelector(state => state.saves);

  return <ResourceCard resources={saves} />
}