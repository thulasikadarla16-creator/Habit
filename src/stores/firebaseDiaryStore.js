import { create } from 'zustand';
import firebaseDataManager from '../firebase/dataManager';
import mainDiaryReducer from '../utils/mainDiaryReducer';

export const useFirebaseDiaryStore = create(
	(set, get) => ({
		mainDiary: [],
		isLoading: false,
		isInitialized: false,

		// Initialize diary from Firebase
		initializeDiary: async () => {
			set({ isLoading: true });
			try {
				const diary = await firebaseDataManager.loadDiary();
				set({ 
					mainDiary: Array.isArray(diary) ? diary : [], 
					isLoading: false, 
					isInitialized: true 
				});
			} catch (error) {
				console.error('Error initializing diary:', error);
				set({ 
					mainDiary: [], 
					isLoading: false, 
					isInitialized: true 
				});
			}
		},

		// Dispatch actions and save to Firebase
		mainDiaryDispatch: async (actions) => {
			const currentDiary = get().mainDiary;
			const newDiary = mainDiaryReducer(currentDiary, actions);
			
			// Validate data before saving
			const safeDiary = Array.isArray(newDiary) ? newDiary.filter(item => 
				item && typeof item === 'object' && item.date && item.text
			) : [];
			
			// Update local state immediately
			set({ mainDiary: safeDiary });
			
			// Save to Firebase in background
			try {
				await firebaseDataManager.saveDiary(safeDiary);
			} catch (error) {
				console.error('Error saving diary to Firebase:', error);
			}
		},

		// Set user ID for Firebase operations
		setUserId: (userId) => {
			firebaseDataManager.setUserId(userId);
		},

		// Clear user data
		clearUserData: () => {
			firebaseDataManager.clearUserId();
			// Only update if there's actually data to clear
			const currentState = get();
			if (currentState.mainDiary.length > 0 || currentState.isInitialized || currentState.isLoading) {
				set({ 
					mainDiary: [], 
					isInitialized: false, 
					isLoading: false 
				});
			}
		}
	})
);
