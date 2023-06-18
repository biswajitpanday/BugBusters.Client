import { StorageConstant } from "@/constant";

const storage = {
  // #region Generic
  get: (key: string) => {
    return JSON.parse(
      window.localStorage.getItem(StorageConstant.Prefix() + key) as string
    );
  },
  set: (key: string, value: string) => {
    window.localStorage.setItem(
      StorageConstant.Prefix() + key,
      JSON.stringify(value)
    );
  },
  clear: (key: string) => {
    window.localStorage.removeItem(StorageConstant.Prefix() + key);
  },
  // #endregion

  
  // #region Token
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(StorageConstant.Token()) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(StorageConstant.Token(), JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(StorageConstant.Token());
  },
  // #endregion

  // #region UserProfile
  getUserProfile: () => {
    return JSON.parse(
      window.localStorage.getItem(StorageConstant.UserProfile()) as string
    );
  },
  setUserProfile: (userProfile: string) => {
    window.localStorage.setItem(
      StorageConstant.UserProfile(),
      JSON.stringify(userProfile)
    );
  },
  clearUserProfile: () => {
    window.localStorage.removeItem(StorageConstant.UserProfile());
  },
  // #endregion

  // #region Clear All Local Storage
  clearStorage: () => {
    window.localStorage.clear();
  },
  // #endregion
};

export default storage;
