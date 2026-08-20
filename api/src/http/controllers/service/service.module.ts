import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { GetServices } from "./get-services.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [GetServices],
})
export class ServiceModule {}
