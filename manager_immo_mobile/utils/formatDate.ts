export const formatDate = (dateToFormat: Date | string) => {
	const date = new Date(dateToFormat);

	if (!date) return;

	const dateToISOString = date.toISOString();

    const splitDateByT = dateToISOString.split("T")

	return `${splitDateByT?.[0]} ${splitDateByT?.[1]?.split(".")?.[0]}`

};
