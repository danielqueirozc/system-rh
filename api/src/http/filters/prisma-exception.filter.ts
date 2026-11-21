import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import type { Response } from "express";
import { Prisma } from "../../../generated/prisma/client";

// soo captura erros 'conhecidos' do Prisma, o resto continua no fluxo normal do Nest
// este filter cuida só dos erros do tipo PrismaClientKnownRequestError
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {


  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()

    const errors: Record<string, { status: number; message: string }> = {
      P2002: { status: HttpStatus.CONFLICT, message: 'Já existe um registro com esses dados (e-mail ou telefone).' },
      P2003: { status: HttpStatus.CONFLICT, message: 'Este registro está em uso (possui agendamentos ou orçamentos) e não pode ser apagado.' },
      P2025: { status: HttpStatus.NOT_FOUND, message: 'Registro não encontrado.' },
    }

    // esta procurando algum dos erros listados acima, ex: P2002
    const error = errors[exception.code]

    // código que não mapeamos: continua sendo erro do servidor, mas logamos pra investigar
    if (!error) {
      console.error(exception)
      return response.status(500).json({ statusCode: 500, message: 'Erro interno do servidor.' })
    }

    return response.status(error.status).json({ statusCode: error.status, message: error.message })
  }
}
