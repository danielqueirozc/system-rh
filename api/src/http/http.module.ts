import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccount } from "./controllers/create-acccount.controller";
import { CreateAppointment } from "./controllers/create-appointment.controller";
import { CreateBudget } from "./controllers/create-budget.controller";
import { GetBudget } from "./controllers/get-budget.controller";
import { GetClients } from "./controllers/get-clients.controller";
import { GetEmployee } from "./controllers/get-employee.controller";
import { GetAppointmentByStatus } from "./controllers/get-appointments-by-status.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccount,
    AuthenticateController,
    CreateAppointment,
    CreateBudget,
    GetBudget,
    GetClients,
    GetEmployee,
    GetAppointmentByStatus
  ]
})
export class HttpModule {}