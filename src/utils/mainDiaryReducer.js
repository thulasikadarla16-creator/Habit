function mainDiaryReducer(diary, actions) {
	let newDiary = [...diary];

	switch (actions.type) {
		case 'addNote':
			newDiary.push(actions.newNote);
			break;

		case 'editNote':
			newDiary = newDiary.map(
				(note) => {
					let updatedNote = note;

					if (note.date === actions.noteCreationDate) {
						updatedNote.text = actions.newText;
					};

					return updatedNote;
				}
			);
			break;

		case 'deleteNote':
			newDiary = newDiary.filter(
				(n) => n.date !== actions.noteCreationDate
			);
			break;

		default:
			break;
	};

	// localStorage saving removed - handled by Firebase store

	return newDiary;
}

export default mainDiaryReducer;