export default function convertToShortDate(str){
    if(str == null)
        return null;
    var date = new Date(str);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return [day, month, date.getFullYear()].join(".");
}
export function getCurrentDate(separator=''){

    let week = new Array('Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi');
    let months = new Array('Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık');
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let day  = week[newDate.getDay()];
    let monthName = months[newDate.getMonth()];
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year} ${day} ${monthName}`
}

// export default function timeArrival(str){
//     if(str == null)
//         return null;
//    return str.startTime + "-" + str.endTime;
// }