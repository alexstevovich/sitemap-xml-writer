import { spawn } from "child_process";

const tests = [
  { file: "test/test.mjs", command: "node" },
  { file: "test/test.cjs", command: "node" }
];

tests.forEach(({ file, command }) => {
  const testProcess = spawn(command, [file], { stdio: "inherit" });

  testProcess.on("exit", (code) => {
    if (code !== 0) {
      console.error(`❌ Test failed: ${file}`);
      process.exit(1);
    } else {
      console.log(`✅ Passed: ${file}`);
    }
  });
});
