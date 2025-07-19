import * as path from "path";
import * as Mocha from "mocha";
import { glob } from "glob";

const mocha = new Mocha();

const testsRoot = path.resolve(__dirname, "..");

export async function run() {
  try {
    // glob is now Promise-based
    const files = await glob("**/*.test.js", { cwd: testsRoot });

    // Add files to the test suite
    files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

    // Run the mocha test
    await new Promise<void>((resolve, reject) => {
      mocha.run((failures) => {
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
