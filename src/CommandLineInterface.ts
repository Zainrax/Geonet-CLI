import readline from "readline";

interface CLI {
  defaultInt: number;
  validateInputIsInt: (input: string) => boolean;
  promptUserForInt: (
    query: string,
    callback: (input: number) => Promise<void>,
    minMax: { min: number; max: number }
  ) => void;
}

export default function CommandLineInteface(
  defaultInt = 3,
  closingMessage = "Thanks for using the app!"
): CLI {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on("close", () => {
    console.log(closingMessage);
  });

  return {
    defaultInt: defaultInt,
    validateInputIsInt(input) {
      return !isNaN(parseInt(input));
    },
    promptUserForInt(query, callback, minMax) {
      rl.question(query, (input) => {
        if (input.length === 0) {
          callback(this.defaultInt).then(() => {
            rl.close();
          });
          return;
        }
        if (this.validateInputIsInt(input)) {
          const val = parseInt(input);
          const { min, max } = minMax;
          if (min <= val && val <= max) {
            callback(parseInt(input)).then(() => {
              rl.close();
            });
            return;
          }
        }
        if (input === "exit") {
          rl.close();
        } else {
          console.warn("Please provie a valid input. Type 'exit' to close ");
          this.promptUserForInt(query, callback, minMax);
        }
      });
    },
  };
}
