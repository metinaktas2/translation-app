import { createSlice } from "@reduxjs/toolkit";
import { translateText } from "../actions";

const initialState = {
  isLoading: false,
  error: null,
  sourceLang: { value: undefined, label: "Dili algıla" },
  targetLang: { value: "en", label: "English" },
  textToTranslate: "",
  translatedText: "",
  history: [],
};

const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    setSource: (state, { payload }) => {
      state.sourceLang = payload;
    },
    setTarget: (state, { payload }) => {
      state.targetLang = payload;
    },
    setText: (state, { payload }) => {
      state.textToTranslate = payload;
    },
    swap: (state) => {
      const currentSource = state.sourceLang;
      const currentLang = state.targetLang;
      const currentText = state.textToTranslate;
      const currentTranslated = state.translatedText;

      state.sourceLang = currentLang;
      state.targetLang = currentSource;
      state.textToTranslate = currentTranslated;
      state.translatedText = currentText;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(translateText.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.translateText = "";
    });

    builder.addCase(translateText.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message;
    });

    builder.addCase(translateText.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.translatedText = payload;

      //translate'i geçmişe kaydet
      if (state.textToTranslate && payload) {
        state.history.unshift({
          id: Date.now(),
          textToTranslate: state.textToTranslate,
          translatedText: payload,
          sourceLang: state.sourceLang,
          targetLang: state.targetLang,
          timestamp: new Date().toLocaleDateString("tr"),
        });
      }
    });
  },
});
export const { setSource, setTarget, setText, swap, clearHistory } =
  translateSlice.actions;
export default translateSlice.reducer;
