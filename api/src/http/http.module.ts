import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { CreateAccount } from "./controllers/create-acccount.controller";
import { CreateScheduling } from "./controllers/create-scheduling.controller";
import { CreateBudget } from "./controllers/create-budget.controller";
import { GetBudget } from "./controllers/get-budget.controller";
import { GetClients } from "./controllers/get-clients.controller";
import { GetEmployee } from "./controllers/get-employee.controller";
import { GetScheduling } from "./controllers/get-schedulings.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccount, 
    AuthenticateController, 
    CreateScheduling, 
    CreateBudget, 
    GetBudget, 
    GetClients, 
    GetEmployee, 
    GetScheduling
  ]
})
export class HttpModule {}