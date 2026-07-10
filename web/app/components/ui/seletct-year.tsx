import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"

export function SelectYear() {
  return (
    <Select>
      <SelectTrigger className="w-30 border-0 bg-gray-50 py-4">
        <SelectValue placeholder="2026" />
      </SelectTrigger>
      <SelectContent className="min-w-0 w-30">
        <SelectGroup>
          <SelectItem value="light">2026</SelectItem>
          <SelectItem value="dark">2025</SelectItem>
          <SelectItem value="system">2024</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}