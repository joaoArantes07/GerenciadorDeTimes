import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "./storageConfig";

/** Essa função acessa os grupos que estão armazenados no Group Create.*/

export async function groupsGetAll() {
    try {
        const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
        const groups: string[] = storage ? JSON.parse(storage) : [];
        return groups;
    } catch (error) {
        throw error;
    }
}