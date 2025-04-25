import { LogEntry } from "logora/module";
import { ConsoleOutputOptions } from "../config";
import { ConsoleColor } from "../enums/console-color.enum";
import moment from "moment";
import { LogType } from "logora";

/**
 * ConsoleFormatter handles the formatting, templating, and colorization
 * of log entries for the console output.
 */
export class ConsoleFormatter {
  constructor(private readonly options: ConsoleOutputOptions) {}

  /**
   * Composes a fully formatted log line from a structured log entry.
   * Includes timestamp, scope, label, and message.
   *
   * @param entry The log entry to format.
   * @param date The current date to use for timestamp formatting.
   * @returns A complete formatted string ready to print.
   */
  compose(entry: LogEntry, date: Date): string {
    const formattedMessage = this.format(entry.message, entry.args, this.getColor(entry.type));

    const scopePart = entry.scope
      ? `[${this.colorize(entry.scope, this.options.colors.scope)}] `
      : "";

    const label = this.getLabel(entry.type);
    const labelColor = this.getColor(entry.type);

    const labelPart = this.colorize(label, labelColor);
    const timestamp = this.colorize(moment(date).format(this.options.timestampFormat), this.options.colors.date);

    return `[${timestamp}] ${scopePart}${labelPart}: ${formattedMessage}`;
  }

  /**
   * Formats a message template by replacing placeholders with dynamic arguments.
   *
   * @param template The message template containing placeholders like `{0}`, `{1}`, etc.
   * @param args Values to inject into the template.
   * @param color Optional color to apply to the injected values.
   * @returns The formatted message string.
   */
  format(template: string, args: unknown[], color?: string): string {
    return template.replace(/{(\d+)}/g, (match, index) => {
      const val = args?.[Number(index)];
      return typeof val !== "undefined"
        ? color ? this.colorize(String(val), color) : String(val)
        : match;
    });
  }

  /**
   * Formats a title or section header for console display.
   *
   * @param title The text to display as a title.
   * @returns A formatted, colorized title string.
   */
  title(title: string): string {
    return this.colorize(title, this.options.colors.title);
  }

  /**
   * Formats a special date header when the day changes.
   *
   * @param date The date to format.
   * @returns A colorized date header string.
   */
  formatDateHeader(date: Date): string {
    const header = moment(date).format(this.options.dateHeaderFormat);
    return this.colorize(header, this.options.colors.emphasis);
  }

  /**
   * Applies ANSI color codes to a given text if colorization is enabled.
   *
   * @param text The text to colorize.
   * @param color The ANSI color code to apply.
   * @returns The colorized text or raw text if coloring is disabled.
   */
  private colorize(text: string, color: string): string {
    return this.options.useColors ? `${color}${text}${ConsoleColor.Reset}` : text;
  }

  /**
   * Resolves the appropriate color for a given log type.
   *
   * @param type The semantic log type (info, warning, error, etc.).
   * @returns The color code associated with the type.
   */
  private getColor(type: LogType): string {
    switch (type) {
      case LogType.Error:
        return this.options.colors.error;
      case LogType.Warning:
        return this.options.colors.warning;
      case LogType.Info:
        return this.options.colors.info;
      case LogType.Debug:
        return this.options.colors.debug;
      case LogType.Success:
        return this.options.colors.success;
      case LogType.Highlight:
        return this.options.colors.highlight;
      case LogType.Raw:
      default:
        return this.options.colors.text;      
    }
  }

  /**
   * Resolves the appropriate label to display for a given log type.
   *
   * @param type The semantic log type (info, warning, error, etc.).
   * @returns The uppercase label string or an empty string for raw messages.
   */
  private getLabel(type: LogType): string {
    switch (type) {
      case LogType.Error:
      case LogType.Warning:
      case LogType.Info:
      case LogType.Debug:
      case LogType.Success:
      case LogType.Highlight:
        return LogType[type];
      case LogType.Raw:
      default:
        return "";      
    }
  }
}
