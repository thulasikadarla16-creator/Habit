import { create } from 'zustand';

import dbAchievements from '../db/dbAchievements';
import achievementsReducer from '../utils/achievementsReducer';

export const useAchievementsStore = create(
	(set) => ({
		achievements: dbAchievements,

		achievementsDispatch: (actions) => set(
			(s) => ({ achievements: achievementsReducer(s.achievements, actions) })
		)
	})
);
