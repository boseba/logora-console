# logora-console

[![NPM version](https://img.shields.io/npm/v/logora-console?style=flat-square)](https://www.npmjs.com/package/logora-console)

**logora-console** is the official console output module for the [Logora](https://www.npmjs.com/package/logora) logging framework.

It formats and displays logs in the terminal with dynamic templating, optional styling, and structured customization per log type or section.

---

## Features

- Rich ANSI color support (toggle via `useColors`)
- Custom timestamp formatting (via Moment.js)
- Dynamic `formatString` templating (`%type%`, `%message%`, etc.)
- Conditional block rendering (`{scope: %scope%}` is hidden if undefined)
- Fine-grained control over style per field (`message`, `scope`, `timestamp`, `type`)
- Per-log-type style overrides (e.g. different color for `error`, `warning`, etc.)
- Non-blocking design with full support for scoped loggers

---

## Installation

```bash
npm install logora logora-console
```

---

## Basic Usage

```ts
import { createLogger, LogLevel } from "logora";
import { createConsoleOutput } from "logora-console";

const logger = createLogger({ level: LogLevel.Info });

logger.addLogOutput(createConsoleOutput());

logger.info("Server started on port {0}", 3000);
```

---

## Scoped Logging

You can create scoped loggers using `getScoped()`:

```ts
const dbLogger = logger.getScoped("Database");

dbLogger.debug("Connection opened.");
dbLogger.error("Query failed: {0}", error.message);
```

This scope will appear in your `formatString` if defined via `%scope%`.

---

## Format String

You control the output structure using a `formatString`.

### Supported placeholders:

- `%timestamp%`
- `%scope%`
- `%type%`
- `%message%`

### Conditional blocks:

- `{scope: %scope% - }` will be rendered only if `scope` is defined
- You can nest or mix blocks and separators

### Example:

```ts
createConsoleOutput({
  formatString: "[%timestamp%] {scope: %scope% | }%type%: %message%"
});
```

---

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `formatString` | `string` | `[%timestamp%] %type%: %message%` | The template used to format each log line |
| `useColors` | `boolean` | `true` | Enable or disable ANSI colors |
| `logFormat.timestamp.format` | `string` | `"HH:mm:ss"` | Timestamp format (Moment.js) |
| `logFormat.timestamp.color` | `ConsoleColor` | gray | Timestamp color |
| `logFormat.scope.color` | `ConsoleColor` | cyan | Scope label color |
| `logFormat.scope.modifier` | `Modifier` | — | `capitalize`, `uppercase`, or `lowercase` |
| `logFormat.type.color` | `ConsoleColor` | bright | Default log type color |
| `logFormat.type.error.color` | `ConsoleColor` | red | Color used for errors |
| `logFormat.type.warning.color` | `ConsoleColor` | yellow | Color for warnings |
| `logFormat.message.color` | `ConsoleColor` | white | Color for log message content |
| `logFormat.message.modifier` | `Modifier` | — | Casing transformation |
| `logFormat.text.color` | `ConsoleColor` | reset | Color applied after any colored segment |
| `logFormat.dailyDateHeader.formatString` | `string` | `[%dailyDate%]` | Template for daily headers |
| `logFormat.dailyDateHeader.format` | `string` | `YYYY-MM-DD` | Moment format for date headers |

---

## Advanced Styling

Each section can be styled with modifiers and custom colors:

```ts
createConsoleOutput({
  formatString: "[%timestamp%] {scope: %scope% | }%type%: %message%",
  logFormat: {
    timestamp: { format: "HH:mm:ss", color: "\x1b[90m" },
    scope: { color: "\x1b[36m", modifier: "capitalize" },
    type: {
      color: "\x1b[37m",
      error: { color: "\x1b[31m", modifier: "uppercase", argsColor: "\x1b[35m" },
      warning: { color: "\x1b[33m" }
    },
    message: { color: "\x1b[37m", modifier: "uppercase" },
    text: { color: "\x1b[0m" }
  }
});
```

---

## License

MIT © Sébastien Bosmans
