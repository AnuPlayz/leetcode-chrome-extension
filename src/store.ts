import { configureStore, createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        uid: localStorage.getItem("uid"),
        problems: null,
        problemsData: null,
    },
    reducers: {
        setUid(state, action) {
            localStorage.setItem("uid", action.payload);
            state.uid = action.payload;
        },
        setProblems(state, action) {
            state.problems = action.payload;
        },
        setProblemsData(state, action) {
            state.problemsData = action.payload;
        }
    }
});

const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
    }
});

export default store;

export const { setUid, setProblems, setProblemsData } = accountSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;