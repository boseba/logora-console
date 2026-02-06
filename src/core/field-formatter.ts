import { LogType } from "logora";
import { ConsoleOutputOptions } from "../config/console-output-options";
import { Modifier } from "../enums";
import { ConsoleColor } from "../enums/color.enum";
import { Placeholder } from "../enums/placeholder.enum";
import { IStringFormat } from "../models/formats.interface";
import { ConsoleDefaults } from "./defaults";
import { ConsolePalette } from "./palette";
import dayjs from "dayjs";

/**
 * Formats log entries into styled console output based on user configuration.
 *
 * Supports dynamic template parsing, conditional rendering,
 * token replacement, and ANSI colorization.
 */
export class FieldFormatter {
  constructor(private readonly options: ConsoleOutputOptions) {}

  /**
   * Formats the message body of a log entry.
   * Replaces template placeholders with provided arguments and applies styling.
   *
   * @param message - The raw message template.
   * @param args - The list of arguments to inject into the message.
   * @param argsColor - The color to apply to inserted arguments (optional).
   * @returns The formatted and colorized message string.
   */
  formatMessage(
    message: string,
    args: unknown[],
    type: LogType
  ): string {
    const argsColor = this.getMessageEmphasisColor(type);
    const filled = this.fillTemplate(message, args, argsColor);
    const modified = this.applyModifier(
      filled,
      this.options.logFormat?.message?.modifier
    );
    return this.colorize(
      modified,
      this.options.logFormat?.message?.color ?? ConsolePalette.Text
    );
  }

  /**
   * Formats a title or section header.
   * Applies optional color styling.
   *
   * @param title - The title text to format.
   * @returns The formatted and colorized title string.
   */
  formatTitle(title: string): string {
    return this.colorize(
      title,
      this.options.logFormat?.title?.color ?? ConsolePalette.Title
    );
  }

  /**
   * Formats a daily header line for when the date changes during logging.
   * Uses a configurable format template and styles.
   *
   * @param date - The date to format for the header.
   * @returns The formatted and colorized daily header string.
   */
  formatDailyHeader(date: Date): string {
    const header = this.options.logFormat.dailyDateHeader?.formatString.replace(
      Placeholder.DailyHeader,
      dayjs(date).format(
        this.options.logFormat.dailyDateHeader?.format ??
          ConsoleDefaults.DailyHeaderDateFormat
      )
    );
    return this.colorize(
      header?? "",
      this.options.logFormat?.dailyDateHeader?.color ?? ConsolePalette.Emphasis
    );
  }

  /**
   * Formats the timestamp field of a log entry.
   * Applies optional format, color, and text transformation.
   *
   * @param date - The date to format.
   * @returns The formatted and colorized timestamp string.
   */
  formatTimestamp(date: Date): string {
    const format =
      this.options.logFormat?.timestamp?.format ??
      ConsoleDefaults.TimestampFormat;
    const raw = dayjs(date).format(format);
    const modified = this.applyModifier(
      raw,
      this.options.logFormat?.timestamp?.modifier
    );
    return this.colorize(
      modified,
      this.options.logFormat?.timestamp?.color ?? ConsolePalette.Timestamp
    );
  }

  /**
   * Formats the scope label of a log entry, if provided.
   * Applies optional color and modifier transformation.
   *
   * @param scope - The scope string to format.
   * @returns The formatted and colorized scope string.
   */
  formatScope(scope: string): string {
    const modified = this.applyModifier(
      scope,
      this.options.logFormat?.scope?.modifier
    );
    return this.colorize(
      modified,
      this.options.logFormat?.scope?.color ?? ConsolePalette.Scope
    );
  }

  /**
   * Formats the log type label (e.g., info, warning, error) of a log entry.
   * Applies type-specific formatting if available.
   *
   * @param type - The log type enum value.
   * @returns The formatted and colorized type label string.
   */
  formatType(type: LogType): string {
    const format = this.getTypeFormat(type);

    const modifiedType = this.applyModifier(LogType[type], format.modifier);

    return this.colorize(modifiedType, format.color);
  }

  /**
   * Retrieves the formatting configuration for a specific log type.
   * Falls back to global formatting if a specific type format is not defined.
   *
   * @param type - The log type to retrieve formatting for.
   * @returns The corresponding formatting rules.
   */
  private getTypeFormat(type: LogType): IStringFormat {
    let format: IStringFormat;
    switch (type) {
      case LogType.Info:
        format = this.options.logFormat?.type?.info ?? {
          color: this.options.logFormat?.type?.color ?? ConsolePalette.Info,
          modifier: this.options.logFormat?.type?.modifier,
        };
        break;
      case LogType.Success:
        format = this.options.logFormat?.type?.success ?? {
          color: this.options.logFormat?.type?.color ?? ConsolePalette.Success,
          modifier: this.options.logFormat?.type?.modifier,
        };
        break;
      case LogType.Warning:
        format = this.options.logFormat?.type?.warning ?? {
          color: this.options.logFormat?.type?.color ?? ConsolePalette.Warning,
          modifier: this.options.logFormat?.type?.modifier,
        };
        break;
      case LogType.Error:
        format = this.options.logFormat?.type?.error ?? {
          color: this.options.logFormat?.type?.color ?? ConsolePalette.Error,
          modifier: this.options.logFormat?.type?.modifier,
        };
        break;
      case LogType.Debug:
        format = this.options.logFormat?.type?.debug ?? {
          color: this.options.logFormat?.type?.color ?? ConsolePalette.Debug,
          modifier: this.options.logFormat?.type?.modifier,
        };
        break;
      case LogType.Highlight:
        format = this.options.logFormat?.type?.highlight ?? {
          color:
            this.options.logFormat?.type?.color ?? ConsolePalette.Highlight,
          modifier: this.options.logFormat?.type?.modifier,
        };
        break;
      default:
        format = {};
    }

    return format;
  }

  /**
   * Retrieves the color based on the message type
   *
   * @param type - The log type to retrieve argument color for.
   * @returns The color to use for arguments, or null if none defined.
   */
  private getMessageEmphasisColor(type: LogType): ConsoleColor | null {
    switch (type) {
      case LogType.Info:
        return (
          this.options.logFormat?.type?.info?.argsColor ??
          this.options.logFormat?.type?.argsColor ??
          this.options.logFormat?.type?.info?.color ??
          this.options.logFormat?.type?.color ??
          ConsolePalette.Info
        );
      case LogType.Success:
        return (
          this.options.logFormat?.type?.success?.argsColor ??
          this.options.logFormat?.type?.argsColor ??
          this.options.logFormat?.type?.success?.color ??
          this.options.logFormat?.type?.color ??
          ConsolePalette.Success
        );
      case LogType.Warning:
        return (
          this.options.logFormat?.type?.warning?.argsColor ??
          this.options.logFormat?.type?.argsColor ??
          this.options.logFormat?.type?.warning?.color ??
          this.options.logFormat?.type?.color ??
          ConsolePalette.Warning
        );
      case LogType.Error:
        return (
          this.options.logFormat?.type?.error?.argsColor ??
          this.options.logFormat?.type?.argsColor ??
          this.options.logFormat?.type?.error?.color ??
          this.options.logFormat?.type?.color ??
          ConsolePalette.Error
        );
      case LogType.Debug:
        return (
          this.options.logFormat?.type?.debug?.argsColor ??
          this.options.logFormat?.type?.argsColor ??
          this.options.logFormat?.type?.debug?.color ??
          this.options.logFormat?.type?.color ??
          ConsolePalette.Debug
        );
      case LogType.Highlight:
        return (
          this.options.logFormat?.type?.highlight?.argsColor ??
          this.options.logFormat?.type?.argsColor ??
          this.options.logFormat?.type?.highlight?.color ??
          this.options.logFormat?.type?.color ??
          ConsolePalette.Highlight
        );
      default:
        return null;
    }
  }

  /**
   * Applies a text transformation based on the provided modifier.
   *
   * Supported modifiers:
   * - `Uppercase`
   * - `Lowercase`
   * - `Capitalize`
   *
   * @param text - The text to transform.
   * @param modifier - The modifier type to apply (optional).
   * @returns The transformed text.
   */
  private applyModifier(text: string, modifier?: Modifier): string {
    switch (modifier) {
      case Modifier.Uppercase:
        return text.toUpperCase();
      case Modifier.Lowercase:
        return text.toLowerCase();
      case Modifier.Capitalize:
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
      default:
        return text;
    }
  }

  /**
   * Applies ANSI color codes to the text if colorization is enabled.
   *
   * @param text - The text to colorize.
   * @param color - The ConsoleColor code to apply.
   * @returns The colorized or raw text.
   */
  private colorize(text: string, color?: ConsoleColor): string {
    if (!this.options.useColors || !color) {
      return text;
    }
    return `${color}${text}${
      this.options.logFormat.text?.color ?? ConsolePalette.Text
    }`;
  }
  /**
   * Replaces placeholders like {0}, {1}, etc. in a template with corresponding argument values.
   * Optionally applies color to injected arguments.
   *
   * @param template - The template string containing placeholders.
   * @param args - The array of arguments to insert.
   * @param argsColor - The color to apply to injected arguments (optional).
   * @returns The filled template string.
   */
  private fillTemplate(template: string, args: unknown[], argsColor?: ConsoleColor | null): string {
    return template.replace(/{(\d+)}/g, (match, index) => {
      const val = args?.[Number(index)];
      return typeof val !== "undefined"
        ? argsColor
          ? this.colorize(String(val), argsColor)
          : String(val)
        : match;
    });
  }
}
