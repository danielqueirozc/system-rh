import { Module } from "@nestjs/common";
import { AccountModule } from "./controllers/account/account.module";
import { AppointmentModule } from "./controllers/appointment/appointment.module";
import { BudgetModule } from "./controllers/budget/budget.module";
import { ClientModule } from "./controllers/client/client.module";
import { EmployeeModule } from "./controllers/employee/employee.module";
import { ReportModule } from "./controllers/report/report.module";

@Module({
  imports: [
    AccountModule,
    AppointmentModule,
    BudgetModule,
    ClientModule,
    EmployeeModule,
    ReportModule,
  ]
})
export class HttpModule {}