export function dateToIso(dateStr: string): string {
	try {
		const [day, month, year] = dateStr.split("/");

		const fullYear = Number(year) < 50 ? `20${year}` : `19${year}`;

		return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T00:00:00Z`;
	} catch {
		return "undefined";
	}
}

export function isoToDate(isoStr: string): string {
	try {
		const date = new Date(isoStr);
		const day = date.getUTCDate().toString().padStart(2, "0");
		const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
		const year = date.getUTCFullYear().toString().slice(-2);

		return `${day}/${month}/${year}`;
	} catch {
		return "undefined";
	}
}
