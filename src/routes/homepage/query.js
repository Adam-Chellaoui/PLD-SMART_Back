const getUserInfoQuery = () => {
    const req = `SELECT name, photo FROM eve.User U WHERE U.id = ?`
    return req
}

const getPopularEventQuery = () => {
        const req = `SELECT event.name, event.photo, event.date_timestamp, event.place, user.photo as imgProfil FROM eve.Event as event, eve.User as user  where event.date_timestamp>=Now() and user.id=event.creator_id `
        return req
   }

/*const eventbyCategoryQuery = (id) => {
        const req = `SELECT * FROM eve.Event Event WHERE Event.category_id = '${id}' `
        return req
    }

const categoryQuery = () => {
    const req = `SELECT * FROM eve.Category`
}
*/


export {getUserInfoQuery};
export {getPopularEventQuery};
//export {eventbyCategoryQuery};
//export {categoryQuery};