import { create } from 'zustand';
import getColors from '../utils/getColors';

export const useColorsStore = create(
	() => ({
		colors: getColors('dark') // Default to dark theme colors
	})
);
