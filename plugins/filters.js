export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("currency", (value, currency = "USD", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  });

  nuxtApp.provide("date", (value, format = null) => {
    if (!value) return null;

    // If format 'YYYY-MM-DD' is passed, it converts 'DD/MM/YYYY' to 'YYYY-MM-DD'
    if (value.includes("/") && format === "YYYY-MM-DD") {
      const [day, month, year] = value.split("/");
      return `${year}-${month}-${day}`;
    }

    // If the date is in 'YYYY-MM-DD' format, it converts to 'DD/MM/YYYY'
    if (value.includes("-") && !format) {
      const [year, month, day] = value.split("-");
      return `${day}/${month}/${year}`;
    }

    return value; // If no specific format, return as-is
  });
});
