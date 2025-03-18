import { format } from "date-fns";
import { ko } from "date-fns/locale";

// 숫자 3자리마다 콤마를 추가
export const formatNumber = (input) => {
  const number = Number(input);

  if (isNaN(number)) {
    return "";
  }

  return number.toLocaleString();
};

// YYYY.MM.DD 형식으로 (timestamp 변환)
export const formatToDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return format(date, "yyyy년 MM월 dd일");
};

// a hh:mm 형식으로 시간 포맷 (Timestamp 변환)
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return format(date, "a hh:mm", { locale: ko });
};
