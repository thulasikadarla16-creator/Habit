import './App.css';

// router
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// framer
import { AnimatePresence } from 'framer-motion';

// stores
import { useDialogStore } from './stores/dialogStore';

// main components
import FirebaseMainPage from './components/FirebaseMainPage';
import Modal from './components/Modal';
import Dialog from './components/Containment/Dialog';
import HeroPage from './components/HeroPage/HeroPage';

// context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// hooks
import useColorScheme from './hooks/useColorScheme';
import useAchievementsCheck from './hooks/useAchievementsCheck';
import { useFirebaseStores } from './hooks/useFirebaseStores';

// db
import dbModalRoutes from './db/dbModalRoutes';

const PUBLIC_URL = process.env.PUBLIC_URL;

function AppContent() {
	const location = useLocation();
	const isDialogVisible = useDialogStore((s) => s.isVisible);
	const { user, loading } = useAuth();

	// Initialize Firebase stores when user is authenticated
	useFirebaseStores();

	// Get colors from database based on settings or system theme
	useColorScheme();

	// Check achievements when dependencies change
	useAchievementsCheck();

	// Show loading spinner while checking authentication
	if (loading) {
		return (
			<main className="App">
				<div style={{ 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center', 
					height: '100vh',
					background: '#030303',
					color: 'white'
				}}>
					<div>Loading...</div>
				</div>
			</main>
		);
	}

	// Show hero page if user is not authenticated
	if (!user) {
		return (
			<main className="App">
				<HeroPage />
			</main>
		);
	}

	// Show main app if user is authenticated
	return (
		<main className="App">
			<AnimatePresence initial={false}>
				<Routes location={location} key={location.pathname}>
					<Route
						path='*'
						element={<Navigate to={PUBLIC_URL} />}
					/>

					<Route
						path={PUBLIC_URL}
						element={<FirebaseMainPage />}
					/>

					<Route
						path={`${PUBLIC_URL}/modal`}
						element={<Modal />}
					>
						{dbModalRoutes.map((r) => (
							<Route key={r.path} path={r.path} element={r.element} />
						))}
					</Route>
				</Routes>

				{isDialogVisible && (
					<Dialog key="dialog" />
				)}
			</AnimatePresence>
		</main>
	);
}

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;