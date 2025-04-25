import { ConsoleOutputOptions, ConsolePalette } from "./config";
import { ConsoleOutput } from "./core/console-output";

export * from "./config";
export * from "./enums";

/**
 * Creates a new console output transport for Logora.
 *
 * This function initializes a ConsoleOutput instance, which can be
 * attached to a Logora logger to handle console-based log rendering
 * with colors, formatting, timestamps, and scoped messages.
 *
 * @param config Optional partial configuration to customize colors, formats, or behavior.
 * @returns A fully initialized ConsoleOutput instance ready to use with Logora.
 *
 * @example
 * ```ts
 * import { createConsoleOutput } from "logora-console";
 * 
 * const consoleOutput = createConsoleOutput({
 *   timestampFormat: "HH:mm:ss",
 *   useColors: true
 * });
 * 
 * logger.addLogOutput(consoleOutput);
 * ```
 */
export function createConsoleOutput(config?: Partial<ConsoleOutputOptions>): ConsoleOutput {
  const options = new ConsoleOutputOptions(config);
  const palette = new ConsolePalette(options.colors);

  options.colors = palette;
  
  return new ConsoleOutput(options);
}
