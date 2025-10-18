import styles from '../css/HabitList.module.css';

// react
import { useState } from 'react';

// framer
import { AnimatePresence } from 'framer-motion';

// stores
import { useColorsStore } from '../stores/colorsStore';

// components
import Habit from "./Habit/Habit";

// db
import icons from '../db/dbIcons';

function HabitList({ habits, isArchive = false }) {

	const dbColors = useColorsStore((s) => s.colors);
	
	// Safety check: ensure colors is an array
	const safeColors = Array.isArray(dbColors) ? dbColors : [];
	const [visibleMenuIndex, setVisibleMenuIndex] = useState(-1);

	const handleToggleMenu = (i) => {
		document.body.classList.toggle('no-scroll');
		setVisibleMenuIndex(i === visibleMenuIndex ? -1 : i);
	};

	// Multiple safety checks: ensure habits is an array and not null/undefined
	const safeHabits = Array.isArray(habits) && habits !== null && habits !== undefined ? habits : [];
	
	// Additional safety check for individual habit objects
	const validHabits = safeHabits.filter(h => h && typeof h === 'object' && h.title);

	const habitList = validHabits.map(
		(h, index) => {
			// Additional safety checks for individual habit properties
			const safeHabit = {
				...h,
				title: h.title || 'Untitled Habit',
				iconTitle: h.iconTitle || '',
				colorIndex: typeof h.colorIndex === 'number' ? h.colorIndex : 0,
				completedDays: Array.isArray(h.completedDays) ? h.completedDays : [],
				frequency: typeof h.frequency === 'number' ? h.frequency : 1
			};

			return (
				<Habit
					key={safeHabit.title + index}
					{...{ ...safeHabit, index, isArchive }}
					icon={icons.find(([iconTitle]) => iconTitle === safeHabit.iconTitle)?.[1] ?? '?'}
					color={safeColors[safeHabit.colorIndex] || safeColors[0]}
					isMenuVisible={visibleMenuIndex === index}
					onShowMenu={(i) => handleToggleMenu(i)}
				/>
			);
		}
	);

	return (
		<div className={styles.habitList}>
			<AnimatePresence initial={false}>
				{habitList}
			</AnimatePresence>
		</div>
	);
}

export default HabitList;