import { ILogoraOutput } from "logora";
import { ILogoraWriter } from "logora/module";
import { ConsoleOutputOptions } from "../config";
import { ConsoleWriter } from "./console-writer";

/**
 * ConsoleOutput is a transport for Logora that renders log entries to the console.
 * 
 * It uses ANSI colors, timestamps, scoped labels, and structured formatting.
 * 
 * This output can be attached to any Logora logger instance to visualize logs
 * directly in the terminal or command line.
 */
export class ConsoleOutput implements ILogoraOutput {
  /** Name identifying the output transport. */
  name: string = "console";

  /** Configuration options controlling the console output behavior. */
  options: ConsoleOutputOptions;

  /** Writer instance responsible for rendering log entries. */
  writer: ILogoraWriter;

  /**
   * Creates a new ConsoleOutput instance with optional user configuration.
   *
   * @param config Optional partial configuration to customize colors, format, or behavior.
   */
  constructor(config?: Partial<ConsoleOutputOptions>) {
    this.options = new ConsoleOutputOptions(config);
    this.writer = new ConsoleWriter(this.options);
  }
}
