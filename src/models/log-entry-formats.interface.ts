import { IDailyDateFormat, ILogTypeFormats, IStringFormat, ITimestampFormat } from "./formats.interface";

/**
 * Defines how each component of a log entry should be formatted.
 * 
 * This interface provides granular control over the appearance of elements
 * like timestamps, scopes, types, messages, etc.
 */
export interface ILogEntryFormats {
  /**
   * Formatting rules for the daily date header inserted when the date changes.
   * 
   * This field is mandatory to ensure consistent rendering of date separators.
   */
  dailyDateHeader: IDailyDateFormat;

  /**
   * Formatting rules for the timestamp displayed on each log entry.
   * 
   * Example: "[15:45:32]"
   */
  timestamp?: ITimestampFormat;

  /**
   * Formatting rules for the type label associated with a log entry (debug, info, error, etc.).
   * 
   * Example: "info", "warning", "error"
   */
  type?: ILogTypeFormats;

  /**
   * Formatting rules for the main message text of the log entry.
   * 
   * Example: "User login successful."
   */
  message?: IStringFormat;

  /**
   * Formatting rules for the scope label of the log entry (e.g., the module or service name).
   * 
   * Example: "AuthService"
   */
  scope?: IStringFormat;

  /**
   * Formatting rules for other text elements that composes the message.
   */
  text?: IStringFormat;

  /**
   * Formatting rules for titles, such as section headings or emphasized messages.
   * 
   * Example: "=== System Startup ==="
   */
  title?: IStringFormat;
}
