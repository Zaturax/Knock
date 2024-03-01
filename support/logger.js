/**
 * Logs to the console properly formated messages with timestamps and log levels
 * If no level is provided then then "INFO" is used by default
 * Environment variable LOG_LEVEL, DEBUG or NODE_ENV take precedence over the function argument
 * DEBUG > LOG_LEVEL > level
 * @param {String} level argument that holds the pretented log level. Default: "INFO"
 */
 function logger(level = 'INFO') {
    const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    let LOG_LEVEL = process.env.LOG_LEVEL || level;
  
    if (process.env.DEBUG) {
      LOG_LEVEL = 'DEBUG';
    }
  
    if (!levels.includes(LOG_LEVEL)) {
      console.log(
        '\u001b[31m' +
          'UNKKOWN LOG LEVEL SPECIFIED - ' +
          `${LOG_LEVEL} - Expected one of ${levels}! Using INFO!` +
          '\x1b[0m'
      );
      LOG_LEVEL = 'INFO';
    }
  
    const log = {
      /**
       * Logs error messages properly formatted messages with timestamps and ERROR tag
       *
       * Error messages are always logged to the console, there is no way to shut them down
       * @param {String} args arguments that are logged to the console separated by a whitespace
       */
      error: () => {},
      /**
       * Logs warning messages properly formatted messages with timestamps and WARN tag
       *
       * Warning messages are logged to the console with LOG_LEVELS below ERROR [WARN, INFO, DEBUG]
       * @param {String} args arguments that are logged to the console separated by a whitespace
       */
      warning: () => {},
      /**
       * Logs info messages properly formatted messages with timestamps and INFO tag
       *
       * Info messages are logged to the console with LOG_LEVELS below WARN [INFO, DEBUG]
       *
       * This is the default value taken by the logger
       * @param {String} args arguments that are logged to the console separated by a whitespace
       */
      info: () => {},
      /**
       * Logs debug messages properly formatted messages with timestamps and DEBUG tag
       *
       * Debug messages are logged to the console with LOG_LEVEL DEBUG
       * @param {String} args arguments that are logged to the console separated by a whitespace
       */
      debug: () => {},
      /**
       * @deprecated use one of error, warning, info, debug
       */
      log: (...args) => {
        console.log(
          '\x1b[1m\x1b[31m' +
            'log method is DEPRECATED, use debug instead!' +
            '\x1b[0m'
        );
        console.log(`${new Date().toISOString()} - ${args.join(' ')}`);
      },
    };
  
    switch (LOG_LEVEL) {
      case 'DEBUG':
        log.debug = (...args) => {
          console.log(
            `${new Date().toISOString()} ` +
              `\u001b[42;1m` +
              `\u001b[30m` +
              ` DEBUG ` +
              `\x1b[0m` +
              `  ${args.join(' ')}`
          );
        };
      // falls through
      case 'INFO':
        log.info = (...args) => {
          console.log(
            `${new Date().toISOString()}  ` +
              `\u001b[44;1m` +
              ` INFO ` +
              `\x1b[0m` +
              `  ${args.join(' ')}`
          );
        };
  
      // falls through
      case 'WARN':
        log.warning = (...args) => {
          console.log(
            `${new Date().toISOString()}  ` +
              `\u001b[43;1m` +
              `\u001b[30m` +
              ` WARN ` +
              `\x1b[0m` +
              `  ${args.join(' ')}`
          );
        };
      // falls through
      case 'ERROR':
        log.error = (...args) => {
          console.log(
            `${new Date().toISOString()} ` +
              `\u001b[41;1m` +
              ` ERROR ` +
              `\x1b[0m` +
              `  ${args.join(' ')}`
          );
        };
        break;
      default:
    }
    return log;
  }
  
  module.exports = logger;
  