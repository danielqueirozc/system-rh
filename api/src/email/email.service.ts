import type { Env } from "@/env";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from 'resend';
import { appointmentConfirmationTemplate } from "./templates/appointment-confirmation";

@Injectable()
export class EmailService {
  private resend: Resend

  constructor(private config: ConfigService<Env, true>) {
    this.resend = new Resend(this.config.get("RESEND_API_KEY", { infer: true }))
  }

  async sendAppointmentConfirmation(to: string, data: { clientName: string, serviceName: string, serviceDate: Date }) {
    await this.resend.emails.send({
      from: "Agendamentos <onboarding@resend.dev>",
      to,
      subject: "Agendamento confirmado",
      html: appointmentConfirmationTemplate(data),
    })
  }
}