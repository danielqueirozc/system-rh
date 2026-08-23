import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { GetEmployees } from "./get-employees.controller";
import { EditEmployee } from "./edit-employee.controller";
import { CreateEmployee } from "./create-employee.controller";
import { DeleteEmployee } from "./delete-employee.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [GetEmployees, CreateEmployee, EditEmployee, DeleteEmployee,],
})
export class EmployeeModule {}
