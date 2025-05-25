export const tryDotEnv = () => {
  if (Number(process.env.PORT?.length) === 0) {
    throw Error(".env not loaded")

  }

  // console.log('dotenv loaded')

  // if (process.env.NODE_ENV !== 'production') {
  //   const watchList = ['KEY', 'SECRET']

  //   console.table(
  //     watchList.map(item => {
  //       return { key: item, value: process.env[item] }
  //     })
  //   )
  // }
}