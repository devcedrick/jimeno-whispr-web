import { describe, expect, it } from "vitest";
import { getInitials } from "@/lib/get-initials";

describe("getInitials", () => {
  it("returns a placeholder when no username is provided", () => {
    expect(getInitials(null)).toBe("??");
    expect(getInitials(undefined)).toBe("??");
    expect(getInitials("")).toBe("??");
  });

  it("uses the first two capital letters when available", () => {
    expect(getInitials("JohnDoe")).toBe("JD");
    expect(getInitials("AliceBobCharlie")).toBe("AB");
  });

  it("falls back to the first two characters uppercased", () => {
    expect(getInitials("cedrick")).toBe("CE");
    expect(getInitials("a")).toBe("A");
  });
});
