export function nowDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses son indexados desde 0
    const year = currentDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
}

export function isValidDateFormat(dateString: string) {
    // Se espera que la cadena tenga el formato yyyy/mm/dd
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    return dateRegex.test(dateString);
}