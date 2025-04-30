import { ConsoleOutputOptions } from "../config/console-output-options";
import { LogEntry } from "logora/module";
import { LogType } from "logora";
import { FieldFormatter } from "./field-formatter";
import { TemplateEngine } from "./template-engine";
import { ConsoleDefaults } from "./defaults";

/**
 * ConsoleFormatter is the main class responsible for composing
 * formatted log entries based on user-defined templates, styles, and rules.
 *
 * It delegates string formatting tasks to FieldFormatter and template parsing to TemplateEngine.
 */
export class ConsoleFormatter {
  private readonly fieldFormatter: FieldFormatter;
  private readonly templateEngine: TemplateEngine;

  constructor(private readonly options: ConsoleOutputOptions) {
    this.fieldFormatter = new FieldFormatter(options);
    this.templateEngine = new TemplateEngine();
  }

  /**
   * Composes a fully formatted and styled log entry string based on the format string template.
   *
   * This method dynamically replaces tokens (e.g., `%timestamp%`, `%scope%`, `%type%`, `%message%`)
   * and processes optional blocks in the template.
   *
   * @param entry - The log entry containing metadata (timestamp, type, scope, message, args).
   * @param date - The date to format (used for timestamp rendering).
   * @returns The fully formatted and styled output string ready for console display.
   */
  compose(entry: LogEntry, date: Date): string {
    let format = this.options.formatString ?? ConsoleDefaults.Log;

    // Step 1: Escape literal braces
    format = this.templateEngine.escapeBraces(format);

    // Step 2: Handle optional { ... } blocks
    format = this.templateEngine.processOptionalBlocks(format, entry);

    // Step 3: Replace standard %token% values
    format = this.templateEngine.replaceTokens(format, {
      timestamp: this.fieldFormatter.formatTimestamp(date),
      scope: this.fieldFormatter.formatScope(entry.scope ?? ""),
      type: this.fieldFormatter.formatType(entry.type),
      message: this.fieldFormatter.formatMessage(entry.message, entry.args, entry.type),
    });

    // Step 4: Restore literal braces
    format = this.templateEngine.restoreBraces(format);

    return format;
  }

  /**
   * Formats a raw message by injecting dynamic arguments and applying message styles.
   *
   * @param message - The raw message template.
   * @param args - The dynamic arguments to inject.
   * @param type - The log type for argument coloring (defaults to LogType.Info).
   * @returns The formatted and styled message string.
   */
  formatMessage(message: string, args: unknown[], type: LogType = LogType.Info): string {
    return this.fieldFormatter.formatMessage(message, args, type);
  }

  /**
   * Formats a styled title or section header.
   *
   * @param title - The title text to display.
   * @returns The formatted and styled title string.
   */
  formatTitle(title: string): string {
    return this.fieldFormatter.formatTitle(title);
  }

  /**
   * Formats a daily header for date transitions in the log output.
   *
   * @param date - The date to format for the daily header.
   * @returns The formatted and styled daily header string.
   */
  formatDailyHeader(date: Date): string {
    return this.fieldFormatter.formatDailyHeader(date);
  }
}
