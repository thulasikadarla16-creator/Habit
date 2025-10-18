import { useEffect } from 'react';

import { useAchievementsStore } from '../stores/achievementsStore';
import { useFirebaseHabitsStore } from '../stores/firebaseHabitsStore';
import { useFirebaseDiaryStore } from '../stores/firebaseDiaryStore';
import { useDialogStore } from '../stores/dialogStore';

import useIsInitialRender from './useIsInitialRender';

function useAchievementsCheck() {

	const isInitialRender = useIsInitialRender();
	const achievementsDispatch = useAchievementsStore((s) => s.achievementsDispatch);
	const { habits } = useFirebaseHabitsStore();
	const { mainDiary } = useFirebaseDiaryStore();
	const openDialog = useDialogStore((s) => s.open);

	useEffect(
		() => {
			achievementsDispatch({
				habits,
				mainDiary,
				onOpenDialog: openDialog,
				isInitialRender: isInitialRender.current
			});
		},
		[achievementsDispatch, habits, isInitialRender, mainDiary, openDialog]
	);
}

export default useAchievementsCheck;