import styles from '../css/Header.module.css';

// router
import { Link } from 'react-router-dom';

// components
import IconButton from './Actions/IconButton';

// icons
import { FaPlus, FaBars, FaAward, FaSignOutAlt } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';

// auth
import { signOutUser } from '../firebase/auth';

const publicUrl = process.env.PUBLIC_URL;

function FirebaseHeader() {

	const navItems = [
		['/modal/habitEditor', 'Create new habit', <FaPlus />],
		['/modal/diary', 'Main Diary', <MdLibraryBooks />],
		['/modal/achievements', 'Achievements', <FaAward />],
		['/modal/menu', 'Menu', <FaBars />]
	].map(
		([path, title, icon]) => (
			<li key={path}>
				<Link to={publicUrl + path} state={{ modalTitle: title }}>
					<IconButton {...{ icon, title }} />
				</Link>
			</li>
		)
	);

	const handleSignOut = async () => {
		try {
			await signOutUser();
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	return (
		<header className={styles.header}>
			<div className={styles.logoWrapper}>
				<h1>Habit Tracker</h1>
			</div>

			<nav>
				<ul className={styles.navList}>
					{navItems}
					<li>
						<IconButton 
							icon={<FaSignOutAlt />} 
							title="Sign Out" 
							onClick={handleSignOut}
						/>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default FirebaseHeader;
