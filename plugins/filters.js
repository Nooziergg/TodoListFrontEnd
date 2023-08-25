export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("currency", (value, currency = "USD", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  });
});
