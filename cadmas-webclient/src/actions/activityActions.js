export function setActivities(activities) {
    activities.sort(function(a, b){
        var d1 = a.dt_created;
        var d2 = b.dt_created;
        return d1-d2;
    });
    return { type: "SET_ACTIVITIES", payload: activities };
}
export function setActivity(activity) {
    return { type: "SET_ACTIVITY", payload: activity };
}

// export function setMapIsShown(mapIsShown) {
//     return { type: "SET_MAP_IS_SHOWN", payload: mapIsShown };
// }
