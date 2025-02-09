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