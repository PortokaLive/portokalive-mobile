import { AsyncStorage } from "react-native";

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) {
      throw new Error("Unable to get item from async storage");
    }
    return value;
  } catch (error) {
    console.error(error);
  }
};

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    if (typeof value !== "string") {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};
