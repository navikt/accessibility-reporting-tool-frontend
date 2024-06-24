import type { Language } from "@language/language";
import { useLanguage } from "@src/hooks/useLanguage";

interface Props {
  language: Language;
}

const LanguageRedirecter = ({language}: Props) => {
  useLanguage(language)
}

export default LanguageRedirecter;