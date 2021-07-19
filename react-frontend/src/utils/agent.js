import axios from "axios"
import CONFIG from "./config"

export const agentCourse = axios.create({
    baseURL:CONFIG.course,
    headers:{
        "Content-Type" : "application/json",
    }
}) 