import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { CreateBudget } from "./create-budget.controller";
import { GetBudgets } from "./get-budgets.controller";
import { ChangeStatus } from "./change-status.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateBudget, GetBudgets, ChangeStatus],
})
export class BudgetModule {}
