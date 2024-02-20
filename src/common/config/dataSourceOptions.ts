import { DataSource } from 'typeorm';
import 'dotenv/config';
import { exportEntites } from 'src/db';

export default new DataSource({
  type: 'postgres' as const,
  host: 'localhost',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: exportEntites,
  migrations: ['dist/db/migrations/*.{js,ts}'],
});
