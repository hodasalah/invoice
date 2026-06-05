/**
 * Utility to upload an image to ImgBB and return the direct URL.
 * ImgBB API docs: https://api.imgbb.com/
 */

const IMGBB_API_KEY = '7fc8d6667d500d0e7ca99a2e5a8a9a43';

export const uploadToImgBB = async (imageFile: File): Promise<string> => {
	const formData = new FormData();
	formData.append('image', imageFile);

	try {
		const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (data.success) {
			// Returns the direct URL of the uploaded image
			return data.data.url;
		} else {
			throw new Error(data.error?.message || 'Failed to upload image to ImgBB');
		}
	} catch (error) {
		console.error('ImgBB upload error:', error);
		throw error;
	}
};
