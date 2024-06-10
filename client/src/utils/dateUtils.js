const formatDate = (dateString, options = { year: 'numeric', month: '2-digit', day: '2-digit' }) => {
    const date = new Date(dateString);
    // Date function automatically return "Invalid Date" if date is invalid
    if (date.toString() === 'Invalid Date') {
        return "Invalid Date";
    }
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

export default formatDate;