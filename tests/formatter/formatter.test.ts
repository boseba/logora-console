import { describe, it, expect, beforeEach } from "vitest";
import { LogEntry } from "logora/module";
import { ConsoleFormatter } from "../../src/core/formatter";
import { ConsoleOutputOptions } from "../../src/config/console-output-options";
import { ConsoleColor, Modifier } from "../../src/enums";
import { LogType } from "logora";


describe("ConsoleFormatter", () => {
  let formatter: ConsoleFormatter;
  let options: ConsoleOutputOptions;

  beforeEach(() => {
    options = new ConsoleOutputOptions({
      formatString: "[%timestamp%] {scope: %scope% - }%type%: %message%",
      useColors: true,
      logFormat: {
        timestamp: { format: "HH:mm:ss", color: ConsoleColor.Gray },
        scope: { color: ConsoleColor.Cyan, modifier: Modifier.Capitalize },
        message: { color: ConsoleColor.White },
        type: {
          color: ConsoleColor.Bright,
          error: { color: ConsoleColor.Red, modifier: Modifier.Uppercase },
          info: { modifier: Modifier.Lowercase }
        },
        text: { color: ConsoleColor.Reset }
      }
    });
    formatter = new ConsoleFormatter(options);
  });

  function fakeEntry(partial: Partial<LogEntry>): LogEntry {
    return {
      timestamp: new Date("2024-04-01T12:00:00"),
      type: LogType.Info,
      message: "Hello {0}, code {1}",
      args: ["World", 42],
      ...partial
    };
  }

  it("should compose a basic entry with all tokens", () => {
    const entry = fakeEntry({ scope: "auth" });
    const result = stripAnsi(formatter.compose(entry, new Date("2024-04-01T12:00:00")));

    expect(result).toContain("12:00:00");
    expect(result).toContain("scope: Auth");
    expect(result).toContain("info");
    expect(result).toContain("Hello World, code 42");
  });

  it("should drop optional block when scope is missing", () => {
    const result = stripAnsi(formatter.compose(fakeEntry({ scope: undefined }), new Date()));
    expect(result).not.toContain("scope");
  });

  it("should handle literal braces using {{ and }}", () => {
    options.formatString = "{{config}} %type%: %message%";
    formatter = new ConsoleFormatter(options);
    const result = stripAnsi(formatter.compose(fakeEntry({}), new Date()));
    expect(result).toContain("{config}");
  });

  it("should apply uppercase modifier to type", () => {
    const entry = fakeEntry({ type: LogType.Error });
    const result = stripAnsi(formatter.compose(entry, new Date()));
    expect(result).toContain("ERROR");
  });

  it("should apply lowercase modifier to type", () => {
    const entry = fakeEntry({ type: LogType.Info });
    const result = stripAnsi(formatter.compose(entry, new Date()));
    expect(result).toContain("info");
  });

  it("should apply capitalize modifier to scope", () => {
    const entry = fakeEntry({ scope: "integration" });
    const result = stripAnsi(formatter.compose(entry, new Date()));
    expect(result).toContain("Integration");
  });

  it("should inject arguments correctly into the message", () => {
    const entry = fakeEntry({
      message: "User {0} has {1} unread notifications in {2}.",
      args: ["John Doe", 5, "Inbox"]
    });

    const result = stripAnsi(formatter.compose(entry, new Date()));
    expect(result).toContain("User John Doe has 5 unread notifications in Inbox.");
  });

  it("should fallback to default palette color when no color is specified", () => {
    const minimalOptions = new ConsoleOutputOptions({
      formatString: "[%timestamp%] %type%: %message%",
      useColors: true,
      logFormat: {
        type: {
          modifier: Modifier.Uppercase
        }
      }
    });

    const customFormatter = new ConsoleFormatter(minimalOptions);
    const entry = {
      timestamp: new Date(),
      type: LogType.Error,
      message: "Something failed.",
      args: []
    };

    const result = stripAnsi(customFormatter.compose(entry, new Date()));
    expect(result).toContain("ERROR");
  });

  it("should not replace unknown tokens", () => {
    options.formatString = "%unknown% %type%";
    formatter = new ConsoleFormatter(options);
    const result = stripAnsi(formatter.compose(fakeEntry({}), new Date()));
    expect(result).toContain("%unknown%");
  });

  it("should fallback safely on unknown log type", () => {
    const entry = fakeEntry({ type: LogType.Raw });
    const result = stripAnsi(formatter.compose(entry, new Date()));
    expect(result).toContain("Raw");
  });
});

function stripAnsi(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(new RegExp("\u001B\\[[0-9;]*m", "g"), "");
}
