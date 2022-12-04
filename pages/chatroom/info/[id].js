import { useQuery, useMutation } from "@apollo/client"
import { useContext, useEffect, useState } from "react";
import { getRoom, updateRoom } from "utils/queries"
import { Context } from "store/globalstore";
import { useRouter } from "next/router";
import Filebase from 'react-file-base64';
import User from "components/user";
import Link from "next/link";
export default function RoomInfo() {
    const { state: { auth } } = useContext(Context);
    const router = useRouter();
    const [disabled, setDis] = useState(true);
    const [ avatar, setAvatar ] = useState('')
    const [ name, setName ] = useState('');
    const [ update, roomupdate ] = useMutation(updateRoom);
    const roomdata = useQuery(getRoom, {
        variables : { id : router.query.id, token: auth.accesstoken}
    });
    const [data, setData] = useState(null)
    const [ newData, setNewData ] = useState({})
    
    const handleChange = (e) => {
        setName(e.target.value)
        if(e.target.value) {
            setNewData({...newData, name : e.target.value })
        } else { 
            setNewData({})
        }
    }
    
    const Done = (obj) => {
        if(obj.type !== 'image/png' && obj.type !== 'image/jpeg') return console.log('please select pictures');
        setAvatar(obj.base64);
        setNewData({...newData, avatar: obj.base64})
    }

    
    
    useEffect(() => {
        if(roomdata.data && roomdata.data.getRoom) {
            setData(roomdata.data.getRoom)
            setName(roomdata.data.getRoom.name)
        }
    }, [roomdata])
    
    const onConfirm = () => {
        update({
            variables : { id : router.query.id, data : newData}
        }).then(result => console.log(result))
    }
    
    return (
        <div className="container my-4">
            <button className="btn  btn-primary" onClick={() => router.back()}><i className="bi bi-arrow-left mx-1"></i>Back</button>
            {
                roomdata.loading ? <h2>loading...</h2> 
                : data ? 
                <div className='d-flex flex-column groupInfo my-4'>
                    <div className="groupID">
                        <div className="gpid">
                            <div className="img">
                                <img src={avatar ? avatar : roomdata.data.getRoom.avatar} />
                                <div id="file">
                                    <i className="bi bi-camera-fill"></i>
                                    <Filebase type="file" multiple={false} id="file" onDone={(obj) => Done(obj)}/>
                                </div>
                            </div>
                            <input className="form-control form-control-sm"  disabled={disabled} value={ name } onChange={(e) => handleChange(e) } />
                            <button className="btn btn-sm btn-primary" onClick={() => setDis(!disabled)}>{disabled ? 'Edit' : 'Save' }</button>
                        </div>
                        <button className="btn btn-sm btn-primary w-100" onClick={onConfirm}>confirm changes</button>
                    </div>
                    <div className="members d-flex flex-column ">
                        <div className="d-flex justify-content-between">
                            <h6>Group Members: </h6>
                            <Link href={`/user/friends/${data.id}`}><button className="btn btn-sm btn-outline-success">Add Member</button></Link>
                        </div>
                        {
                            data.members.map( member => <User key={member.id} user={member} searcher={auth.user} showSelf={true}/>)
                        }
                    </div>
                </div> 
                :
                null 
            }
        </div>
    )
}


RoomInfo.getLayout = function pageLayout(page){
    
    return (
        <>
            {page}
        </>
    )
}
