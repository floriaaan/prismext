/* eslint-disable @typescript-eslint/no-explicit-any */
function getStackTrace() {
  let stack: string | string[];

  try {
    throw new Error("");
  } catch (error) {
    stack = (error as Error).stack || "";
  }

  stack = stack.split("\n").map((line: string) => line.trim());
  return stack.splice(stack[0] === "Error" ? 2 : 1);
}

const getInitiator = () => {
  // _getInitiatorLine, _ObjectInfoLine, caller
  const [, , caller] = getStackTrace();
  const file = caller.split("/").at(-1) || "";
  const fnc = caller.split(" ").at(1) || "";
  return fnc && fnc !== "eval" ? `${fnc} - ${file.replace(")", "")}` : file.replace(")", "");
};

const error = (args: any) => {
  process.stderr.write(`- ${utils.red("prismext:error")} log on ${getInitiator()}\n`);
  if ("cause" in args) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cause, ...rest } = args;
    process.stderr.write(JSON.stringify(rest, null, 2));
    process.stderr.write("\n");
    return;
  }
  process.stderr.write(JSON.stringify(args, null, 2));
  process.stderr.write("\n");
};
const info = (args: any) => {
  process.stdout.write(`- ${utils.blue("prismext:info")} log on ${getInitiator()}\n`);
  process.stdout.write(JSON.stringify(args, null, 2));
  process.stdout.write("\n");
};
const DEBUG = (args: any) => {
  process.stdout.write(`- ${utils.cyan("prismext:debug")} log on ${getInitiator()}\n`);
  process.stdout.write(JSON.stringify(args, null, 2));
  process.stdout.write("\n");
};

/**
 * @description a simple interface logger for logging to the console and into a log drain in the future
 * @example
 * log.warn('this is a warning');
 * log.error('this is an error');
 * log.info('this is an info');
 * @exports log
 */
export const log = {
  error,
  info,
  DEBUG,
  default: DEBUG,
};

export const utils = {
  bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
  red: (text: string) => `\x1b[31m${text}\x1b[0m`,
  green: (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
  blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text: string) => `\x1b[36m${text}\x1b[0m`,
  white: (text: string) => `\x1b[37m${text}\x1b[0m`,
  gray: (text: string) => `\x1b[90m${text}\x1b[0m`,
};
