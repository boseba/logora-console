import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { LogType } from "logora";
import { ConsoleWriter } from "../../src/core/writer";
import { ConsoleOutputOptions } from "../../src/config";

describe("ConsoleWriter", () => {
  let writer: ConsoleWriter;
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    writer = new ConsoleWriter(new ConsoleOutputOptions({ useColors: false }));
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "clear").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should log formatted entry", () => {
    writer.log({
      timestamp: new Date(),
      type: LogType.Info,
      message: "Test {0}",
      args: ["entry"],
    });

    expect(logSpy).toHaveBeenCalled();
  });

  it("should print title", () => {
    writer.title("Section Title");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Section Title"));
  });

  it("should print empty lines", () => {
    writer.empty(2);
    expect(logSpy).toHaveBeenCalled();
  });

  it("should clear the console", () => {
    const clearSpy = vi.spyOn(console, "clear").mockImplementation(() => {});
    writer.clear();
    expect(clearSpy).toHaveBeenCalled();
  });
});

describe("ConsoleWriter (extended)", () => {
  let writer: ConsoleWriter;

  beforeEach(() => {
    writer = new ConsoleWriter(new ConsoleOutputOptions({ useColors: false }));
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "clear").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should not crash when empty(0)", () => {
    writer.empty(0);
    expect(console.log).toHaveBeenCalled();
  });

  it("should not print header when showDateHeader is false", () => {
    const customOptions = new ConsoleOutputOptions({ showDateHeader: false });
    const customWriter = new ConsoleWriter(customOptions);
    vi.spyOn(console, "log").mockImplementation(() => {});

    customWriter["checkDailyHeader"](new Date());
    expect(console.log).not.toHaveBeenCalled();
  });
});
