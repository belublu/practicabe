import mongoose from "mongoose"
import configObject from "./config/env.config.js"

const {mongo_url} = configObject

mongoose.connect(mongo_url)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log("Error en la conexión", error))