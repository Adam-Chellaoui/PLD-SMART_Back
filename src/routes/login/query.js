const loginQuery = (
    mail
    ) => {
        const req = `SELECT * FROM eve.User WHERE mail= '${mail}' `
        return req
   }

export {loginQuery};