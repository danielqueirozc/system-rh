import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { GetReports } from "./get-reports.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [GetReports],
})
export class ReportModule {}
