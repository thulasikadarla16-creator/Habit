import { useLayoutEffect } from "react";
import { useFirebaseSettingsStore } from "../stores/firebaseSettingsStore";

function useColorScheme() {
	const settings = useFirebaseSettingsStore((s) => s.settings);

	useLayoutEffect(
		() => {
			document.documentElement.style.colorScheme = settings.isDarkSchemeForced
				? 'dark'
				: 'light dark';
		},
		[settings]
	);
}

export default useColorScheme;