const _DBOptions = {
  type: 'sqlite',
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/*.js'],
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(_DBOptions, {
      type: 'sqlite',
      database: 'dev.sqlite',
      synchronize: true,
    });
    break;
  case 'test':
    Object.assign(_DBOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
      synchronize: true,
    });
    break;
  case 'production':
    Object.assign(_DBOptions, {
      type: 'mysql',
      database: process.env.DB_BASEDATOS,
      host: process.env.DB_HOST,
      port: process.env.DB_PUERTO,
      username: process.env.DB_USUARIO,
      password: process.env.DB_CONTRASENA,
      migrationsRun: true,
    });
    break;
  default:
    throw new Error('unknown environment');
}

export const DBOptions = _DBOptions;
