const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  console.log(`Master started. Pid: ${process.pid}`);
  const CPUs = os.cpus().length;
  for (let i = 0; i < CPUs - 1; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker died! Pid: ${worker.process.pid}`);
    cluster.fork();
  });
} else {
  require("./index.js");
}
