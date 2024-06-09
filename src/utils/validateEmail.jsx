export const validateEmail = (text) => {
  // 역슬래시 -> 검색할 패턴 객체를 만들어냄.
  // ^ -> 문자열시작, $-> 문자열끝까지 탐색하는걸 의미
  // [^] -> 해당부분을 제외할 것
  // + -> 뒤의 표현식이 포함될 것
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(text)) {
    return text;
  }
  return null;
};
