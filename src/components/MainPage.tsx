import { useEffect, useState } from "react"
import { Flex } from "@mantine/core"
import { Sidebar } from "./Sidebar"
import Swal from "sweetalert2"
import { useAppSelector } from "../hooks"
import { getDoc, getFirestore, doc, collection, updateDoc, setDoc } from "firebase/firestore"

const MainPage = () => {
    const [page, setPage] = useState("Problems")
    const account = useAppSelector(state => state.account)

    useEffect(() => {
        if (!account.uid) return;
        const db = getFirestore();
        const docRef = doc(db, "users", account.uid);
        getDoc(docRef).then((d) => {
            if (d.exists()) {
                let data = d.data()
                let uid = data.uid
                if (!data?.username) {
                    Swal.fire({
                        title: 'Submit your Leetcode username',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: false,
                        confirmButtonText: 'Set username',
                        showLoaderOnConfirm: true,
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            let username = result.value
                            const userRef = collection(db, "users");
                            const userDoc = doc(userRef, uid);
                            await updateDoc(userDoc, {
                                username: username,
                                uid: uid,
                            });
                        }
                    })
                }
            } else {
                let uid = account.uid as string;

                Swal.fire({
                    title: 'Submit your Leetcode username',
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: false,
                    confirmButtonText: 'Set username',
                    showLoaderOnConfirm: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        let username = result.value
                        const userRef = collection(db, "users");
                        const userDoc = doc(userRef, uid);
                        await setDoc(userDoc, {
                            username: username,
                            uid: uid,
                        });
                    }
                })
            }
        })
    }, [])

    return <Flex dir="row">
        <Sidebar page setPage={setPage} />

        {page === "Problems" && <Flex dir="column" style={{ width: "100%" }}>
            <h1>ur life is full of problems</h1>
        </Flex>}

        {page === "Leaderboard" && <Flex dir="column" style={{ width: "100%" }}>
            <h1>Leaderboard</h1>
        </Flex>}
    </Flex>
}

export default MainPage