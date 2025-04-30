import { ConsoleColor } from "../enums";

/**
 * Defines the ANSI color palette for console output rendering.
 * 
 * Each property corresponds to a semantic role in the log message display.
 * The palette can be customized to match different visual themes or preferences.
 */
export class ConsolePalette {
  /** Text color used for standard log message content. */
  static readonly Text: ConsoleColor = ConsoleColor.Reset;

  /** Color used for titles and section headers. */
  static readonly Title: ConsoleColor = ConsoleColor.Bright;

  /** Color used for timestamps displayed with log entries. */
  static readonly Timestamp: ConsoleColor = ConsoleColor.Gray;

  /** Color used for success messages indicating positive outcomes. */
  static readonly Success: ConsoleColor = ConsoleColor.Green;

  /** Color used for warning messages indicating potential issues. */
  static readonly Warning: ConsoleColor = ConsoleColor.Yellow;

  /** Color used for informational messages about application events. */
  static readonly Info: ConsoleColor = ConsoleColor.Cyan;

  /** Color used for debug messages useful during development. */
  static readonly Debug: ConsoleColor = ConsoleColor.Gray;

  /** Color used for error messages indicating critical failures. */
  static readonly Error: ConsoleColor = ConsoleColor.Red;

  /** Color used for specially highlighted or emphasized messages. */
  static readonly Highlight: ConsoleColor = ConsoleColor.Magenta;

  /** Color used to emphasize dynamic values inserted into templates. */
  static readonly Emphasis: ConsoleColor = ConsoleColor.White;

  /** Color used for displaying the scope label in scoped loggers. */
  static readonly Scope: ConsoleColor = ConsoleColor.Bright;
}
