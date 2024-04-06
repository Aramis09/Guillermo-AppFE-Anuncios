export const buildSectionName = (pathName: string) => {
  switch (pathName) {
    case "/":
      return "Main"
    case "/useful-info":
      return "Useful%20Information"
    case "/events":
      return "Events"
    default:
      return "Main"
  }
}