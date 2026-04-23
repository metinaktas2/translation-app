import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setText } from "../redux/slices/translateSlice";
import Loader from "./loader";

const TextContainer = () => {
  const { isLoading, translatedText, textToTranslate } = useSelector(
    (store) => store.translate
  );
  const dispatch = useDispatch();

  //metni temizle
  const handleClear = () => {
    dispatch(setText(""));
  };

  //metni kopyala
  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
    }
  };
  return (
    <div className="flex gap-4 mt-6 lg:gap-8 flex-col lg:flex-row">
      {/* Kaynak Dil */}
      <div className="flex-1 ">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="source" className="text-sm text-zinc-300">
            Çevrilecek Metin
          </label>
          {textToTranslate && (
            <button
              onClick={handleClear}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              Temizle
            </button>
          )}
        </div>

        <div className="relative">
          <textarea
            id="source"
            className="textarea"
            placeholder="Çevirmek istediğiniz metni buraya yazınız..."
            onChange={(e) => dispatch(setText(e.target.value))}
            value={textToTranslate}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-xs text-white bg-zinc-600 rounded-md p-1">
            {textToTranslate.length} karakter
          </div>
        </div>
      </div>

      {/* İkon */}
      <div className="flex items-center justify-center lg:flex-col">
        <div className="size-8 lg:size-12 bg-blue-600 rounded-full grid place-items-center">
          <ArrowRight className="size-4 lg:size-6  transform rotate-90 lg:rotate-0" />
        </div>
      </div>

      {/* Hedef Dil */}
      <div className="flex-1 ">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="target" className="text-sm text-zinc-300">
            Çevrilmiş Metin
          </label>
          {translatedText && (
            <button
              onClick={handleCopy}
              className="text-xs text-zinc-400 hover:text-zinc-200"
            >
              Kopyala
            </button>
          )}
        </div>

        <div className="relative">
          <textarea
            disabled
            value={translatedText}
            id="target"
            className="textarea text-gray-300"
          ></textarea>

          {isLoading && <Loader />}
          {!isLoading && !translatedText && !textToTranslate && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-zinc-500 text-sm">Çeviri bekleniyor</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextContainer;
