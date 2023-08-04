const db = require("./db/db")
const userModel = require("./Model/userModel")
const MessageModel = require("./Model/MessageModel")
const { Sequelize } = require("sequelize")

const init = async () => {
    try {
        await db.authenticate()
        await db.sync()
    } catch (error) {
        console.log(error)
    }
}
init()

module.exports = init;