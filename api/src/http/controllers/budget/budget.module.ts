import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { CreateBudget } from "./create-budget.controller";
import { GetBudgets } from "./get-budgets.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateBudget, GetBudgets],
})
export class BudgetModule {}
