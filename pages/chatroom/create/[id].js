import { useRouter } from 'next/router';
import { getUser } from 'utils/queries';
import { useQuery } from '@apollo/client';
import { Context } from 'store/globalstore';
import { useState, useContext } from 'react';
import { createRoom } from "utils/queries";
import { useMutation } from "@apollo/client";
import User from 'components/user';
import Filebase from 'react-file-base64'

export default function Create() {
    const defaultAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFsklEQVR4nO2aXYhVVRSAv3u942iOmkWOM0oSJhk11VgERflLGpI9VA9W9kNQGWRlmRb4UJjgg82oZWJFUWoWZT1YEEFUBEXljKWVqWWYM5rJNOloNP7dHta53bX3PT/73jNnJvB8cODMzPrZ++y911577YGUlJSUlJSUlJSUlJTTkEwf+RwPjAOGe7/7A9gObAHyfdCmXmEEsBxoRzrp97QDzUBtH7UxETLAAuAIwR23ny5gPr0wQ5N2MAB4FZhl/f534FNgn9eGOmASMks0G4B7gH+SbWYyZJAO6JHdDEwDsj7yWWA60GrpvEHfxKpIMsAYoDrg7wswO9IE9HOwm0NihdZ9LEA2C5zr3uSeoRp4HNiNNK6V0hEdgbnmmyrwoz9CF/6B8UPv79uBh4CqCvyUxaXALszROQEMseR04zfjNvI2OczlYH/EHHDMasuPwMUV+HJiAqWRvAN40JLLYG5102L4vF7ZaaM0FswFDllt6gKujeHTlzFAp3JyCOm43/q/Qsntwz/guZJFdoyCvfE+MgOBh4G/lFwnMDaGX4MMsmXpkRgXIn+bkt3QA/7fUvbs7VRzAfCbkv0Mh93DZXSmAhO99+PAjcBPIfJ16r3dwX4Ubeq9PkRuB3AD0O39PAFZQqG4fID71PtqJDD9X9kKrFQ/z4lSiPoAWWCK+vlFh0bsU+8jHeSjGBVgO4jV6n0ysltUTD3FNfUnbhnZ5UpnP/GD4AFlr9FRb4/SOT+GfxqUod2OOvY2GLkOQ5ih7OzFPSX+QuldFcM/o5WhjjL0mpVeK5VNwxzwrbLzbBm625RerMSoP5LpFYy5rulaJCEp6C2vwPdKpX+YYvEkioHAUaU7rALfBp8rY/PK0Juv9PLACtxmQg54ztItx+9NSm9rGXqBPKIM7qc07w8igxxldUdakZgQdByegTnt88A63Nd+DvhO6T7lqBfKIKTjBaObcF/TAyj9CHkkvX0TOeA0IdneAR+59Z4NV1Yo3U7g7DJ0Q5ltNewjSqs3QWSQ87yOCVHPYWTau478IOBly8ZcR11ndGQvnLqakURpJJICXwlcjX/Da5HRbiO443uRaB8U8MYCFyHLsAa4DHiS0kLra3E6GkQGWAycCulA4Xkmwk4jcCsyyvO890bCR/xeB795YBUxs78opiHRNawR6xLwa+8M9vMLcEsCfn3JIh/iBeArZFofRBKQl+iZM4BNHfAKsBPZ57uAH4C1wM1IzpJSLr1dbu6P1BXPA86kmKV1IhWdX5F9/FgvtytRGoAlwDdIsSIqiHUDXyOBNLECZxzGEF2Lr0JudL7Hfe8PerYBdxMd2Ud7bUuEYcBCih06jlxl+TEbich+nTmFlNM2AmuApd6zxvvdDoK32Z+ReqMfk7025b02LkSWWGxqkKnol8XZ5fB64H0fuS5kW5wJDHXwORSpO64P8LsJs+4IkvX5+V2MZIkVMR3/rO0IkmkNVrLXIRUjLXcQGYmaShvg6T7h2dK2O5BibYHBwOv430C3UebdRBaZlvZUbAFuR87bmrswb2hOIilynI7bDEYOOieVn27gDkvuDOBOzBNhYektxaE8V42sRfsLzsJ/y3wA80PtIYFbGcVE5LygO3a/j1wG+RD6UiUPvENIwpQD3rMUNgJnBcjPxKwWbSG8bt9TjMIc4RPIfYAfw4EPMPv0LgE7yipLcAnBidIlmOvtS8yYkDRDkBRcx6WGANkspdftz9tC9nn/6RDnVZi3truAcyroRFyGY263LYRfjy/D7ON/W2otZgRfG+F4kZI9itzJ9RUXAn+r9iwKkc0AbyvZDrz/OdDTYycSSYPIYlZcyylWJsWjmEshLNLXYM6aZpAqTSGYTAlULdLiyX8c4ay36Ad8QnEZRDGVYvBeBrKvz0HSSRdqgGsor1iZNP2RLdI1EE9C+mznNCkpKSkpKSkppw//Ar8YQX0RsRNlAAAAAElFTkSuQmCC"
    const [avatar, setAvatar] = useState(defaultAvatar)
    const [name, setName] = useState('New Group')
    const { state : { auth } } = useContext(Context);
    const [ createroom, roomdata ] = useMutation(createRoom);
    const Done = (obj) => {
        if(obj.type !== 'image/png' && obj.type !== 'image/jpeg') return console.log('please select pictures');
        setAvatar(obj.base64);
    }

    const router = useRouter();
    const user = useQuery(getUser, {
        variables: { id : router.query.id }
    })


    if(!user.data || !auth.user) return null

    
    const handleCreate = () => {
        createroom({ 
            variables : { members : [user.data.getUser.id, auth.user.id], name, avatar}
        }).then(result => {
            if(result.data && result.data.createRoom) router.push(`/chatroom/${result.data.createRoom.id}`)
        })
    }



    return (
        <div className="container">
            <div className="my-5 p-4 d-flex flex-column">
                <h4>Group Create Info: </h4>
                <div className=" creategp row ">
                    <div className="col-6">
                        <div className=" groupAvatar me-2">
                            <img src={avatar} className="avatar"/>
                            <div id="file">
                                <i className="bi bi-camera-fill"></i>
                                <Filebase type="file" multiple={false} id="file" onDone={(obj) => Done(obj)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        <div className="form-group d-flex align-items-center w-100">
                            <label htmlFor="gpname">Name: </label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value) } name="name" className="form-control w-100 ms-2" /> 
                        </div>
                    </div>
                </div>
                
                    <button className="btn btn-primary w-100 my-2" onClick={handleCreate}>Create Group</button>
                
                <div>
                    <h6>Group Members:</h6>
                    <User user={auth.user} token={auth.accesstoken} searcher={auth.user}  showSelf={true} />
                    <User user={user.data.getUser} token={auth.accesstoken} searcher={auth.user}  />
                </div>
            </div>
        </div>
    )
}