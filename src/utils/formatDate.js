export default function formatDate(d1) {
    var d2 = new Date(d1);
    var date = d2.getDate();
    var month = d2.getMonth();

    return {
        date: (date < 10) ? '0' + date : date,
        month: (month < 10) ? '0' + month : month,
        year: d2.getFullYear()
    };
}