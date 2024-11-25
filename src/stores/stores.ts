import { ILogger } from '@utils/log';

/** Holds all classes that directly communicate with the database. */
export interface Stores {}

/**
 * Creates an instance of the {@link Stores}.
 *
 * @param logger - A logging instance.
 */
export const initializeAdapters = (logger: ILogger) => {
  const store: Stores = {};
  return store;
};
