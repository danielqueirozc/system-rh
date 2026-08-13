import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { CreateClient } from "./create-client.controller";
import { GetClients } from "./get-clients.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateClient, GetClients],
})
export class ClientModule {}
