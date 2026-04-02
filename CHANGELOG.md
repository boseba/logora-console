# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added

- Coveralls coverage reporting integration.
- Coverage badge support for repository health tracking.

### Changed

- Modernized GitHub Actions workflows.
- Updated CI configuration to align with the current Node.js, Vite, and Vitest toolchain.

---

## [1.1.2] - 2026-02-06

### Fixed

- Added a `default` export condition for bundlers in `package.json` export mappings to improve package resolution compatibility.

### Changed

- Updated package version metadata.

---

## [1.1.1] - 2025-04-27

### Changed

- Aligned build and project configuration with a modern Node.js environment.

---

## [1.1.0] - 2025-04-30

### Added

- Introduced a new modular formatting engine:
  - `FieldFormatter`
  - `TemplateEngine`
  - `ConsoleFormatter`
- Added support for dynamic `formatString` with token placeholders:
  - `%timestamp%`
  - `%scope%`
  - `%type%`
  - `%message%`
- Added conditional rendering using block syntax in format strings.
- Introduced structured formatting configuration through `logFormat`.
- Added `ConsoleColor`, `Modifier`, and `Placeholder` enums for typed configuration.
- Replaced the legacy formatter implementation with a more extensible pipeline.
- Added `ConsolePalette` and fallback formatting defaults.
- Added a full test suite with high coverage for:
  - formatter
  - field-formatter
  - writer
  - template-engine
  - output

### Changed

- `ConsoleOutputOptions` now uses `logFormat` for color and style configuration.
- ANSI formatting is handled by a unified `colorize()` flow.
- Internal formatter logic is now more modular and reusable.

### Breaking Changes

- The legacy `console-formatter.ts` implementation has been removed.
- `ConsoleOutputOptions` structure has changed: previous flat fields such as `timestampFormat`, `useColors`, and similar options must now follow the new configuration shape.
- Custom token and scope rendering must follow the new block-based format string behavior.

---

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
