import { ConsoleColor } from "../enums";
import { Modifier } from "../enums/modifier.enum";

/**
 * Generic formatting rules for any string element (e.g., scope, message).
 */
export interface IStringFormat {
  /**
   * Color to apply to the text.
   */
  color?: ConsoleColor;

  /**
   * Modifier to transform the text (uppercase, lowercase, capitalize).
   */
  modifier?: Modifier;
}

/**
 * Formatting rules specific to the daily date header inserted when the date changes.
 */
export interface IDailyDateFormat extends IStringFormat {
  /**
   * Format used to transform the date value (e.g., "MMMM Do YYYY, HH:mm:ss").
   */
  format: string;

  /**
   * Template string including placeholders for rendering the daily header.
   * Example: "[%dailyHeader%]"
   */
  formatString: string;
}

/**
 * Formatting rules specific to timestamps included in log entries.
 */
export interface ITimestampFormat extends IStringFormat {
  /**
   * Format used to transform the timestamp value (e.g., "HH:mm:ss").
   */
  format?: string;
}

/**
 * Formatting rules for different log types (debug, info, success, warning, error, highlight).
 */
export interface ILogTypeFormats {
  /**
   * Global color to apply if a type-specific color is not defined.
   */
  color?: ConsoleColor;

  /**
   * Global modifier to apply if a type-specific modifier is not defined.
   */
  modifier?: Modifier;

  /**
   * Color to apply to additional arguments in the log (optional).
   */
  argsColor?: ConsoleColor;

  /**
   * Specific formatting rules for "debug" logs.
   */
  debug?: ILogTypeFormat;

  /**
   * Specific formatting rules for "info" logs.
   */
  info?: ILogTypeFormat;

  /**
   * Specific formatting rules for "success" logs.
   */
  success?: ILogTypeFormat;

  /**
   * Specific formatting rules for "warning" logs.
   */
  warning?: ILogTypeFormat;

  /**
   * Specific formatting rules for "error" logs.
   */
  error?: ILogTypeFormat;

  /**
   * Specific formatting rules for "highlight" logs (special emphasis).
   */
  highlight?: ILogTypeFormat;
}

/**
 * Detailed formatting options for an individual log type.
 */
export interface ILogTypeFormat extends IStringFormat {
  /**
   * Color to apply to additional arguments when logging with this type.
   */
  argsColor?: ConsoleColor;
}
