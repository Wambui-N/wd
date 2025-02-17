// src/lib/utils/index.ts

import classNames from "classnames";

// Utility function for conditional classnames
export const cn = (...classes: (string | undefined | false | null)[]) => {
  return classNames(...classes);
};
