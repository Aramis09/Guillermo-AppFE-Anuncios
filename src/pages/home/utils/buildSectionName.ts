export const buildSectionName = (pathName: string) => {
  switch (pathName) {
    case "/":
      return "Principal"
    case "/useful-info":
      return "Informacion%20Util"
    case "/events":
      return "Eventos"
    default:
      return "Principal"
  }
}

