import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { AuthenticateController } from "./authenticate.controller";
import { CreateAccount } from "./create-account.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccount, AuthenticateController],
})
export class AccountModule {}
