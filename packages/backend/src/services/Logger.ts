import chalk from 'chalk'

export enum LogLevel {
  NONE = 0,
  ERROR = 1,
  INFO = 2,
  DEBUG = 3,
}

export class Logger {
  constructor(private logLevel: LogLevel, private name = '') {}

  static SILENT = new Logger(LogLevel.NONE)

  withName(name: string) {
    return new Logger(this.logLevel, name)
  }

  error(error: unknown) {
    if (this.logLevel >= LogLevel.ERROR) {
      const message = getErrorMessage(error)
      console.error(
        getTime(),
        chalk.hex('#000000').bgRed(' ERROR '),
        this.formatMessage(chalk.red(message))
      )
    }
  }

  info(message: string) {
    if (this.logLevel >= LogLevel.INFO) {
      console.log(getTime(), chalk.blue('INFO'), this.formatMessage(message))
    }
  }

  debug(message: string) {
    if (this.logLevel >= LogLevel.DEBUG) {
      console.debug(
        getTime(),
        chalk.yellow('DEBUG'),
        this.formatMessage(message)
      )
    }
  }

  private formatMessage(message: string) {
    if (this.name) {
      return `[${chalk.yellow(this.name)}] ${message}`
    } else {
      return message
    }
  }
}

function getErrorMessage(error: unknown) {
  if (typeof error === 'string') {
    return error
  } else if (error instanceof Error) {
    return error.message
  } else {
    return '' + error
  }
}

function getTime() {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  return chalk.gray(`${hours}:${minutes}:${seconds}`)
}
