function settingsReducer(settings, actions) {
	let newSettings = { ...settings, ...actions };
	// localStorage saving removed - handled by Firebase store

	return newSettings;
}

export default settingsReducer;