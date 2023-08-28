'use client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { lightTheme, darkTheme } from './theme';
import { PaletteMode } from '@mui/material';
export const ColorModeContext = React.createContext({
	toggleColorMode: () => {},
});

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mode, setMode] = React.useState<PaletteMode>(() =>
		getDefaultThemePreference(),
	);
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[],
	);
	return (
		<NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider
					theme={mode === 'light' ? lightTheme : darkTheme}
				>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					{children}
				</ThemeProvider>
			</ColorModeContext.Provider>
		</NextAppDirEmotionCacheProvider>
	);
}

// Util functions
function getDefaultThemePreference(): PaletteMode {
	return localStorage.getItem('unit-convertor-theme-preference') === 'dark'
		? 'dark'
		: 'light';
}
