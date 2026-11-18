import { configureStore, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Category, Collection, Tag, UserResource } from "../lib/db/types";

const categoriesAdapter = createEntityAdapter<Category>();

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCollection.fulfilled, (state) => {
      categoriesAdapter.updateOne(state, { id: 1, changes: { count: (state.entities[1]?.count ?? 0) + 1 } });
    }).addCase(addResource.fulfilled, (state) => {
      categoriesAdapter.updateOne(state, { id: 0, changes: { count: (state.entities[0]?.count ?? 0) + 1 } });
    });
  }
});

export const { selectAll: selectAllCategories } = categoriesAdapter.getSelectors((state: RootState) => state.categories);


const resourcesAdapter = createEntityAdapter<UserResource>();

export const addResource = createAsyncThunk("post/resources", (resource: UserResource) => resource);

const resourcesSlice = createSlice({
  name: "resources",
  initialState: resourcesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addResource.fulfilled, (state, action) => {
      resourcesAdapter.addOne(state, action.payload);
    })
  }
});

export const { selectAll: selectAllResources } = resourcesAdapter.getSelectors((state: RootState) => state.resources);


const tagsAdapter = createEntityAdapter<Tag>();

export const addTags = createAsyncThunk("post/tags", (tags: Tag[]) => tags)

const tagsSlice = createSlice({
  name: "tags",
  initialState: tagsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTags.fulfilled, (state, action) => {
      tagsAdapter.addMany(state, action.payload);
    })
  }
})

export const { selectAll: selectAllTags } = tagsAdapter.getSelectors((state: RootState) => state.tags);


const collectionsAdapter = createEntityAdapter<Collection>();

export const addCollection = createAsyncThunk("post/collections", (collection: Collection) => collection);

const collectionsSlice = createSlice({
  name: "collections",
  initialState: collectionsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCollection.fulfilled, (state, action) => {
      collectionsAdapter.addOne(state, action.payload);
    })
  }
})

export const { selectAll: selectAllCollections } = collectionsAdapter.getSelectors((state: RootState) => state.collections);


const userSlice = createSlice({
  name: "user",
  initialState: { id: "", email: "", name: "" },
  reducers: {},
});


export interface Store {
  user: {id: string; name: string; email: string};
  categories: Category[];
  resources: UserResource[];
  tags: Tag[];
  collections: Collection[];
}

export const makeStore = (preloadedState: Store) => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      categories: categoriesSlice.reducer,
      resources: resourcesSlice.reducer,
      tags: tagsSlice.reducer,
      collections: collectionsSlice.reducer
    },
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: {
      user: preloadedState.user,
      categories: categoriesAdapter.setAll(categoriesAdapter.getInitialState(), preloadedState.categories),
      resources: resourcesAdapter.setAll(resourcesAdapter.getInitialState(), preloadedState.resources),
      tags: tagsAdapter.setAll(tagsAdapter.getInitialState(), preloadedState.tags),
      collections: collectionsAdapter.setAll(collectionsAdapter.getInitialState(), preloadedState.collections),
    },
  });
};

type AppStore = ReturnType<typeof makeStore>;
type RootState = ReturnType<AppStore["getState"]>;
type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;