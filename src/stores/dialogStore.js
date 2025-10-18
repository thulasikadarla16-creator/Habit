import { create } from 'zustand';

export const useDialogStore = create(
	(set) => ({
		isVisible: false,
		title: '',
		subTitle: '',
		text: '',
		imgSrc: '',

		open: (dialogData) => set({
			isVisible: true,
			title: dialogData.title || '',
			subTitle: dialogData.subTitle || '',
			text: dialogData.text || '',
			imgSrc: dialogData.imgSrc || ''
		}),

		close: () => set({
			isVisible: false,
			title: '',
			subTitle: '',
			text: '',
			imgSrc: ''
		})
	})
);
