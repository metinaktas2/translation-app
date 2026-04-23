import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// dil listesini getirexek asenkron thunk aksiyonu oluştur
export const getLanguages = createAsyncThunk(
  "language/getLanguages",
  async () => {
    //api isteği
    const res = await api.get("/languages");

    //aksiyonun payload'ını return et
    return res.data.languages;
  }
);

//çeviri işlemini gerçekleştirecek asenkron thunk aksiyonu
export const translateText = createAsyncThunk(
  "translate/translateText",
  async (_, { getState }) => {
    const { translate } = getState();

    //api'ya çeviri için istek at
    const res = await api.post("", {
      q: translate.textToTranslate,
      source: translate.sourceLang.value,
      target: translate.targetLang.value,
    });

    //aksiyonun payloadı olarak çeviri sonucunu return et
    return res.data.data.translations.translatedText[0];
  }
);
