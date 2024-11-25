import { env } from '@utils/env';
import { createApp } from './app';
import { DevelopmentLogger, ProductionLogger } from '@utils/log';
import { initializeServices } from '@services/services';
import { initializeAdapters } from '@stores/stores';

const init = () => {
  const logger =
    env.NODE_ENV === 'production'
      ? new ProductionLogger(env.LOGGER)
      : new DevelopmentLogger();
  const adapters = initializeAdapters(logger);
  const services = initializeServices(logger, adapters);

  return createApp(logger, services);
};

init().listen(env.PORT, () => console.log(`api listening on port ${env.PORT}`));
