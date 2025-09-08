/* Core */
import { Dispatch, Middleware, UnknownAction } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { isProd } from "../utils/utils";

const middlewares: Middleware<{}, any, Dispatch<UnknownAction>>[] = [];

if (!isProd()) {
  middlewares.push(
    createLogger({
      duration: true,
      timestamp: false,
      collapsed: true,
      colors: {
        title: () => "#139BFE",
        prevState: () => "#1C5FAF",
        action: () => "#149945",
        nextState: () => "#A47104",
        error: () => "#ff0005",
      },
      predicate: () => typeof window !== "undefined",
    })
  );
}

export { middlewares };
