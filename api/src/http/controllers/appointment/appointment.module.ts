import { DatabaseModule } from "@/database/database.module";
import { Module } from "@nestjs/common";
import { CreateAppointment } from "./create-appointment.controller";
import { GetAppointmentByStatus } from "./get-appointments-by-status.controller";
import { EditAppoinment } from "./edit-appointment.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAppointment, GetAppointmentByStatus, EditAppoinment],
})
export class AppointmentModule {}
