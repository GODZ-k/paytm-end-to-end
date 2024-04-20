import zod from "zod"

const registerUserType = zod.object({
    username:zod.string().min(2),
    email:zod.string().email(),
    password:zod.string().min(8).max(20)

})


const loginUserType =  zod.object({
    email:zod.string().email(),
    password:zod.string()
})

const changePassswordType = zod.object({
    password:zod.string().min(8).max(20)
})


const updateProfileType =  zod.object({
    email:zod.string().email().optional(),
    username:zod.string().min(2).optional()
})


export {
    registerUserType,
    loginUserType,
    changePassswordType,
    updateProfileType
}