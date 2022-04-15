const getUserInfoQuery = () => {
    const req = `SELECT name, photo FROM eve.User U WHERE U.id = ?`
    return req
}

const eventQuery = () => {
        const req = `SELECT * FROM eve.Event `
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
export {eventQuery};
//export {eventbyCategoryQuery};
//export {categoryQuery};