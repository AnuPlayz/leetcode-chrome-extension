import { useState } from "react"
import { Flex } from "@mantine/core"
import { Sidebar } from "./Sidebar"

const MainPage = () => {
    let [page, setPage] = useState("Problems")

    return <Flex dir="row">
        <Sidebar page setPage/>

        { page === "Problems" && <Flex dir="column" style={{ width: "100%" }}>
            <h1>ur life is full of problems</h1>
        </Flex> }

        { page === "Leaderboard" && <Flex dir="column" style={{ width: "100%" }}>
            <h1>Leaderboard</h1>
        </Flex> }
    </Flex>
}

export default MainPage