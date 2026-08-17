import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { CreateClient } from "./create-client.controller";
import { GetClients } from "./get-clients.controller";
import { DeleteClient } from "./delete-client.controller";
import { EditClient } from "./edit-client.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateClient, GetClients, DeleteClient, EditClient],
})
export class ClientModule {}
