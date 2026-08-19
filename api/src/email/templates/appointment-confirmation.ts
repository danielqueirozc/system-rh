interface AppointmentConfirmationTemplateProps {
  clientName: string
  serviceName: string
  serviceDate: Date
}

export function appointmentConfirmationTemplate({
  clientName,
  serviceName,
  serviceDate,
}: AppointmentConfirmationTemplateProps) {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(serviceDate)

  const formattedTime = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(serviceDate)

  return `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Agendamento confirmado</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.08);">
            <tr>
              <td style="background-color:#020290; padding:32px 40px; text-align:center;">
                <div style="display:inline-block; width:48px; height:48px; background-color:rgba(255,255,255,0.15); border-radius:50%; line-height:48px; font-size:24px; margin-bottom:12px; color:#ffffff;">&#10003;</div>
                <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:600;">Agendamento Confirmado</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:32px 40px;">
                <p style="margin:0 0 24px; color:#1f2937; font-size:15px; line-height:1.6;">
                  Olá, <strong>${clientName}</strong>! Seu agendamento foi confirmado com sucesso. Confira os detalhes abaixo:
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9fb; border-radius:8px; border:1px solid #e5e7eb;">
                  <tr>
                    <td style="padding:20px 24px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px 0; color:#6b7280; font-size:13px; width:120px;">Serviço</td>
                          <td style="padding:8px 0; color:#111827; font-size:14px; font-weight:600; text-align:right;">${serviceName}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0; color:#6b7280; font-size:13px; border-top:1px solid #e5e7eb;">Data</td>
                          <td style="padding:8px 0; color:#111827; font-size:14px; font-weight:600; text-align:right; border-top:1px solid #e5e7eb;">${formattedDate}</td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0; color:#6b7280; font-size:13px; border-top:1px solid #e5e7eb;">Horário</td>
                          <td style="padding:8px 0; color:#111827; font-size:14px; font-weight:600; text-align:right; border-top:1px solid #e5e7eb;">${formattedTime}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <p style="margin:24px 0 0; color:#6b7280; font-size:13px; line-height:1.6;">
                  Se precisar remarcar ou cancelar, entre em contato conosco o quanto antes.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 40px; background-color:#f9f9fb; text-align:center; border-top:1px solid #e5e7eb;">
                <p style="margin:0; color:#9ca3af; font-size:12px;">Este é um e-mail automático, não é necessário responder.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}
