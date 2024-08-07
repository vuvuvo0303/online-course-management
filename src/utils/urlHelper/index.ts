import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";

export const validHttpUrl = (string: string): boolean => {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

export const validateUrl = (_: RuleObject, value: StoreValue): Promise<void> => {
    return validHttpUrl(value as string) ? Promise.resolve() : Promise.reject("This is not a valid video URL");
  };