import styles from '../../css/ColorBlock.module.css';

// stores
import { useColorsStore } from '../../stores/colorsStore';

// icon
import { FaCheck } from "react-icons/fa";

function ColorBlock({ habits, currentColorIndex }) {

	const dbColors = useColorsStore((s) => s.colors);
	
	// Safety check: ensure colors is an array
	const safeColors = Array.isArray(dbColors) ? dbColors : [];

	const colorList = safeColors.map((color, index) => {
		const safeHabits = Array.isArray(habits) ? habits : [];
		const isColorUsed = safeHabits.find((habit) => Number(habit.colorIndex) === index);

		return (
			<label
				key={color}
				style={{
					backgroundColor: color,
					transform: isColorUsed ? 'scale(0.75)' : ''
				}}
			>
				<input
					type="radio"
					name="colorIndex"
					id={color}
					value={index}
					defaultChecked={index === Number(currentColorIndex) || !index}
				/>

				<FaCheck />
			</label>
		);
	});

	return (
		<section>
			<div className={styles.header}>
				<h3>Color</h3>
			</div>

			<div className={styles.colorList}>
				{colorList}
			</div>
		</section>
	);
}

export default ColorBlock;