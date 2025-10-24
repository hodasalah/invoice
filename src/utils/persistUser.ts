// حفظ واسترجاع وحذف المستخدم من localStorage

export const saveUserToLocalStorage = (user: any) => {
	try {
		localStorage.setItem('currentUser', JSON.stringify(user));
	} catch (error) {
		console.error('Error saving user to localStorage:', error);
	}
};

export const getUserFromLocalStorage = () => {
	try {
		const storedUser = localStorage.getItem('currentUser');
		return storedUser ? JSON.parse(storedUser) : null;
	} catch (error) {
		console.error('Error reading user from localStorage:', error);
		return null;
	}
};

export const removeUserFromLocalStorage = () => {
	try {
		localStorage.removeItem('currentUser');
	} catch (error) {
		console.error('Error removing user from localStorage:', error);
	}
};
