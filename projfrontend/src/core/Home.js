import React from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from './Base'


export default function Home() {
    console.log("API IS",API)
    return (
        <Base title="Home page" description="Tshirt Store">
        <h1 className="text-white">Hello from front end</h1>
        </Base>
    )
}
