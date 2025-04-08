import React, { useEffect, type FormEventHandler } from "react"
import { Input, FormControl, FormLabel, Paper, InputLabel, Button, Typography, Grid, OutlinedInput, InputAdornment, IconButton } from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

const handleLoaded = () => { 
    window.grecaptcha?.ready(() => { 
        window.grecaptcha?.execute('6LcEzOYlAAAAAISlVX0h6tH2aRZsJGvHJy6hH8Mf', {action: "homepage"}).then((token: string) => {

        })
    })
}

const loadExternalJs = (src: string, initFn : ()=> void ) => {
    const script = document.createElement('script')
    script.async = false
    script.src = src
    script.addEventListener("load", handleLoaded)
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

    const {id,labelText} = props

    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    return (
        <FormControl>
            <InputLabel>{labelText}</InputLabel>
            <OutlinedInput
                id={id}
                type={showPassword ? "text" : "password"}
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
                label="Password"
            />
        </FormControl>
    )
}

export const SubmitHandler = (token: string) => {
    console.log(token)
    
    var t : HTMLFormElement|null = document.getElementById("demo-form")
    t?.submit()

    return undefined
}

export default function register() {
    
    useEffect(() => {
        loadExternalJs("https://www.google.com/recaptcha/api.js", () => {

        })
        loadExternalJs("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js", () => {

        })

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
            <Paper component="form">
                <Grid container>
                    {/* <div className="g-recaptcha" data-sitekey="6Ldnzw0rAAAAABFE7GD2Jde0YmDqatxKc7z1xyYa" data-callback="onSubmit"></div>  */}
                    
                    <Grid size={12}>
                        <Typography variant="h5">모니터링 시스템 계정 등록</Typography>
                    </Grid>
                    <Grid size={12}>
                        <FormControl>
                            <InputLabel>asdsa</InputLabel>
                            <Input id="uid" aria-describedby="uid-text"></Input>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <FormedPasswordInput id="pw" labelText="비밀번호"></FormedPasswordInput>
                    </Grid>
                    <Grid size={12}>
                        <FormedPasswordInput id="pwc" labelText="비밀번호 확인"></FormedPasswordInput>
                    </Grid>
                    <Grid size={12}>
                        <FormControl>
                            <InputLabel>주소</InputLabel>
                            <OutlinedInput id="addr" type="text" name="address" readOnly></OutlinedInput>
                        </FormControl>
                        <Button type="button" onClick={getPostCodeViaDaumAPI}>주소 검색</Button>
                    </Grid>
                    <Input id="addr2" type="text" name="address2"></Input>
                    <Input id="tel" type="tel" name="tel"></Input>
                    <Button type="submit" className="g-recaptcha" data-sitekey="6Ldnzw0rAAAAABFE7GD2Jde0YmDqatxKc7z1xyYa" data-callback="SubmitHandler" data-action="submit">계정 등록</Button>
                </Grid>
            </Paper>

        
        </>
    )   
}