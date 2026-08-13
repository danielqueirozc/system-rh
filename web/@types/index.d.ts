export interface GetClientProps {
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