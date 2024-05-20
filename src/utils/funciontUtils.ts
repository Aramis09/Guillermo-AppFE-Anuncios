import { StateAuthContext } from "../contexts/hooks/useContextAuth";

export const isCategorySelected = (list: string[], category: string) => {
  if (!list.includes(category)) return false;
  return true;
};



export const blockAccesPrivateUrls = (
  contextAuth: StateAuthContext,
  privateUrls: string[],
  location: string
) => {
  if (!privateUrls.includes(location)) return false
  if (!contextAuth.statusUser.acces) {
    return true
  }
  return false
};