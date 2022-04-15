const loginQuery = () => {
        const req = `SELECT * FROM eve.User WHERE mail=?`
        return req
   }

export {loginQuery};