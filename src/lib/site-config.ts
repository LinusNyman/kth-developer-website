// Midnight on 16 June 2026, Europe/Stockholm (CEST = UTC+2 in June)
export const GENERAL_MEETING_DATE = new Date("2026-06-10T22:00:00Z");

export const GENERAL_MEETING_DATE_DISPLAY = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Stockholm",
}).format(GENERAL_MEETING_DATE);
