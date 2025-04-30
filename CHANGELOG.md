# Changelog

## [1.1.0] - 2025-04-30

### Added

- Introduced a new modular formatting engine:
  - `FieldFormatter`, `TemplateEngine`, `Formatter`
- Added support for dynamic `formatString` with token placeholders (`%timestamp%`, `%scope%`, `%type%`, `%message%`)
- Added conditional rendering using `{label: ...}` syntax in format strings
- Introduced `logFormat` and `valuesFormat` for styling (colors, modifiers, formats)
- Added `ConsoleColor`, `Modifier`, and `Placeholder` enums for structured configuration
- Replaced legacy `console-formatter.ts` with new extensible pipeline
- Extended `ConsoleOutputOptions` with advanced formatting fields
- Added `ConsolePalette` and default fallback system
- Added full test suite with >90% coverage:
  - `formatter`, `field-formatter`, `writer`, `template-engine`, `output`

### Changed

- `ConsoleOutputOptions` now uses `logFormat` for color and style configuration
- ANSI formatting is handled by a unified `colorize()` system
- Internal formatter logic is now fully scoped and reusable

### Breaking Changes

- `console-formatter.ts` has been removed
- `createConsoleOutput()` now requires `formatString` and `logFormat` for any custom formatting
- `ConsoleOutputOptions` structure has changed: previous flat fields like `timestampFormat`, `useColors`, etc. must now be nested
- Token and scope formatting must follow new `{scope: ...}` block syntax

## [1.0.0] - 2024-04-25

### Added
- Initial implementation of `ConsoleOutput` to integrate with Logora.
- `ConsoleWriter` for structured console rendering of log entries.
- `ConsoleFormatter` to manage colors, timestamps, scopes, and templated messages.
- `ConsoleOutputOptions` configuration with customizable color palettes and date formats.
- Support for ANSI colors, scoped labels, timestamps, and daily headers.
- Full documentation and ready-to-publish project structure.

### Notes
- This version requires `logora` as a peer dependency.
- Provides a flexible, colorized console output module for Logora users.

---

# Past Versions

This is the first release of `logora-console`.
