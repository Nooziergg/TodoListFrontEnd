import dayjs from "dayjs";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("currency", (value, currency = "USD", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  });

  nuxtApp.provide("date", (value, format = "DD/MM/YYYY") => {
    // Helper function to check the date format
    function isDDMMYYYY(value) {
      const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
      return pattern.test(value);
    }

    // If the date is already in DD/MM/YYYY format, just return it
    if (isDDMMYYYY(value)) {
      return value;
    }

    // Otherwise, process with dayjs
    const formattedDate = dayjs(value).format(format);

    return formattedDate;
  });
});
