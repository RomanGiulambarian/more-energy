import { DataSource } from 'typeorm';
import { СoachToUser } from 'src/db/entities/coach-to-user.entity';
import { Evaluation } from 'src/db/entities/evaluation.entity';
import { HealthVision } from 'src/db/entities/health-vision.entyty';
import { Via } from 'src/db/entities/via.entity';
import { User } from 'src/users/entities/user.entity';

import 'dotenv/config';

export default new DataSource({
  type: 'postgres' as const,
  host: 'localhost',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [User, СoachToUser, Evaluation, Via, HealthVision],
  migrations: ['dist/db/migrations/*.{js,ts}'],
});
