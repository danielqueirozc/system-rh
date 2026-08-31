'use client'

import { EditEmployeeDialog } from "@/app/components/edit-employee-dialog";
import { EmployeeFormDialog } from "@/app/components/employee-form-dialog";
import { Card } from "@/app/components/ui/card";
import { useEmployeeStore } from "@/context/employee-stores";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/get-initials";
import { Briefcase, Mail, Phone, Search, SquarePen, Trash2 } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function Enployees() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [search, setSearch] = useState('')
  
  const { employee, getEmployees, deleteEmployee } = useEmployeeStore()

  const filtered = employee.filter(f => 
    f.employee.name.toLowerCase().includes(search.toLowerCase())
  )
  
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    handleResize()
    
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    getEmployees()
  }, [])

  return (
   <Fragment>
    {windowWidth >= 1024 ? (
      <div className="flex-1 flex flex-col gap-6">
        <header className="sticky top-0 z-10 bg-white p-5.5 text-gray-700 border-b border-gray-200">
          Fuincionários
        </header>

        <main className="px-6">
          <Card className="p-6 flex flex-col">
            <div className="flex justify-between">
              <div className="w-104 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 focus-within:outline-none focus-within:ring-4 focus-within:ring-[#8080C7] transition-shadow">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Buscar Funcionários..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-500"
                />
              </div>

              <EmployeeFormDialog />
            </div>

            <div className="grid grid-cols-3 gap-4 overflow-y-auto p-1">
              {filtered.map(emp => (
                <Card key={emp.employee.id} className="p-6 flex flex-col gap-10 justify-between">
                  <div className="w-full flex justify-baseline gap-4">
                    <div className="flex justify-center items-center w-18 h-18 rounded-full bg-blue text-white">
                      PH
                    </div>
                    <div className="flex flex-col gap-3">
                      <p>{emp.employee.name}</p>

                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        {emp.employee.function}
                      </div>

                      <div className={cn("flex justify-center w-12 py-0.5 rounded-lg bg-blue text-white text-xs",
                        emp.employee.status === 'VACATION' ? 'bg-gray-100 text-blue' : ''
                      )}>
                        {emp.employee.status === 'ACTIVE' ? 'ativo' : emp.employee.status === 'VACATION' ? 'férias' : 'inativo'}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-gray-500">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      {emp.employee.email}
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      {emp.employee.phone}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg bg-violet-100 p-2">
                    <p className="text-gray-500">Serviços Concluídos</p>
                    <span className="text-purple-600">{emp.completedServices}</span>
                  </div>

                  <div className="flex gap-2">
                    <EditEmployeeDialog employee={emp.employee} />

                    <button
                      onClick={() => deleteEmployee(emp.employee.id)}
                      className="border border-violet-100 px-2.5 py-1 rounded-lg hover:bg-violet-100"
                    >
                      <Trash2 className="text-red-500" size={16} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </main>
      </div>
    ) : (
      <div className="flex flex-col">  
        <div className="px-4 pt-24">
          <Card className="flex flex-col gap-12 px-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 px-4 text-gray-500 bg-gray-50 rounded-lg focus-within:ring-3 focus-within:border focus-within:border-blue focus-within:ring-[#8080C7]">
            <Search size={18} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
              placeholder="Buscar funcionários"
              className="w-full h-8 focus:outline-none placeholder:text-gray-500"
            />
            </div>

            <EmployeeFormDialog />
          </div>

          <div className="flex flex-col gap-4">
            {filtered.map(emp => (
              <Card key={emp.employee.id} className="p-6 flex flex-col gap-10">
                <div className="w-full flex justify-baseline gap-4">
                  <div className="flex justify-center items-center w-18 h-18 rounded-full bg-blue text-white">
                    {getInitials(emp.employee.name)}
                  </div>
                  <div className="flex flex-col gap-3">
                    <p>{emp.employee.name}</p>

                    <div className="flex items-center gap-2">
                      <Briefcase size={16} />
                      {emp.employee.function}
                    </div>

                    <div className="flex justify-center w-12 py-0.5 rounded-lg bg-blue text-white text-xs">Ativo</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {emp.employee.email}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {emp.employee.phone}
                  </div>
                </div>

                <div className="flex flex-col gap-2 rounded-lg bg-violet-100 p-2">
                  <p className="text-gray-500">Serviços Concluídos</p>
                  <span className="text-green-600">{emp.completedServices}</span>
                </div>

                <div className="flex gap-2">
                  <button className="w-full flex justify-center items-center gap-4 py-1 border border-violet-100 rounded-lg">
                    <SquarePen size={16} />
                    Editar
                  </button>
                  <button
                    onClick={() => deleteEmployee(emp.employee.id)}
                    className="border border-violet-100 px-2.5 py-1 rounded-lg"
                  >
                    <Trash2 className="text-red-500" size={16} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
          </Card>
        </div>
      </div>
    )}
   </Fragment>
  )
}