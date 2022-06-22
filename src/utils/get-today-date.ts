export function getTodayDate() {
  const today = new Date();
  const offset = today.getTimezoneOffset();
  const myDate = new Date(today.getTime() - offset * 60 * 1000).toISOString().split('T')[0];

  return myDate;
}
