import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { GetEmployees } from "./get-employees.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [GetEmployees],
})
export class EmployeeModule {}
