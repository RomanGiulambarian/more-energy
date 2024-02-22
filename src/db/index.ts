import { User } from 'src/users/entities/user.entity';
import { Media } from 'src/media/entities/media.entity';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { ExerciseSteps } from 'src/exercise-steps/entities/exercise-steps.entity';

import { СoachToUser } from './entities/coach-to-user.entity';
import { Evaluation } from '../users/entities/evaluation.entity';
import { Via } from '../users/entities/via.entity';
import { HealthVision } from '../users/entities/health-vision.entyty';
import { Favorites } from '../favorites/entities/favorites.entity';

export const exportEntites = [
  User,
  СoachToUser,
  Evaluation,
  Via,
  HealthVision,
  Exercise,
  ExerciseSteps,
  Favorites,
  Media,
];
