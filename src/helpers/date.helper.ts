import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Centralises every date-related helper for Logora-console.
 */
export class DateHelper {
  /**
   * Formats a Date with a Day.js pattern.
   *
   * @param date    Native JS date.
   * @param pattern Day.js format string (e.g. "HH:mm:ss").
   */
  static format(date: Date, pattern: string): string {
    return dayjs(date).format(pattern);
  }

  /**
   * Returns true if both dates fall on the same calendar day.
   */
  static isSameDay(a: Date, b: Date): boolean {
    return dayjs(a).isSame(b, "day");
  }
}