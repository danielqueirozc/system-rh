import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { CreateAccount } from "./controllers/create-acccount.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccount]
})
export class HttpModule {}