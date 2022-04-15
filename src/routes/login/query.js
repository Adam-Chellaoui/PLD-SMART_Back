const loginQuery = (
    mail
    ) => {
        console.log("Mail is: ", mail)
        const req = `SELECT * FROM eve.User WHERE mail='${mail}' `
        return req
   }

export {loginQuery};