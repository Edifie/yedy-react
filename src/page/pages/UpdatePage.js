import React from 'react'
import { useParams } from 'react-router-dom'

import Card from '../../shared/components/UIElements/Card'

import './PageForm.css'


const PAGES = [
    {
        id: 'p1',
        name: "Webinar Butique",
        tema: "Boho",
        area: "Hardware Store",
        type: "Basic",
        imageUrl: "https://i.ytimg.com/vi/U72Aoxuv5d8/maxresdefault.jpg",
        creator: "u1"

    }
]

const UpdatePage = () => {

    const pageId = useParams().pageId
     //find the page with the ID that we have in the URL from that array of pages.
    const identifiedPage = PAGES.find((p) => p.id === pageId )

    if(!identifiedPage){
       return  <div className='center'>
        <Card>
            <h2>Could not find page!</h2>
        </Card>
        </div>
    }
  return (
<div>aa</div>
  )
}

export default UpdatePage