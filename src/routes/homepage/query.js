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

const creatorQuery = (id) => {
    const req = `SELECT * FROM eve.Creator C WHERE C.id = '${id}'`
}*/

//export {creatorQuery};
export {eventQuery};
//export {eventbyCategoryQuery};
//export {categoryQuery};