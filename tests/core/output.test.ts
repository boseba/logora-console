import { describe, it, expect } from "vitest";
import { ConsoleOutput } from "../../src/core/output";

describe("ConsoleOutput", () => {
  it("should create a ConsoleOutput instance", () => {
    const output = new ConsoleOutput();
    expect(output.name).toBe("console");
    expect(output.options).toBeDefined();
    expect(output.writer).toBeDefined();
  });
});
