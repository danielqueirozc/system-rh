import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { useReportStore } from "@/context/report-store"
import { useEffect, useState } from "react"

export function SelectYear() {
  const [year, setYear] = useState('2026')

  const { getReports } = useReportStore()

  useEffect(() => {
    getReports()
  }, [])
  
  function handleChange(value: string) {
    setYear(value)
    getReports(Number(value))
  }

  return (
    <Select value={year} onValueChange={handleChange}>
      <SelectTrigger className="w-30 border-0 bg-gray-50 py-4">
        <SelectValue placeholder="2026" />
      </SelectTrigger>
      <SelectContent className="min-w-0 w-30">
        <SelectGroup>
          <SelectItem value="2026">2026</SelectItem>
          <SelectItem value="2025">2025</SelectItem>
          <SelectItem value="2024">2024</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}