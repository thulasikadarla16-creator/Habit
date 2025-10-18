import { 
  getHabitsData, 
  saveHabitsData, 
  getDiaryData, 
  saveDiaryData, 
  getSettingsData, 
  saveSettingsData 
} from './firestore';

class FirebaseDataManager {
  constructor() {
    this.userId = null;
    this.isInitialized = false;
  }

  setUserId(userId) {
    this.userId = userId;
    this.isInitialized = true;
  }

  clearUserId() {
    this.userId = null;
    this.isInitialized = false;
  }

  async loadHabits() {
    if (!this.isInitialized || !this.userId) {
      return [];
    }
    
    try {
      const habits = await getHabitsData(this.userId);
      return habits || [];
    } catch (error) {
      console.error('Error loading habits from Firebase:', error);
      return [];
    }
  }

  async saveHabits(habits) {
    if (!this.isInitialized || !this.userId) {
      return;
    }
    
    try {
      await saveHabitsData(this.userId, habits);
    } catch (error) {
      console.error('Error saving habits to Firebase:', error);
    }
  }

  async loadDiary() {
    if (!this.isInitialized || !this.userId) {
      return [];
    }
    
    try {
      const diary = await getDiaryData(this.userId);
      return diary || [];
    } catch (error) {
      console.error('Error loading diary from Firebase:', error);
      return [];
    }
  }

  async saveDiary(diary) {
    if (!this.isInitialized || !this.userId) {
      return;
    }
    
    try {
      await saveDiaryData(this.userId, diary);
    } catch (error) {
      console.error('Error saving diary to Firebase:', error);
    }
  }

  async loadSettings() {
    if (!this.isInitialized || !this.userId) {
      return {};
    }
    
    try {
      const settings = await getSettingsData(this.userId);
      return settings || {};
    } catch (error) {
      console.error('Error loading settings from Firebase:', error);
      return {};
    }
  }

  async saveSettings(settings) {
    if (!this.isInitialized || !this.userId) {
      return;
    }
    
    try {
      await saveSettingsData(this.userId, settings);
    } catch (error) {
      console.error('Error saving settings to Firebase:', error);
    }
  }
}

// Create a singleton instance
const firebaseDataManager = new FirebaseDataManager();
export default firebaseDataManager;
