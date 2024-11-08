import 'dotenv/config'

export const tryDotenv = () => {
  if (Number(process.env.PORT?.length) === 0) {
    throw Error("dotenv not loaded")

  } else {
    console.log('dotenv loaded')

    if (process.env.NODE_ENV !== 'production') {
      const watchList = ['KEY', 'SECRET']

      console.table(
        watchList.map(item => {
          return { key: item, value: process.env[item] }
        })
      )
    }
  }

}