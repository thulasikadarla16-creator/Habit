import styles from '../../css/IconBlock.module.css';

// react
import { useState } from 'react';

// db
import icons from '../../db/dbIcons';

function IconBlock({ habits, currentIconTitle }) {

	const [showMore, setShowMore] = useState(false);
	const [selectedIcon, setSelectedIcon] = useState(currentIconTitle || 'default');

	const currentIconIndex = icons.findIndex((el) => {
		return Array.isArray(el) && el[0] === currentIconTitle;
	});

	const iconList = [
		<input
			key="selectedIcon"
			type="hidden"
			name="iconTitle"
			id="iconTitle"
			value={selectedIcon}
			readOnly
		/>
	];

	const count = showMore ? icons.length : 14;

	for (let index = 0; index < count; index++) {
		if (typeof icons[index] === 'string') {
			iconList.push(
				<div
					key={icons[index]}
					className={styles.iconCategory}
				>
					<small>{icons[index]}</small>
				</div>
			);

			continue;
		};

		const [iconTitle, icon] = icons[index];
		const isIconUsed = habits.find((habit) => habit.iconTitle === iconTitle);

		iconList.push(
			<label
				key={iconTitle}
				style={{ transform: isIconUsed ? 'scale(0.75)' : '' }}
			>
				<input
					type="radio"
					name="icon"
					id={iconTitle}
					value={iconTitle}
					onChange={(e) => setSelectedIcon(e.target.value)}
					defaultChecked={index === currentIconIndex || (!currentIconTitle && !index)}
				/>

				<div className={styles.iconBg} />

				{icon}
			</label>
		);
	};

	return (
		<section>
			<div className={styles.header}>
				<h3>Icon</h3>

				<button
					type='button'
					className='text-button'
					onClick={() => setShowMore((state) => !state)}
				>
					{'Show ' + (showMore ? 'less' : 'more')}
				</button>
			</div>

			<div className={styles.iconList}>
				{iconList}
			</div>
		</section>
	);
}

export default IconBlock;