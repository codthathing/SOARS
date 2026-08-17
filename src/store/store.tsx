import {configureStore, createSlice} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

type IconName = "bookmark" | "directory" | "star" | "archive";

const categories: { id: number; icon: IconName; count: number; title: string }[] = [
  { id: 0, icon: "bookmark", count: 248, title: "total saves" },
  { id: 1, icon: "directory", count: 12, title: "collections" },
  { id: 3, icon: "star", count: 34, title: "favorites" },
  { id: 2, icon: "archive", count: 57, title: "archives" },
]

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categories,
  reducers: {}
})


type SavesIconName = "link" | "file" | "note";

const saves: { id: number; type: SavesIconName; link?: string; size?: string; edited?: string; title: string; favorite: boolean; tags: string[] }[] = [
  { id: 0, type: "link", link: "medium", title: "the grammar of the great queen of British colonel", favorite: true, tags: ["design", "reading"] },
  { id: 1, type: "file", size: "2.4 MB", title: "q3 product income for the house of the b4 companies", favorite: false, tags: ["work"] },
  { id: 2, type: "note", edited: "2d", title: "ideas for the onboarding of the interns at microsoft", favorite: false, tags: ["ideas"] },
  { id: 3, type: "link", link: "tailwindcss", title: "tailwind css v4 documentation for learners", favorite: true, tags: ["dev"] },
  { id: 4, type: "link", link: "youtube", title: "color theory crash course for pros", favorite: false, tags: ["design", "learning"] },
  { id: 5, type: "file", size: "1.8 KB", title: "invoice - march product sales", favorite: false, tags: ["finance"] },
]

const savesSlice = createSlice({
  name: "saves",
  initialState: saves,
  reducers: {}
})


const userSlice = createSlice({
  name: "user",
  initialState: { id: "", email: "" },
  reducers: {}
})


export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    categories: categoriesSlice.reducer,
    saves: savesSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development'
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;