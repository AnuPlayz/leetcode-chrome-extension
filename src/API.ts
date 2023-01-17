import fetch from "node-fetch"

export const BASE_URL = "https://nexustech-backend.blackeye2005.repl.co"

export const getProblems = async (uid: string) => {
    const res = await fetch(`${BASE_URL}/questions?uid=${uid}`)
    return await res.json().then((data) => data.questions)
}

export const getStats = async (uid: string) => {
    const res = await fetch(`${BASE_URL}/stats?uid=${uid}`)
    return await res.json().then((data) => data.stats)
}