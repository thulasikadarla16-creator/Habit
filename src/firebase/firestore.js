import { 
  doc, 
  setDoc, 
  getDoc
} from 'firebase/firestore';
import { db } from './config';

// Save user data to Firestore
export const saveUserData = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

// Get user data from Firestore
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

// Save habits data
export const saveHabitsData = async (userId, habits) => {
  try {
    const habitsRef = doc(db, 'users', userId, 'data', 'habits');
    await setDoc(habitsRef, {
      habits,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving habits data:', error);
    throw error;
  }
};

// Get habits data
export const getHabitsData = async (userId) => {
  try {
    const habitsRef = doc(db, 'users', userId, 'data', 'habits');
    const habitsSnap = await getDoc(habitsRef);
    
    if (habitsSnap.exists()) {
      const data = habitsSnap.data();
      return Array.isArray(data.habits) ? data.habits : [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting habits data:', error);
    return [];
  }
};

// Save diary data
export const saveDiaryData = async (userId, diary) => {
  try {
    const diaryRef = doc(db, 'users', userId, 'data', 'diary');
    await setDoc(diaryRef, {
      diary,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving diary data:', error);
    throw error;
  }
};

// Get diary data
export const getDiaryData = async (userId) => {
  try {
    const diaryRef = doc(db, 'users', userId, 'data', 'diary');
    const diarySnap = await getDoc(diaryRef);
    
    if (diarySnap.exists()) {
      const data = diarySnap.data();
      return Array.isArray(data.diary) ? data.diary : [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting diary data:', error);
    return [];
  }
};

// Save settings data
export const saveSettingsData = async (userId, settings) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'data', 'settings');
    await setDoc(settingsRef, {
      settings,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving settings data:', error);
    throw error;
  }
};

// Get settings data
export const getSettingsData = async (userId) => {
  try {
    const settingsRef = doc(db, 'users', userId, 'data', 'settings');
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      return data.settings && typeof data.settings === 'object' ? data.settings : {};
    } else {
      return {};
    }
  } catch (error) {
    console.error('Error getting settings data:', error);
    return {};
  }
};
