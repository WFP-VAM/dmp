import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { Environment } from '@root/env.validation';
import clc from 'cli-color';
import winston from 'winston';

import { nodeStorage } from './async-local-storage';

type Message = string | Record<string, unknown>;

const LOG_LEVEL_TO_COLOR: Record<string, clc.Format> = {
  error: clc.red,
  warn: clc.yellow,
  info: clc.green,
  verbose: clc.cyanBright,
  debug: clc.magentaBright,
};

const addTraceId = winston.format((info) => {
  const traceId = nodeStorage.getStore()?.traceId;
  if (traceId !== undefined) {
    info.traceId = traceId;
  }

  return info;
})();

const handleObjectMessage = winston.format((info) => {
  if (typeof info.message === 'object' && info.message !== null) {
    info = { ...info, ...info.message };
  }

  return info;
})();

const formatter = [Environment.Development, Environment.Test].includes(
  process.env.NODE_ENV as Environment,
)
  ? winston.format.printf((info) => {
      const colorizer = LOG_LEVEL_TO_COLOR[info.level];

      return (
        Object.keys(info)
          .reverse()
          .reduce((logString, logProperty, index) => {
            if (index > 0) {
              logString += ', ';
            }

            logString += `"${logProperty}": `;
            /* eslint-disable @typescript-eslint/no-unsafe-argument */
            switch (logProperty) {
              case 'timestamp':
                logString += `"${clc.blueBright(info[logProperty])}"`;
                break;
              case 'context':
                logString += `"${clc.yellow(info[logProperty])}"`;
                break;
              case 'traceId':
                logString += `"${clc.magentaBright(info[logProperty])}"`;
                break;
              default:
                logString += `"${colorizer(info[logProperty])}"`;
            }

            return logString;
          }, '{ ') + ' }'
      );
    })
  : winston.format.json();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === Environment.Test ? 'error' : 'silly', // minimum loglevel to display: ;
      format: winston.format.combine(
        handleObjectMessage,
        addTraceId,
        winston.format.timestamp(),
        formatter,
      ),
    }),
  ],
});

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  error(message: Message, trace?: string, context: string | undefined = this.context): void {
    logger.error({ message, trace, context });
  }
  warn(message: Message, context: string | undefined = this.context): void {
    logger.warn({ message, context });
  }
  log(message: Message, context: string | undefined = this.context): void {
    logger.info({ message, context });
  }
  verbose(message: Message, context: string | undefined = this.context): void {
    logger.verbose({ message, context });
  }
  debug(message: Message, context: string | undefined = this.context): void {
    logger.debug({ message, context });
  }
}
