export const formatDate = (dateStr: string) => {
    const [day, month] = dateStr.split('/').map(Number);

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    return `${months[month - 1]} ${day}`;
}