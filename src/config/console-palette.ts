import { ConsoleColor } from "../enums";

/**
 * Defines the ANSI color palette for console output rendering.
 * 
 * Each property corresponds to a semantic role in the log message display.
 * The palette can be customized to match different visual themes or preferences.
 */
export class ConsolePalette {
  /** Text color used for standard log message content. */
  text: ConsoleColor = ConsoleColor.Reset;

  /** Color used for titles and section headers. */
  title: ConsoleColor = ConsoleColor.Bright;

  /** Color used for timestamps displayed with log entries. */
  date: ConsoleColor = ConsoleColor.Gray;

  /** Color used for success messages indicating positive outcomes. */
  success: ConsoleColor = ConsoleColor.Green;

  /** Color used for warning messages indicating potential issues. */
  warning: ConsoleColor = ConsoleColor.Yellow;

  /** Color used for informational messages about application events. */
  info: ConsoleColor = ConsoleColor.Cyan;

  /** Color used for debug messages useful during development. */
  debug: ConsoleColor = ConsoleColor.Gray;

  /** Color used for error messages indicating critical failures. */
  error: ConsoleColor = ConsoleColor.Red;

  /** Color used for specially highlighted or emphasized messages. */
  highlight: ConsoleColor = ConsoleColor.Magenta;

  /** Color used to emphasize dynamic values inserted into templates. */
  emphasis: ConsoleColor = ConsoleColor.White;

  /** Color used for displaying the scope label in scoped loggers. */
  scope: ConsoleColor = ConsoleColor.Bright;

  /**
   * Constructs a new ConsolePalette instance,
   * allowing specific colors to be overridden via a partial palette.
   *
   * @param overrides Optional partial color palette to override defaults.
   */
  constructor(overrides?: Partial<ConsolePalette>) {
    Object.assign(this, overrides);
  }
}
