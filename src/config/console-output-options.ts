import { ConsoleColor } from "../enums/console-color.enum";
import { ConsolePalette } from "../config/console-palette";
import { ILogoraOutputOptions, LogLevel } from "logora";

/**
 * Configuration options for the `createConsoleOutput()` function.
 * 
 * Defines the console output behavior, including levels, colors, timestamp formats, and header rendering.
 */
export class ConsoleOutputOptions implements ILogoraOutputOptions {
  /**
   * Minimum log level to display.
   * Entries below this level are ignored by the output.
   *
   * Default: LogLevel.Info
   */
  level?: LogLevel;

  /**
   * Whether to apply ANSI colors to the console output.
   *
   * Default: true
   */
  useColors: boolean = true;

  /**
   * Format string for timestamps displayed with each log entry.
   * Follows moment.js formatting (e.g., "HH:mm:ss").
   *
   * Default: "HH:mm:ss"
   */
  timestampFormat: string = "HH:mm:ss";

  /**
   * Optional format for rendering a daily date header when the day changes.
   * Follows moment.js formatting (e.g., "MMMM Do YYYY, hh:mm:ss").
   *
   * Default: "MMMM Do YYYY, hh:mm:ss"
   */
  dateHeaderFormat: string = "MMMM Do YYYY, hh:mm:ss";

  /**
   * Whether to print a header separator when the day changes.
   * If true, a formatted date header will be inserted automatically.
   *
   * Default: true
   */
  showDateHeader: boolean = true;

  /**
   * Optional color to apply specifically to scope labels.
   * Overrides the scope color defined in the palette if provided.
   *
   * Default: ConsoleColor.Bright
   */
  scopeColor: ConsoleColor = ConsoleColor.Bright;

  /**
   * Palette of colors used for different log types and sections.
   * If a partial palette is provided by the user, it is merged into the default ConsolePalette.
   */
  colors: ConsolePalette = new ConsolePalette();

  /**
   * Constructs a new ConsoleOutputOptions instance,
   * applying default values and overriding them with any provided configuration.
   *
   * @param overrides Optional partial configuration to customize behavior.
   */
  constructor(overrides?: Partial<ConsoleOutputOptions>) {
    Object.assign(this, overrides);
  }
}
