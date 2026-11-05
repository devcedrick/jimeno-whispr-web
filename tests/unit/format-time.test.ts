import { describe, expect, it } from "vitest";
import { formatTime } from "@/lib/format-time";

describe("formatTime", () => {
  it("formats zero seconds", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("pads single-digit minutes and seconds", () => {
    expect(formatTime(5)).toBe("00:05");
    expect(formatTime(65)).toBe("01:05");
  });

  it("formats the default session length", () => {
    expect(formatTime(600)).toBe("10:00");
  });

  it("keeps counting minutes beyond an hour", () => {
    expect(formatTime(3661)).toBe("61:01");
  });
});
