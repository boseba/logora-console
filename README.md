# logora-console

[![NPM version](https://img.shields.io/npm/v/logora-console?style=flat-square)](https://www.npmjs.com/package/logora-console)

**logora-console** is a console output module for the [Logora](https://www.npmjs.com/package/logora) logging system.

It formats and displays log entries in the terminal with optional colors, timestamps, scopes, and structured templates.

## Table of Contents

- Features
- Installation
- Basic Usage
- Configuration Options
- Advanced Usage
- Creating Custom Palettes
- License

## Features

- ANSI color support (with optional disabling)
- Customizable timestamp formats
- Daily headers when the day changes
- Scope-based labeling
- Placeholder injection into message templates
- Clean, non-blocking design integrated with Logora

## Installation

```bash
npm install logora logora-console
```

You must have both `logora` and `logora-console` installed.  
Logora handles the core logic, while logora-console handles console rendering.

## Basic Usage

```ts
import { createLogger } from "logora";
import { createConsoleOutput } from "logora-console";

const logger = createLogger({
  outputs: [
    createConsoleOutput({
      useColors: true,
      timestampFormat: "HH:mm:ss",
    })
  ]
});

logger.info("Server started on port {0}", 8080);
```

## Configuration Options

You can customize the console output using the `ConsoleOutputOptions`:

| Option             | Type              | Description |
|--------------------|-------------------|-------------|
| `level`             | `LogLevel`         | Minimum log level to display. |
| `useColors`         | `boolean`          | Enable or disable color rendering. |
| `timestampFormat`   | `string`           | Format for timestamps (moment.js format). |
| `dateHeaderFormat`  | `string`           | Format for daily headers when day changes. |
| `showDateHeader`    | `boolean`          | Whether to print a daily header separator. |
| `scopeColor`        | `ConsoleColor`     | Custom color for scope labels. |
| `colors`            | `ConsolePalette`   | Fine-tuned colors for each log type and section. |

## Advanced Usage

### Scoped Loggers

```ts
const dbLogger = logger.getScoped("Database");

dbLogger.success("Connected to {0}", "db-primary");
dbLogger.error("Failed to insert record {0}", "user_1234");
```

Scopes are automatically rendered in the output, with their own styling.

### Disabling Colors

```ts
createConsoleOutput({
  useColors: false
});
```

Useful when logging in CI/CD pipelines, remote servers, or files.

## Creating Custom Palettes

You can override any color individually by providing a partial `ConsolePalette`:

```ts
import { createConsoleOutput, ConsoleColor } from "logora-console";

const output = createConsoleOutput({
  colors: {
    error: ConsoleColor.Magenta,
    warning: ConsoleColor.Cyan,
    success: ConsoleColor.Green,
    debug: ConsoleColor.Gray,
    info: ConsoleColor.White
  }
});
```

## License

MIT License

© Sébastien Bosmans

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction...
