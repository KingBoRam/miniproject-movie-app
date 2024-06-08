export const validateEmail = (text) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(text)) {
    return text;
  }
  return null;
};
