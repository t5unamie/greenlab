const cron = require("node-cron");
const fs = require("fs");

cron.schedule("* * * * *", function() {
      console.log("running a task every minute");
    });