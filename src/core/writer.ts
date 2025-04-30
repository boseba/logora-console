import type { ILogoraWriter, LogEntry } from "logora/module";
import { ConsoleFormatter } from "./formatter";
import { ConsoleOutputOptions } from "../config";

/**
 * ConsoleWriter implements the ILogoraWriter interface
 * to render log entries to the console with formatting, colors, and timestamps.
 */
export class ConsoleWriter implements ILogoraWriter {
  /** Timestamp of the last printed log entry, used to detect day changes. */
  private _lastLogDate: Date;

  /** Formatter responsible for applying colors, templates, and structure to log messages. */
  private readonly formatter: ConsoleFormatter;

  /**
   * Constructs a new ConsoleWriter instance.
   *
   * @param options Console output configuration controlling formatting and behavior.
   */
  constructor(private readonly options: ConsoleOutputOptions) {
    this._lastLogDate = new Date();
    this._lastLogDate.setDate(this._lastLogDate.getDate() - 1);
    this.formatter = new ConsoleFormatter(options);
  }

  /**
   * Processes and outputs a structured log entry.
   *
   * @param entry Log entry to render.
   */
  log(entry: LogEntry): void {
    const now = new Date();
    this.checkDailyHeader(now);

    const formatted = this.formatter.compose(entry, now);
    console.log(formatted);

    this._lastLogDate = now;
  }

  /**
   * Prints a raw formatted message without structured metadata.
   *
   * @param message Template string containing optional Placeholder.
   * @param args Dynamic values to inject into the message template.
   */
  print(message: string, ...args: unknown[]): void {
    const now = new Date();
    this.checkDailyHeader(now);

    const formatted = this.formatter.formatMessage(message, args);
    console.log(formatted);

    this._lastLogDate = now;
  }

  /**
   * Prints a styled title or section header to the console.
   *
   * @param title Text to display as a title.
   */
  title(title: string): void {
    const now = new Date();
    this.checkDailyHeader(now);

    const formatted = this.formatter.formatTitle(title);
    console.log(formatted);

    this._lastLogDate = now;
  }

  /**
   * Inserts one or more empty lines into the console output.
   *
   * @param count Number of empty lines to insert (defaults to 1).
   */
  empty(count: number = 1): void {
    console.log("\n".repeat(Math.max(0, count - 1)));
  }

  /**
   * Clears the console screen.
   */
  clear(): void {
    console.clear();
  }

  /**
   * Checks whether a daily header should be printed based on the current date.
   * 
   * If showDateHeader is disabled, or the current day matches the last printed day,
   * no header is printed. Otherwise, a new date header is inserted.
   *
   * @param now Current date and time.
   */
  private checkDailyHeader(now: Date): void {
    if (!this.options.showDateHeader) {
      return;
    }

    if (
      this.options.showDateHeader &&
      now.getDate() !== this._lastLogDate.getDate()
    ) {
      const header = this.formatter.formatDailyHeader(now);
      console.log("\n" + header + "\n");
    }
  }
}
