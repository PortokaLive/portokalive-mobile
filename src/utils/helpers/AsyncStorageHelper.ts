import AsyncStorage from "@react-native-community/async-storage";

export const getItem = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};

export const setItem = async (key: string, value: any): Promise<void> => {
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  await AsyncStorage.setItem(key, value);
};

export const removeItem = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};
