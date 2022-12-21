import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import axios from 'axios';

import FormItem from '../components/FormItem';

import './TemplateRealEstate.css'
import FormList from '../components/FormList';

const TemplateRealEstate = () => {


  const [loadedTemplates, setLoadedTemplates] = useState([])

  const pageId = useParams().pageId;

  const getTemplates = async () => {
    await axios({
      method: "GET",
      url: `http://localhost:8080/api/RE/template/${pageId}`,
      headers: "Content-type: application/json"
    })
      .then((res) => {
        console.log("Respond from the request -->", res)
        setLoadedTemplates(res.data.templates);
        console.log("Res.data.templates -->", res.data.templates)
      })
      .catch((err) => {
        console.log(err)
      })

    console.log("Loaded Templates --> ", loadedTemplates)

  }


  useEffect(() => {
    console.log("Inside of useEffect ->",loadedTemplates)
    getTemplates();
  }, [])


  const redirectToForm = () => {
    window.location = `/pages/${pageId}/formRE`;
  };


  return (
    <div>
      <FormList items={loadedTemplates} />

      <button onClick={redirectToForm}>Add house</button>

    </div>)
}

export default TemplateRealEstate

