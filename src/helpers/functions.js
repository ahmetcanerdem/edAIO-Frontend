export default function convertToShortDate(str){
    if(str == null)
        return null;
    var date = new Date(str);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return [day, month, date.getFullYear()].join(".");
}

// export default function timeArrival(str){
//     if(str == null)
//         return null;
//    return str.startTime + "-" + str.endTime;
// }