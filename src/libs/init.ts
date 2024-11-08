import 'dotenv/config'

export const verifyDotenv = () => {
  if (Number(process.env.PORT?.length) > 0) { console.log('dotenv loaded') } else { throw Error("dotenv not loaded") }
}