import { create } from 'zustand';
import firebaseDataManager from '../firebase/dataManager';
import settingsReducer from '../utils/settingsReducer';

export const useFirebaseSettingsStore = create(
	(set, get) => ({
		settings: {},
		isLoading: false,
		isInitialized: false,

		// Initialize settings from Firebase
		initializeSettings: async () => {
			set({ isLoading: true });
			try {
				const settings = await firebaseDataManager.loadSettings();
				set({ 
					settings: settings && typeof settings === 'object' ? settings : {}, 
					isLoading: false, 
					isInitialized: true 
				});
			} catch (error) {
				console.error('Error initializing settings:', error);
				set({ 
					settings: {}, 
					isLoading: false, 
					isInitialized: true 
				});
			}
		},

		// Dispatch actions and save to Firebase
		settingsDispatch: async (actions) => {
			const currentSettings = get().settings;
			const newSettings = settingsReducer(currentSettings, actions);
			
			// Validate data before saving - ensure it's a proper object
			const safeSettings = newSettings && typeof newSettings === 'object' ? newSettings : {};
			
			// Update local state immediately
			set({ settings: safeSettings });
			
			// Save to Firebase in background
			try {
				await firebaseDataManager.saveSettings(safeSettings);
			} catch (error) {
				console.error('Error saving settings to Firebase:', error);
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
			if (Object.keys(currentState.settings).length > 0 || currentState.isInitialized || currentState.isLoading) {
				set({ 
					settings: {}, 
					isInitialized: false, 
					isLoading: false 
				});
			}
		}
	})
);
