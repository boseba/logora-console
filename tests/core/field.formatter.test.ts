import { describe, it, expect, beforeEach } from "vitest";
import { LogType } from "logora";
import { FieldFormatter } from "../../src/core/field-formatter";
import { ConsoleOutputOptions } from "../../src/config";
import { ConsoleColor, Modifier } from "../../src/enums";
import { Placeholder } from "../../src/enums/placeholder.enum";
import { ConsolePalette } from "../../src/core/palette";

describe("FieldFormatter", () => {
  let formatter: FieldFormatter;
  let options: ConsoleOutputOptions;

  beforeEach(() => {
    options = new ConsoleOutputOptions({
      useColors: true,
      logFormat: {
        timestamp: { format: "HH:mm:ss", color: ConsoleColor.Gray },
        scope: { color: ConsoleColor.Cyan, modifier: Modifier.Capitalize },
        message: { color: ConsoleColor.White, modifier: Modifier.Uppercase },
        title: { color: ConsoleColor.Magenta },
        dailyDateHeader: {
          format: "YYYY-MM-DD",
          formatString: `[${Placeholder.DailyHeader}]`,
          color: ConsoleColor.Yellow
        },
        type: {
          color: ConsoleColor.Bright,
          modifier: Modifier.Lowercase,
          error: { color: ConsoleColor.Red, modifier: Modifier.Uppercase, argsColor: ConsoleColor.Magenta },
          warning: { color: ConsoleColor.Yellow },
          success: { color: ConsoleColor.Green },
          debug: { color: ConsoleColor.Gray },
          highlight: { color: ConsoleColor.Magenta }
        },
        text: { color: ConsoleColor.Reset }
      }
    });
    formatter = new FieldFormatter(options);
  });

  it("should format timestamp with modifier and color", () => {
    const date = new Date("2024-04-01T10:00:00");
    const result = formatter.formatTimestamp(date);
    expect(result).toBe(`${options.logFormat.timestamp?.color}10:00:00${options.logFormat.text?.color}`);
  });

  it("should format scope with capitalize modifier", () => {
    const result = stripAnsi(formatter.formatScope("system"));
    expect(result).toBe("System");
  });

  it("should format type with specific color and modifier", () => {
    const result = formatter.formatType(LogType.Error);
    expect(result).toBe(`${options.logFormat.type?.error?.color}ERROR${options.logFormat.text?.color}`);
  });

  it("should format type with default fallback color and modifier", () => {
    const result = formatter.formatType(LogType.Info);
    expect(result).toBe(`${options.logFormat.type?.color}info${options.logFormat.text?.color}`);
  });

  it("should format title with correct color", () => {
    const result = formatter.formatTitle("Launch Started");
    expect(result).toBe(`${options.logFormat.title?.color}Launch Started${options.logFormat.text?.color}`);
  });

  it("should format daily header with date formatting", () => {
    const date = new Date("2024-04-01T00:00:00");
    const result = stripAnsi(formatter.formatDailyHeader(date));
    expect(result).toContain("2024-04-01");
  });

  it("should format message with color and modifier", () => {
    const result = stripAnsi(
      formatter.formatMessage("User {0} added", ["Alice"], LogType.Error)
    );
    expect(result).toContain(`USER ${options.logFormat.type?.error?.argsColor?.toUpperCase()}ALICE${options.logFormat.text?.color?.toUpperCase()} ADDED`);
  });

  it("should format message with null argsColor fallback", () => {
    const result = stripAnsi(formatter["fillTemplate"]("Error: {0}", ["Timeout"], null));
    expect(result).toBe("Error: Timeout");
  });

  it("should apply modifiers correctly", () => {
    expect(formatter["applyModifier"]("test", Modifier.Uppercase)).toBe("TEST");
    expect(formatter["applyModifier"]("TeSt", Modifier.Lowercase)).toBe("test");
    expect(formatter["applyModifier"]("eRRor", Modifier.Capitalize)).toBe("Error");
    expect(formatter["applyModifier"]("unchanged")).toBe("unchanged");
  });

  it("should resolve correct highlight color from getMessageEmphasisColor()", () => {
    const color = formatter["getMessageEmphasisColor"](LogType.Error);
    expect(color).toBe(options.logFormat.type?.highlight?.color);
  });  

  it("should return null for getMessageEmphasisColor with unknown log type", () => {
    const color = formatter["getMessageEmphasisColor"](-1 as LogType);
    expect(color).toBeNull();
  });

  it("should use default color in getTypeFormat fallback", () => {
    const unknown = formatter["getTypeFormat"](-1 as LogType);
    expect(unknown).toEqual({});
  });

  it("should colorize text when useColors is true", () => {
    const result = formatter["colorize"]("Hello", ConsoleColor.Cyan);
    expect(result).toContain(ConsoleColor.Cyan);
    expect(result).toContain("Hello");
    expect(result).toContain(ConsoleColor.Reset);
  });

  it("should return unstyled text if useColors is false", () => {
    options.useColors = false;
    formatter = new FieldFormatter(options);
    const result = formatter["colorize"]("Muted", ConsoleColor.Red);
    expect(result).toBe("Muted");
  });

  it("should preserve placeholder if argument is undefined", () => {
    const result = stripAnsi(formatter["fillTemplate"]("Missing: {0}", [], null));
    expect(result).toBe("Missing: {0}");
  });

  it("should fallback to global format if no type-specific format exists", () => {
    delete options.logFormat.type?.info;
    formatter = new FieldFormatter(options);
    const result = formatter.formatType(LogType.Info);
    expect(result).toBe(`${options.logFormat.type?.color}info${options.logFormat.text?.color}`);
  });

  it("should resolve fallback message emphasis colors for all log types", () => {
    const types = [
      LogType.Info,
      LogType.Success,
      LogType.Warning,
      LogType.Error,
      LogType.Debug,
      LogType.Highlight,
    ];
  
    for (const type of types) {
      const color = formatter["getMessageEmphasisColor"](type);
      expect(color).toBeDefined();
    }
  });

  it("should fallback to palette when no color or argsColor is set", () => {
    options.logFormat.type = {}; // wipe type config
    formatter = new FieldFormatter(options);
    const color = formatter["getMessageEmphasisColor"](LogType.Debug);
    expect(color).toBe(ConsolePalette.Debug);
  });
});

function stripAnsi(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(new RegExp("\u001B\\[[0-9;]*m", "g"), "");
}