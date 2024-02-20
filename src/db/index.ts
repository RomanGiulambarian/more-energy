import { User } from 'src/users/entities/user.entity';
import { СoachToUser } from './entities/coach-to-user.entity';
import { Evaluation } from './entities/evaluation.entity';
import { Via } from './entities/via.entity';
import { HealthVision } from './entities/health-vision.entyty';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { ExerciseSteps } from 'src/exercise-steps/entities/exercise-steps.entity';
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
];
