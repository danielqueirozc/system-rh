
///////////// users /////////////
export const Role = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE'
} as const

export type RoleType = typeof Role[keyof typeof Role]

export interface UserProps {
  id: string
  name: string
  email: string
  role: RoleType
  employeeId: string | null
}

export interface CreateAccountProps {
  name: string
  email: string
  password: string
  role: RoleType
  employeeId?: string
}

export interface AuthenticateProps {
  email: string
  password: string
}

export interface AuthenticateResponseProps {
  user: UserProps
  token: string
}

/////// APPOINTMENT//////////
const AppointmentStatus = {
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const

export type AppointmentStatus = typeof AppointmentStatus[keyof typeof AppointmentStatus]

export interface AppointmentsProps {
  id: string
  client: { name: string }
  service: { name: string }
  employee: { name: string } | null
  description: string
  serviceDate: Date
  status: AppointmentStatus
  createdAt: Date
  updatedAt: Date
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

export interface CreateAppointmentClientPayload {
  serviceName: string
  serviceDate: string | Date
  clientName: string
  clientEmail: string
  clientPhone: string
  clientAddress: string
  clientDescription?: string
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

type ClientStatus = typeof ClientStatus[keyof typeof ClientStatus]

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

/////////// employee/////////////
export const EmployeeStatus = {
  ACTIVE: 'ACTIVE',
  INATIVO: 'INACTIVE',
  VACATION: 'VACATION',
} as const

export type EmployeeStatus = typeof EmployeeStatus[keyof typeof EmployeeStatus]

export interface EmployeeProps {
  id: string
  name: string
  function: string
  status: EmployeeStatus
  email: string
  phone: string
  createdAt: Date
  updatedAt: Date
}
export interface EmployeePerformance {
  averagePerService: number
  completedServices: number
  employeeId: string | null
  employeeName: string
  employeeStatus: EmployeeStatus | null
  generatedRevenue: number
}

export interface CreateEmployee {
  name: string
  email: string
  phone: string
  function: string
}

export interface EditEmployee {
  id: string
  name: string
  email: string
  phone: string
  function: string
  status: EmployeeStatus
}
