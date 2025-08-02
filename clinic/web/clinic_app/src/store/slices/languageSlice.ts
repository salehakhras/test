// src/store/slices/languageSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../i18n";

const storedLang = localStorage.getItem("language") || "en";

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: storedLang,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<"en" | "ar">) {
      state.language = action.payload;
      i18n.changeLanguage(action.payload); // update i18n
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
