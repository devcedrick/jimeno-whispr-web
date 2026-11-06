import { describe, expect, it, vi } from "vitest";
import adjectivesData from "@/data/adjectives.json";
import beingsData from "@/data/beings.json";
import {
  generateAnonId,
  generatePassword,
} from "@/lib/generateCredential";

const passwordCharset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}";

describe("generateAnonId", () => {
  it("combines an adjective, a being, and a two-digit suffix", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(generateAnonId()).toBe(
      `${adjectivesData.adjectives[0]}${beingsData.beings[0]}00`,
    );
  });
});

describe("generatePassword", () => {
  it("generates a password with the requested length", () => {
    expect(generatePassword()).toHaveLength(12);
    expect(generatePassword(24)).toHaveLength(24);
  });

  it("only uses characters from the supported charset", () => {
    const password = generatePassword(64);

    for (const character of password) {
      expect(passwordCharset).toContain(character);
    }
  });
});
