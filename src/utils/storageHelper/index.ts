type StoredData = {
    value: string;
    expiration: number;
  }
  
    const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  export const setLocalStorageWithExpiration = (key: string, value: string) => {
    const expiration = Date.now() + EXPIRATION_TIME;
    const data: StoredData = { value, expiration };
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getLocalStorageWithExpiration = (key: string): string | null => {
    const data = localStorage.getItem(key);
    if (!data) return null;
  
    const storedData: StoredData = JSON.parse(data);
    if (Date.now() > storedData.expiration) {
      localStorage.removeItem(key);
      return null;
    }
    return storedData.value;
  };