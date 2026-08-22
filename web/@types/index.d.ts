const AppointmentStatus = {
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const


/////// APPOINTMENT//////////
export interface AppointmentProps {
  serviceName: string
  serviceDate: Date
  clientName: string
  clientEmail: string
  clientAddress: string
  clientPhone: string
  clientDescription: string
}

export interface CreateAppointmentAdminProps {
  clientId: string
  serviceName: string
  employeeId: string
  serviceDate: string | Date
  description?: string
}

export interface CreateAppointmentClientProps {
  name: string
  email: string
  phone: string
  address: string
  description?: string
}

export interface EditAppointmentProps {
  id: string,
  date: string,
  status: AppointmentStatus
  description?: string,
}

////////////// CLIENT ///////////////////
export interface ClientProps {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: ClientStatus
  appointments: []
  budgets: []
  createdAt: Date
  updatedAt: Date
}

export interface CreateClientProps {
  name: string
  email: string
  phone: string
  address: string
}

const ClientStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
} as const

export interface EditClientProps {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: ClientStatus
}

///////////////// BUDGET ///////////////
// enum BudgetStatus {
//   PENDING
//   APPROVED
//   REJECTED
// }

export const BudgetStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const

export type BudgetStatus = typeof BudgetStatus[keyof typeof BudgetStatus]

export interface BudgetProps {
  id: string
  description: string
  value: number
  date: Date
  client: { name: string }
  service: {name: string}
  status: BudgetStatus
  createdAt: Date
  updatedAt: Date
}

export interface CreateBudgetProps {
  description: string
  value: number
  date: Date | string
  clientId: string
  serviceId: number
  employeeId: string
}

export interface ChangeStatusProps {
  id: string
  status: BudgetStatus
}

///////////////// SERVICE ///////////////
export interface ServiceProps {
  id: number
  name: string
  description: string
  createdAt: Date
  updatedAt: Date
}