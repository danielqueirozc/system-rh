const AppointmentStatus = {
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
} as const

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
// export interface CreateAppointmentAdminProps {
//   serviceName: string
//   serviceDate: string
//   clientName: string
//   clientEmail: string
//   clientPhone: string
//   clientAddress: string
//   clientDescription?: string
// }

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
