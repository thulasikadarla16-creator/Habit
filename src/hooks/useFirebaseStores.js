import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFirebaseHabitsStore } from '../stores/firebaseHabitsStore';
import { useFirebaseDiaryStore } from '../stores/firebaseDiaryStore';
import { useFirebaseSettingsStore } from '../stores/firebaseSettingsStore';

export const useFirebaseStores = () => {
  const { user } = useAuth();
  const habitsStore = useFirebaseHabitsStore();
  const diaryStore = useFirebaseDiaryStore();
  const settingsStore = useFirebaseSettingsStore();
  const isInitializing = useRef(false);

  useEffect(() => {
    // Prevent multiple simultaneous initializations
    if (isInitializing.current) return;
    
    isInitializing.current = true;

    const initializeStores = async () => {
      try {
        if (user) {
          // Set user ID for all stores
          habitsStore.setUserId(user.uid);
          diaryStore.setUserId(user.uid);
          settingsStore.setUserId(user.uid);

          // Initialize all stores
          await Promise.all([
            habitsStore.initializeHabits(),
            diaryStore.initializeDiary(),
            settingsStore.initializeSettings()
          ]);
        } else {
          // Clear all stores when user signs out
          habitsStore.clearUserData();
          diaryStore.clearUserData();
          settingsStore.clearUserData();
        }
      } finally {
        isInitializing.current = false;
      }
    };

    initializeStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]); // Only depend on user.uid, not the entire user object

  return {
    habitsStore,
    diaryStore,
    settingsStore
  };
};
