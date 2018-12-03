import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { HealthController } from "./health.controller";
import { AppService } from "./app.service";
import { StatusMonitorModule } from "nest-status-monitor";

const portNumber = parseInt(process.env.PORT) || 3000;
const statusMonitorConfig = {
  pageTitle: "Nest.js Status Monitor", // Default title
  path: "/status",
  port: portNumber,
  spans: [
    {
      interval: 1, // Every second
      retention: 60 // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60
    }
  ],
  healthChecks: [
    {
      protocol: "http",
      host: "localhost",
      path: "/health/alive",
      port: portNumber
    },
    {
      protocol: "http",
      host: "localhost",
      path: "/health/dead",
      port: portNumber
    }
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true
  },
  ignoreStartsWith: "/health/alive"
};

@Module({
  imports: [StatusMonitorModule.setUp(statusMonitorConfig)],
  controllers: [AppController, HealthController],
  providers: [AppService]
})
export class AppModule {}
