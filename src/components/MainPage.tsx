import { useEffect, useState } from "react"
import { Flex } from "@mantine/core"
import { Sidebar } from "./Sidebar"
import Swal from "sweetalert2"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getDoc, getFirestore, doc, collection, updateDoc, setDoc } from "firebase/firestore"
import { TableScrollArea } from "./Problems"
import { getProblems } from "../API"
import { setProblemsData } from "../store"

const MainPage = () => {
    const [page, setPage] = useState("Problems")
    const account = useAppSelector(state => state.account)
    const dispatch = useAppDispatch()

    const getPBs = async () => {
        if(!account.uid) return;
        let problems = await getProblems(account.uid)
        dispatch(setProblemsData(problems))
    }

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
                            getPBs()
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
                        getPBs()
                    }
                })
            }
        })
    }, [])

    return <Flex dir="row">
        <Sidebar page setPage={setPage} />

        {page === "Problems" && <Flex dir="column" style={{ width: "100%" }}>
            {account.problemsData && <>
                <h1>Problems: </h1>
                <TableScrollArea data={account.problemsData} />
            </>}
        </Flex>}

        {page === "Leaderboard" && <Flex dir="column" style={{ width: "100%" }}>
            <h1>Leaderboard - Soon</h1>
        </Flex>}
    </Flex>
}

export default MainPage