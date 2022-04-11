export default function convertToShortDate(str){
    if(str == null)
        return null;
    var date = new Date(str);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return [day, month, date.getFullYear()].join(".");
}
export function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
}

// export default function timeArrival(str){
//     if(str == null)
//         return null;
//    return str.startTime + "-" + str.endTime;
// }