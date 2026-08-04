import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccount } from "./controllers/create-acccount.controller";
import { CreateAppointment } from "./controllers/create-appointment.controller";
import { CreateBudget } from "./controllers/create-budget.controller";
import { GetBudgets } from "./controllers/get-budgets.controller";
import { GetClients } from "./controllers/get-clients.controller";
import { GetEmployees } from "./controllers/get-employees.controller";
import { GetAppointmentByStatus } from "./controllers/get-appointments-by-status.controller";
import { GetReports } from "./controllers/get-reports.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccount,
    AuthenticateController,
    CreateAppointment,
    CreateBudget,
    GetBudgets,
    GetClients,
    GetEmployees,
    GetAppointmentByStatus,
    GetReports
  ]
})
export class HttpModule {}