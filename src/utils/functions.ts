import { Timestamp } from "firebase/firestore";

export const formatDate = (dateStr: string, timestamp: Timestamp | undefined) => {
    const [day, month] = dateStr.split('/').map(Number);

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    let readibleHour;

    if ( timestamp ) {
        const date = timestamp.toDate();
        let hour = date.getHours() % 12;
        hour = hour ? hour : 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'pm' : 'am';

        readibleHour = `${hour}:${minutes} ${ampm}`;
    } else {
        readibleHour = '00:00 am';
    }

    

    return `${months[month - 1]} ${day}, ${readibleHour}`;
}

export const formatLocalDate = (dateStr: string, hourStr: string) => {
    if (!dateStr || !hourStr) return '';
    
    const [day, month] = dateStr.split('/').map(Number);

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    let hour = '00:00 am'

    if (hourStr.endsWith('m.')) {
        const [fullHour, ampm] = hourStr.split(' ');
        const [hours, minutes] = fullHour.split(':');

        hour = `${hours}:${minutes} ${ampm.startsWith('a') ? 'am' : 'pm'}`;
    } else {
        const [hours, minutes] = hourStr.split(':').map(Number);
        const ampm = hours >= 12 ? 'pm' : 'am';
        const adjustedHour = hours % 12 || 12;
        hour = `${adjustedHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    return `${months[month - 1]} ${day}, ${hour}`;
}