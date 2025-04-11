import { Grid, Paper } from "@mui/material"
import { useEffect } from "react"

interface RegularResponse {
    status : string,
    data : any
}


const callAPI = () => {
    fetch("http://localhost:8080/api/accounts",{
        method: "GET",
        headers : {
        }
    }).then((response : Response) => {
        return response.json()
    }).then((jsonData : RegularResponse) => {
        // jsonData.status
        (jsonData.data as any[]).map((e) => {
            console.log(e.id + " , " + e.name)
        })

    })
}

export default function accountlist() {

    useEffect(() => {
        callAPI()
    },[])


    return ( 
        <>
        <Paper>
            <Grid size={12}>


            </Grid>
        </Paper>
        </>
    )
}