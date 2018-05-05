export function setNotifications(notifications) {
    notifications.sort(function(a, b){
        var d1 = a.dt_occured;
        var d2 = b.dt_occured;
        return d1-d2;
    });
    return { type: "SET_NOTIFICATIONS", payload: notifications };
}

// export function setMapIsShown(mapIsShown) {
//     return { type: "SET_MAP_IS_SHOWN", payload: mapIsShown };
// }
