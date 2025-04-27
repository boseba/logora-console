import { describe, it, expect } from "vitest";
import { LogType } from "logora";
import { ConsoleFormatter } from "../../src/formatter/console-formatter";
import { ConsoleOutputOptions } from "../../src/config";
import { ConsoleColor } from "../../src/enums";

describe("ConsoleFormatter", () => {
  const options = new ConsoleOutputOptions({
    useColors: false,
    timestampFormat: "YYYY-MM-DD HH:mm:ss",
    dateHeaderFormat: "YYYY-MM-DD"
  });
  const formatter = new ConsoleFormatter(options);
  
  it("should handle missing argument in format template", () => {
    const formatted = formatter.format("Hello {1}", ["onlyOneArg"]);
    expect(formatted).toContain("{1}"); // Placeholder remains because index 1 doesn't exist
  });

  it("should return default color for unknown LogType", () => {
    const color = formatter["getColor"](LogType.Raw);
    expect(color).toBe(formatter["options"].colors.text);
  });

  it("should format message with args", () => {
    const result = formatter.format("Hello {0}!", ["World"]);
    expect(result).toBe("Hello World!");
  });

  it("should colorize message when colors are enabled", () => {
    const coloredFormatter = new ConsoleFormatter(new ConsoleOutputOptions({ useColors: true }));
    const result = coloredFormatter["colorize"]("Hello", ConsoleColor.Green);
    expect(result).toBe(`${ConsoleColor.Green}Hello${ConsoleColor.Reset}`);
  });

  it("should format date headers", () => {
    const result = formatter.formatDateHeader(new Date("2024-04-25T12:00:00Z"));
    expect(result).toContain("2024-04-25");
  });

  it("should compose a log entry", () => {
    const result = formatter.compose({
      timestamp: new Date(),
      type: LogType.Info,
      message: "message {0}",
      args: ["test"],
    }, new Date());

    expect(result).toContain("Info");
    expect(result).toContain("message test");
  });
});
