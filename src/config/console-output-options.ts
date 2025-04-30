import { ILogoraOutputOptions, LogLevel } from "logora";
import { ConsoleDefaults } from "../core/defaults";
import { ConsolePalette } from "../core/palette";
import { ILogEntryFormats } from "../models/log-entry-formats.interface";

/**
 * Configuration options for the `createConsoleOutput()` function.
 * 
 * Defines the console output behavior, including minimum log level, ANSI coloring,
 * timestamp formatting, and optional daily header insertion.
 */
export class ConsoleOutputOptions implements ILogoraOutputOptions {
  /**
   * Minimum log level to display.
   * Entries with a lower level will be ignored by the output.
   *
   * Default behavior: LogLevel.Info (if not explicitly overridden).
   */
  level?: LogLevel;

  /**
   * Whether to apply ANSI colors to the console output.
   *
   * Default: true
   */
  useColors: boolean = true;

  /**
   * Whether to automatically print a header when the date changes.
   * If enabled, a formatted date line will be inserted between log entries.
   *
   * Default: true
   */
  showDateHeader: boolean = true;

  /**
   * Format string describing how each log entry is structured.
   * Placeholders like [%timestamp%], [%scope%], %type%, and %message% are supported.
   *
   * Default: ConsoleDefaults.Log
   */
  formatString: string = ConsoleDefaults.Log;

  /**
   * Fine-grained formatting rules for specific parts of log entries (timestamp, date header, etc.).
   * Unspecified elements fall back to default settings.
   */
  logFormat: Partial<ILogEntryFormats> = {
    dailyDateHeader: { format: ConsoleDefaults.DailyHeaderDateFormat, formatString: ConsoleDefaults.DailyHeader, color: ConsolePalette.Emphasis },
    timestamp: { format: ConsoleDefaults.TimestampFormat, color: ConsolePalette.Timestamp },
  };

  /**
   * Constructs a new instance of ConsoleOutputOptions,
   * applying default values and optionally overriding them with the provided configuration.
   *
   * @param overrides Optional partial object to customize the output configuration.
   */
  constructor(overrides?: Partial<ConsoleOutputOptions>) {
    Object.assign(this, overrides);
  }
}
