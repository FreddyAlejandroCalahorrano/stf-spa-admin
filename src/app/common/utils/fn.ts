const getMessageError = (data: string | any) => {
  return typeof data === 'string' ? data : "Error del servidor"
}

const pad = (num: number, replace?: string): string => {
  return num.toString().padStart(2, replace || "0")
}

const getToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`
}

const MONTHS = [
  {value: 1, maxDay: 31, label: 'Enero'},
  {value: 2, maxDay: 29, label: 'Febrero'},
  {value: 3, maxDay: 31, label: 'Marzo'},
  {value: 4, maxDay: 30, label: 'Abril'},
  {value: 5, maxDay: 31, label: 'Mayo'},
  {value: 6, maxDay: 30, label: 'Junio'},
  {value: 7, maxDay: 31, label: 'Julio'},
  {value: 8, maxDay: 31, label: 'Agosto'},
  {value: 9, maxDay: 30, label: 'Septiembre'},
  {value: 10, maxDay: 31, label: 'Octubre'},
  {value: 11, maxDay: 30, label: 'Noviembre'},
  {value: 12, maxDay: 31, label: 'Diciembre'}
]

export {
  getMessageError,
  pad,
  getToday,
  MONTHS
}
