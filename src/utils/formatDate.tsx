const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	const formattedDate = new Date(dateString).toLocaleDateString(
		'id-ID',
		options
	);
	return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default formatDate;
