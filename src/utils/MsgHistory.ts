import {SocketDataType} from './Types'

export const saveToHistory = (newMsg:SocketDataType ) : void => {
    const hstr : SocketDataType[] = [] 
    
    const historyStr = window.localStorage.getItem("msg-history") 
    const history : SocketDataType[] = historyStr !== null ? JSON.parse(historyStr) : hstr

    const newMsgHistory = [...history , newMsg]
    window.localStorage.setItem("msg-history" , JSON.stringify(newMsgHistory))
};

export const Loadhistory = (): SocketDataType[] =>{
    const hstr : SocketDataType[] = [] 
    const historyStr = window.localStorage.getItem("msg-history") 
    const history = historyStr !== null ? JSON.parse(historyStr) : hstr
return history
}
