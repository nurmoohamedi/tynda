import ru from "../constants/locale/ru";
import kk from "../constants/locale/kk";

const langMap = {
  ru,
  kk
};

export default function Messages(code) {
  const lang = localStorage.getItem('lang') || 'kk';
  return langMap[lang][code] || code;
}