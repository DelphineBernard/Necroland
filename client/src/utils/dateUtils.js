const formatDate = (dateString, options = { year: 'numeric', month: '2-digit', day: '2-digit' }) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
}

export default formatDate;