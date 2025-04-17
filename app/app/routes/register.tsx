import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField } from "@mui/material"
import React, { useEffect } from "react"

import { KJUR, X509,KEYUTIL } from "jsrsasign"

import logo from "../assets/solarxen_logo.png"

const handleLoaded = () => { 
    grecaptcha.enterprise.ready(async () => { 
        const token = await grecaptcha.enterprise.execute('6Ldnzw0rAAAAABFE7GD2Jde0YmDqatxKc7z1xyYa', {action:"register_account"})
    })
    // window.grecaptcha?.ready(() => { 
    //     window.grecaptcha?.execute('6LcEzOYlAAAAAISlVX0h6tH2aRZsJGvHJy6hH8Mf', {action: "register_account"}).then((token: string) => {

    //     })
    // })
}

const callGetHandshake = () => {
    fetch("http://localhost:8080/api/handshake", {
        method:"GET"
    }).then((e) => e.json()).then((e) => {
        console.log(e.data)


        


        const pubKey = KEYUTIL.getKey(e.data)

        const encryptedHex = pubKey.encrypt("1234")
        const encryptedB64 = Buffer.from(encryptedHex,'hex').toString('base64')

        console.log(encryptedB64)
        // const pubKey = X509.getPublicKeyFromCertHex(e.data)

        // const x509 = new X509()

        // x509.readCertHex(e.data)

        // const pubKey = x509.getPublicKey()

        // const encryptedHex = pubKey.encrypt("1234")
        // const encryptedB64 = Buffer.from(encryptedHex,'hex').toString('base64')

        console.log(pubKey)

        // const c = new KJUR.crypto.Cipher.encrypt("1234",e.data,"RSA")
        // c.init("-----BEGIN CERTIFICATE-----\n"+ e.data + "\n-----END CERTIFICATE-----")
        

        // console.log(typeof(c))
    }) 
}

const callPostAPI = (e: any) => {
    const formData = new FormData(e.target)
    const formDataMap = Object.fromEntries(formData)
    
    console.log(formDataMap)

    formDataMap["x"] = formDataMap["pw"]

    fetch("http://localhost:8080/api/account", {
        method:"POST",
        body: JSON.stringify(formDataMap),  
    })
}

const calGetListAPI = () => {
    fetch("http://localhost:8080/api/accounts", { 
        method:"GET"
    }).then(e => e.json()).then((e) => { 
        console.log(e)
    })
} 

const callCheckIDAPI = (id : string) => { 
    console.log(id)

    fetch("http://localhost:8080/api/chkid",{
        method : "GET",
        headers: { 
            "id" : id
        }
    }).then(e => e.json()).then((e) => {
        console.log(e.data.status) 
    })
}

const loadExternalJs = (src: string, initFn : (script : HTMLScriptElement )=> void ) => {
    const script = document.createElement('script')

    initFn(script)
    script.src = src
    document.body.appendChild(script)

}

const getPostCodeViaDaumAPI = () => { 
    // ! Test for daum postcode api external js script load 
    new daum.Postcode({
        oncomplete: function(data) {
            var roadAddr = data.roadAddress            


            document.getElementById("addr")?.setAttribute("value",roadAddr)

            // (document.getElementById("addr") as HTMLInputElement).value = roadAddr
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        }
    }).open()
}

const FormedPasswordInput = (props:any) => {

    const {id,labelText, handleChange, handleBlur, errPW} = props

    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const errLabel = id == "pw" ? "비밀번호를 4~20자 사이로 입력해 주세요." : "입력한 비밀번호가 다릅니다."

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
     
    // const checkPassword = () => {
    
    // }

    return (
        <FormControl>
            <InputLabel>{labelText}</InputLabel>
            <OutlinedInput
                id={id}
                type={showPassword ? "text" : "password"}
                name={id} 
                error={errPW}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton 
                            aria-label={
                                showPassword ? "hide the password" : "shows the password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}

                        </IconButton>
                    </InputAdornment>
                }
                label={labelText} 

                onChange={(e) => { 
                    handleChange(e.target.value)
                }}

                onBlur={() => {
                    handleBlur()
                }}
            />
            <FormHelperText error hidden={!errPW}>{errLabel}</FormHelperText>
        </FormControl>
    )
}

// export const SubmitHandler = (token: string) => {
//     console.log(token)
    
//     var t : HTMLFormElement|null = document.getElementById("demo-form")
//     t?.submit()

//     return undefined
// }

export default function register() {
    
    const [id, setId] = React.useState<string>("") 
    const [pw, setPw] = React.useState<string>("")
    const [pwc, setPwc] = React.useState<string>("")
    const [addr, setAddr] = React.useState<string>("")
    const [addr2, setAddr2] = React.useState<string>("")
    const [name, setName] = React.useState<string>("")
    const [tel, setTel] = React.useState<string>("")

    const [errPwlen, setErrPwlen] = React.useState<boolean>(false)
    const [errPwequal, setErrPwequal] = React.useState<boolean>(false)

    const checkPWLength = () : boolean => {    
        return pw.length >= 4 && pw.length <= 20 
    }

    const checkPWEqual = () : boolean => {
        return pw === pwc
    }

    const handlePw = (s : string) => {
        setPw(s)
    }

    const handlePwc = (s : string) => {
        setPwc(s)
    } 

    const handleEqual = () : boolean => {
        const b = (pw.length > 0 && pw === pwc)

        return b
    }

    useEffect(() => {
        loadExternalJs("https://www.google.com/recaptcha/enterprise.js?render=6Ldnzw0rAAAAABFE7GD2Jde0YmDqatxKc7z1xyYa", (script) => {
            script.async = false
            // script.addEventListener("load", handleLoaded)
        })
        loadExternalJs("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js", () => {

        })

        callGetHandshake()

        // // ! Test for external js script load
        // const script = document.createElement("script")
        // script.src = "https://www.google.com/recaptcha/api.js"
        // window.onsubmit = () => { alert("recaptcha submit")}

        // document.body.appendChild(script)

        // const script2 = document.createElement("script")
        // script2.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        // document.body.appendChild(script2)

    },[])

    


    return ( 
        <>
            <Grid size={12} bgcolor={"#21b7b5"}>
                <img src={logo} style={{width:"11%", padding:"10px", marginLeft:"20px"}} alt="logo"></img>
                {/* <Typography variant="h5">성창 태양광 발전 모니터링 시스템 - 계정 등록 화면</Typography> */}
            </Grid>

            <Paper component="form" onSubmit={(e) => { e.preventDefault(); callPostAPI(e); } } sx={{ width:"45rem"}}>
                <Button variant="contained" size="large" onClick={calGetListAPI}>테스트</Button>

                <Grid container p={2} gap={2}>
                    {/* <div className="g-recaptcha" data-sitekey="6Ldnzw0rAAAAABFE7GD2Jde0YmDqatxKc7z1xyYa" data-callback="onSubmit"></div>  */}
                    <Grid size={12} display={"flex"} gap={2}>
                        <FormControl>
                            <InputLabel>ID</InputLabel>
                            <OutlinedInput type="input" id="id" name="id" aria-describedby="uid-text" label="ID" onChange={(e)=> setId(e.target.value)}></OutlinedInput>
                        </FormControl>
                        <Button variant="contained" onClick={() => {callCheckIDAPI(id)}}>중복 확인</Button>
                    </Grid>
                    <Grid size={12}>
                        <FormedPasswordInput id="pw" name="pw" labelText="비밀번호" errPW={errPwlen} handleBlur={checkPWLength} handleChange={handlePw}>{pw}</FormedPasswordInput>
                    </Grid>
                    <Grid size={12}>
                        <FormedPasswordInput id="pwc" labelText="비밀번호 확인" errPw={errPwequal} handleChange={handlePwc} handleBlue={checkPWEqual}>{pwc}</FormedPasswordInput>
                    </Grid>
                    <Grid size={12} display={"flex"} gap={2}>
                        <Grid size={10}>
                            <TextField fullWidth type="input" label="주소" id="addr" name="address" slotProps={{ inputLabel: { shrink: true } , input: {readOnly: true } }} onChange={(e)=> setAddr(e.target.value)}/>
                            {/* <FormControl fullWidth>
                                <InputLabel>주소</InputLabel>
                                <OutlinedInput id="addr" type="text" name="address" label="주소" readOnly slotProps={{inputLabel: { shrink: true }}}></OutlinedInput>
                            </FormControl> */}
                        </Grid>
                        <Button variant="contained" type="button" onClick={getPostCodeViaDaumAPI}>주소 검색</Button>
                    </Grid>
                    <Grid size={10}>
                        <FormControl fullWidth>
                            <InputLabel>상세주소</InputLabel>
                            <OutlinedInput inputComponent={"input"} id="addr2" label="상세주소" name="address2" onChange={(e) => setAddr2(e.target.value)}></OutlinedInput>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl>
                            <InputLabel>모니터링 담당자</InputLabel>
                            <OutlinedInput type="text" id="name" label="모니터링 담당자" name="name" onChange={(e) => setName(e.target.value)}></OutlinedInput>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormControl>
                            <InputLabel>연락처</InputLabel>
                            <OutlinedInput type="tel" id="tel" name="tel" placeholder="010-0000-0000" onChange={(e) => setTel(e.target.value)} ></OutlinedInput>
                        </FormControl>
                    </Grid>

                    <Grid size={6} alignContent={"center"}>
                        <Button variant="contained" size="large" fullWidth type="submit">계정 등록</Button>
                    </Grid>
                </Grid>
            </Paper>       
        </>
    )   
}