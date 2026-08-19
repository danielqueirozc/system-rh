import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { CreateAppointmentClient } from "./create-appointmen-client.controller";
import { CreateAppointmentAdmin } from "./create-appointment-admin.controller";
import { GetAppointmentByStatus } from "./get-appointments-by-status.controller";
import { EditAppoinment } from "./edit-appointment.controller";
import { EmailModule } from "@/email/email.module";

@Module({
  imports: [DatabaseModule, EmailModule],
  controllers: [CreateAppointmentClient, CreateAppointmentAdmin, GetAppointmentByStatus, EditAppoinment],
})
export class AppointmentModule {}
