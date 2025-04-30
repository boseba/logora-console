/**
 * Modifiers that can be applied to string outputs.
 * 
 * These modifiers are used to transform specific parts of a log entry
 * before rendering them to the console.
 */
export enum Modifier {
  /**
   * Converts the string to uppercase letters.
   * Example: "log entry" -> "LOG ENTRY"
   */
  Uppercase = "uppercase",

  /**
   * Converts the string to lowercase letters.
   * Example: "Log Entry" -> "log entry"
   */
  Lowercase = "lowercase",

  /**
   * Capitalizes the first letter of the string.
   * Example: "log entry" -> "Log entry"
   */
  Capitalize = "capitalize"
}
