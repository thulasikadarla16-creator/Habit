import { create } from 'zustand';
import firebaseDataManager from '../firebase/dataManager';
import habitsReducer from '../utils/habitsReducer';

export const useFirebaseHabitsStore = create(
	(set, get) => ({
		habits: [],
		isLoading: false,
		isInitialized: false,

		// Initialize habits from Firebase
		initializeHabits: async () => {
			set({ isLoading: true });
			try {
				const habits = await firebaseDataManager.loadHabits();
				const safeHabits = Array.isArray(habits) ? habits : [];
				set({ 
					habits: safeHabits, 
					isLoading: false, 
					isInitialized: true 
				});
			} catch (error) {
				console.error('Error initializing habits:', error);
				set({ 
					habits: [], 
					isLoading: false, 
					isInitialized: true 
				});
			}
		},

		// Dispatch actions and save to Firebase
		habitsDispatch: async (actions) => {
			const currentHabits = get().habits;
			const newHabits = habitsReducer(currentHabits, actions);
			
			// Validate data before saving
			const safeHabits = Array.isArray(newHabits) ? newHabits.filter(habit => 
				habit && typeof habit === 'object' && habit.title && habit.frequency
			) : [];
			
			console.log('Dispatching habit action:', actions.type, 'New habits:', safeHabits);
			
			// Update local state immediately
			set({ habits: safeHabits });
			
			// Save to Firebase in background
			try {
				await firebaseDataManager.saveHabits(safeHabits);
				console.log('Successfully saved habits to Firebase');
			} catch (error) {
				console.error('Error saving habits to Firebase:', error);
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
			if (currentState.habits.length > 0 || currentState.isInitialized || currentState.isLoading) {
				set({ 
					habits: [], 
					isInitialized: false, 
					isLoading: false 
				});
			}
		}
	})
);
