import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

type IconName = "bookmark" | "directory" | "star" | "archive";

interface Category {
  id: number;
  icon: IconName;
  count: number;
  title: string;
}

const categories: Category[] = [
  { id: 0, icon: "bookmark", count: 248, title: "total saves" },
  { id: 1, icon: "directory", count: 12, title: "collections" },
];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categories,
  reducers: {
    setCategories: (_, action: PayloadAction<Category[]>) => action.payload,
    setCollectionCount: (state, action: PayloadAction<number>) => {
  const collectionCategory = state.find(
    (category) => category.title === "collections"
  );

  if (collectionCategory) {
    collectionCategory.count = action.payload;
  }
},
  },
});


type SavesIconName = "link" | "file" | "note";

export interface Save {
  id: string;
  type: SavesIconName;
  url?: string;
  hostname?: string;
  size?: number;
  data?: string;
  text?: string;
  edited?: string;
  title: string;
  summary?: string;
  description?: string;
  favorite: boolean;
  tags: string[];
  tagIds?: string[];
  collection_id?: string;
  created_at?: string;
  updated_at?: string;
}

const savesSlice = createSlice({
  name: "saves",
  initialState: [] as Save[],
  reducers: {
    setSaves: (_, action: PayloadAction<Save[]>) => action.payload,

    addSave: (state, action: PayloadAction<Save>) => {
      state.unshift(action.payload);
    },

    removeSave: (state, action: PayloadAction<string>) => {
      return state.filter((save) => save.id !== action.payload);
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const save = state.find((item) => item.id === action.payload);

      if (save) {
        save.favorite = !save.favorite;
      }
    },
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: { id: "", email: "" },
  reducers: {},
});

export const {
  setSaves,
  addSave,
  removeSave,
  toggleFavorite,
} = savesSlice.actions;

export const { setCategories, setCollectionCount } =
  categoriesSlice.actions;
export const makeStore = (userPreloadState: {
  id: string;
  email: string;
}) => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      categories: categoriesSlice.reducer,
      saves: savesSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: {
      user: userPreloadState,
    },
  });
};

type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;