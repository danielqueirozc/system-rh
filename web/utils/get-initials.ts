export function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/) // separa por um ou mais espaços
  const first = parts[0]
  const last = parts[parts.length - 1]

  return (first[0] + (last?.[0] ?? '')).toUpperCase()
}

////////// exexmples/////////

// getInitials('Daniel Queiroz') // "DQ"
// getInitials('Daniel Queiroz Silva') // "DS" (primeiro e último nome)
// getInitials('Daniel') // "D" (só um nome, sem sobrenome)
