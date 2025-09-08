declare module "redux-persist-transform-encrypt" {
  import { Transform } from "redux-persist";

  interface EncryptTransformOptions {
    secretKey: string;
    onError?: (error: Error) => void;
  }

  export function encryptTransform(
    options: EncryptTransformOptions
  ): Transform<any, any>;
}
