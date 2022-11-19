import React from 'react'
import { useParams } from 'react-router-dom'

import PagesList from '../components/PagesList'



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

const UserPages = () => {
    //it has access to dynamic segments (:/userId in App.js)

    /* useParams will return an object which has dynamic segments that set up in the route config as properties */
    const userId = useParams().userId

    //We can use a built-in filter method to run a filter on every element in PAGES and have a look at evey element and only keep it in the newly returned array

    /* Filter will return a new array if the creator of that page we+re looking at is equal to userId and then we want to forward loaded as return */
    const loadedPages = PAGES.filter((page) => page.creator === userId)

  return (
   <PagesList items={loadedPages} />
  )
}

export default UserPages