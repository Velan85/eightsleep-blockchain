import express from 'express'

const PORT = 3000

const app = express()


app.get('/', (_, res) => {
  res.send(`Server is running on port ${PORT}`)
})

app.listen(PORT, () => {
  console.log(`Server is running locally`)
})

export default app