"use client"
import Image from 'next/image'
import { FormEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge';
import { io, Socket } from 'socket.io-client';
import ReservedOrUserEventNames from "socket.io-client"
import SocketReservedEvents from "socket.io-client"

import { FaLocationArrow } from 'react-icons/fa'
import { ClientToServerEvents, ServerToClientEvents, SocketDataType, InternalServerEvents, SocketData } from '@/utils/Types';
import { Loadhistory, saveToHistory } from '../utils/MsgHistory'
import { Server } from 'http';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3003", { transports: ['websocket'] });

// socket.on("connect", () => {
//   console.log("connected to socket")
// })

//! preserve user data in localStorage
//! make a invite link to send to another one to start chatting

export default function Home(): ReactElement {

  const [currentUser, setCurrentUser] = useState<string>("")

  const [roomId, setRoomId] = useState<string>("")

  const [isUserJoined, setisUserJoined] = useState<boolean>(false)

  const [currentMessage, setCurrentMessage] = useState<SocketDataType>()

  const [messageHistory, setMessageHistory] = useState<SocketDataType[]>([])



  const divRef = useRef<HTMLDivElement>(null)

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()
    const msg = {
      message: (e.target[0] as HTMLInputElement).value,
      author: currentUser,
      date: new Date(Date.now()),
      roomId: roomId
    }
    // setCurrentMessage(msg)

    e.target[0].value = ""


    setMessageHistory(prev => [...prev, msg])


    await socket.emit('send_message', msg)

  }

  const formatDate = (date: Date): string => {

    return date.toLocaleString().slice(11, 16).concat(" PM")

  }

  const joinRoom = (e: FormEvent) => {
    e.preventDefault();
    if (currentUser !== "" && roomId !== "") {
      socket.emit("join_room", {
        user: currentUser,
        roomId: roomId
      })
      setisUserJoined(true)
    }
  }

  // useEffect(() => {
  //   //! load chat history 
  //   Loadhistory();
  // }, [])

  // useEffect(() => {
  //   //! update chat history 
  //   saveToHistory(currentMessage)
  // }, [currentMessage])

  useEffect(() => {
    socket.on("recieve_msg", (data: SocketDataType) => {

      // setCurrentMessage(data)

      setMessageHistory(prev => {
        const newhistory = [...prev, data]
        return newhistory
      })
    })
    console.log("from socket", messageHistory)
  }, [socket])

  useEffect(() => {

    console.log("from msg his", messageHistory)

  }, [messageHistory])

  // useEffect(() => {
  //   if (messageHistory.length) {
  //     divRef.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "end"
  //     })
  //   }
  // }, [messageHistory.length])

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center p-24">
      {isUserJoined &&
        <h1 className='absolute top-0 left-0'>
          {`user ${currentUser} joined to room : ${roomId}`}
        </h1>
      }
      {!isUserJoined &&
        <form onSubmit={joinRoom} className='flex items-center absolute top-10 right-10 bg-blue-300 text-black p-4'>
          <div className='mx-1 '>
            <label htmlFor="user" className=''>username:</label>
            <input onChange={(e) => setCurrentUser(e.target.value)} id='user' type="text" className='h-10 outline-none px-3' />
          </div>

          <div className='mx-1'>
            <label htmlFor="room-id" className=''>roomID:</label>
            <input onChange={(e) => setRoomId(e.target.value)} id='room-id' type="text" className='h-10 outline-none px-3' />
          </div>
          <button type='submit' className='bg-red-200 rounded-lg px-4 py-2'>join</button>
        </form>
      }

      {isUserJoined &&
        <div className='min-w-[30%] max-w-[30%]  min-h-[70%] max-h-[70%] bg-red-500 flex flex-col rounded-md p-4'>

          <div className=' flex flex-col h-full w-full bg-blue-200 overflow-scroll overflow-x-hidden'>

            {messageHistory.map((msg: SocketDataType, indx: number): ReactElement => {
              return (<div key={indx} className={twMerge("", msg.author === "ali" ? "flex flex-row-reverse" : "flex")}>
                <div className='flex flex-col bg-white w-[60%] m-2 rounded-md px-2'>
                  <h4 className={twMerge("flex font-semibold", msg.author === "ali" ? "self-end" : "self-start")}>{msg.author}</h4>
                  <p className=''>{msg.message}</p>
                  <small className='self-end'>{formatDate(msg.date)}</small>
                  <div ref={divRef} />
                </div>
              </div>)
            })}

          </div>
          <div ref={divRef} />
          <form className='relative flex justify-between items-center bg-blue-200 p-2' onSubmit={sendMessage}>
            <label htmlFor="chat-box"></label>
            <input className=' w-full h-12 p-3 rounded-md outline-none' id='chat-box' type="text" title='chat-box' />
            <button title='submit-btn' className=' absolute right-6 text-2xl text-[#776767] hover:text-[#867d7d] cursor-pointer'>
              <FaLocationArrow />
            </button>
          </form>

        </div>

      }
    </main>
  )
}
