import { ArrowLeftRight } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setSource, setTarget, swap } from "../redux/slices/translateSlice";

const LanguageSelect = () => {
  const dispatch = useDispatch();
  const { isLoading, languages } = useSelector((store) => store.language);
  const { sourceLang, targetLang } = useSelector((store) => store.translate);

  //languages dizisini maplayip nesnelerin key değerlerini yeniden adlandır
  const formatted = useMemo(
    () =>
      languages?.map((item) => ({
        value: item.language,
        label: item.name,
      })),
    [languages]
  );

  //dili algıla seçeneği
  const detect = { value: undefined, label: "Dili algıla" };

  //react-select stilleri
  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#3f3f46",
      borderColor: state.isFocused ? "#3b82f6" : "#52525b",
      borderWidth: "2px",
      borderRadius: "12px",
      minHeight: "48px",
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": {
        borderColor: "#3b82f6",
      },
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#53535b"
        : "#3f3f46",
      color: state.isSelected ? "white" : "#e4e4e7",
      padding: "12px 16px",
      cursor: "pointer",
    }),
    menu: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#3f3f46",
      border: "1px solid #52525b",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    }),
    singleValue: (baseStyles, state) => ({
      ...baseStyles,
      color: "#e4e4e7",
    }),
    input: (baseStyles, state) => ({
      ...baseStyles,
      color: "#e4e4e7",
    }),
    Placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: "#a1a1aa",
    }),
  };

  //kaynak dil seçimi
  const handleSource = (lang) => {
    //seçilen dil hedef dille aynıysa ve seçilen dilin kaynağı tanımlıysa:
    if (lang.value === targetLang.value && sourceLang.value) {
      dispatch(swap());
      return;
    }

    //seçilen dil, hedef  dilin aynısı değilse değiştir
    if (lang.value != targetLang.value) {
      dispatch(setSource(lang));
    }
  };

  //hedef dil seçimi
  const handleTarget = (lang) => {
    if (lang.value === sourceLang.value) {
      dispatch(swap());
      return;
    }
    dispatch(setTarget(lang));
  };

  //dillerin yerini değiştir
  const handleSwap = () => {
    dispatch(swap());
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-col lg:flex-row">
        {/* Kaynak Dil */}
        <div className="flex-1 w-full">
          <label className="block text-sm text-zinc-300 mb-2">Kaynak Dil</label>
          <Select
            value={sourceLang}
            isDisabled={isLoading}
            isLoading={isLoading}
            options={[detect, ...formatted]}
            styles={customStyles}
            onChange={handleSource}
            className="text-sm text-black"
          />
        </div>

        {/* Değiştirme Butonu */}

        <div className="flex items-center justify-center">
          <button
            disabled={!sourceLang.value || isLoading}
            onClick={handleSwap}
            className="size-10 lg:size-12 bg-zinc-700 hover:bg-zinc-600 disabled:bg-zinc-800 disabled:opacity-50 rounded-full flex items-center justify-center group"
          >
            <ArrowLeftRight />
          </button>
        </div>

        {/* Hedef Dil */}
        <div className="flex-1 w-full">
          <label className="block text-sm text-zinc-300 mb-2">Hedef Dil</label>
          <Select
            value={targetLang}
            isDisabled={isLoading}
            isLoading={isLoading}
            options={formatted}
            styles={customStyles}
            onChange={handleTarget}
            className="text-sm text-black"
          />
        </div>
      </div>
      {/* Dil sayısı */}
      <div className="text-center">
        <p className="text-xs text-zinc-500">
          {languages.length} dil destekleniyor
        </p>
      </div>
    </div>
  );
};

export default LanguageSelect;
