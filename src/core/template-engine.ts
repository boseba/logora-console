import { LogEntry } from "logora/module";
import { Placeholder } from "../enums/placeholder.enum";

/**
 * TemplateEngine is responsible for processing template strings,
 * including token replacement, optional block rendering, and brace escaping.
 */
export class TemplateEngine {
  /**
   * Escapes double braces {{ and }} in the template to placeholders
   * to avoid misinterpretation during processing.
   *
   * @param format - The template format string to escape.
   * @returns The format string with escaped braces.
   */
  escapeBraces(format: string): string {
    return format
      .replace(/{{/g, "__OPEN_BRACE__")
      .replace(/}}/g, "__CLOSE_BRACE__");
  }

  /**
   * Restores the real literal braces { and } from placeholders.
   *
   * @param format - The template format string with escaped placeholders.
   * @returns The format string with real braces restored.
   */
  restoreBraces(format: string): string {
    return format
      .replace(/__OPEN_BRACE__/g, "{")
      .replace(/__CLOSE_BRACE__/g, "}");
  }

  /**
   * Processes optional blocks enclosed in single braces { ... }.
   * If the block contains tokens that are undefined or empty in the entry,
   * the block is removed.
   *
   * Example:
   * `{Scope: %scope% - }` is removed if scope is undefined or empty.
   *
   * @param format - The template format string.
   * @param entry - The log entry providing token values.
   * @returns The format string with optional blocks processed.
   */
  processOptionalBlocks(format: string, entry: LogEntry): string {
    return format.replace(/\{([^{}]*)\}/g, (match, content) => {
      const hasScope = content.includes(Placeholder.Scope) && entry.scope;
      const hasOtherTokens = /%(\w+)%/.test(content) && !content.includes(Placeholder.Scope);

      if (hasScope || hasOtherTokens) {
        return content; // Keep the block, remove only surrounding braces
      } else {
        return ""; // Drop the block entirely
      }
    });
  }

  /**
   * Replaces all known tokens in the template with their actual rendered values.
   * Unknown tokens are left untouched.
   *
   * @param format - The template format string.
   * @param values - A mapping of token names to their rendered values.
   * @returns The format string with tokens replaced.
   */
  replaceTokens(format: string, values: Record<string, string>): string {
    return format.replace(/%(\w+)%/g, (_, token) => {
      const key = token.toLowerCase();
      return values[key] ?? `%${token}%`;
    });
  }
}
