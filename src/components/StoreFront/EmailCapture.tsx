import {gql, useMutation, useQuery} from '@apollo/client'
import React, {ChangeEvent, useState} from 'react'

import {fetchEmails} from '../../api/emailUtils'

const FETCH_EMAILS = gql`
  query GetEmails {
    getEmails {
      uid
      name
      email
    }
  }
`

const ADD_EMAIL = gql`
  mutation AddEmail($name: String!, $email: String!) {
    addEmail(name: $name, email: $email) {
      name
      email
    }
  }
`

const EmailCapture = () => {
  const [formData, setFormData] = useState({})
  // const {loading, error, data} = useQuery(FETCH_EMAILS)
  const [addEmail, {loading, error, data}] = useMutation(ADD_EMAIL)
  console.log(`emails =  ${data}`)

  const handleChange = (key: string, e: string) => {
    setFormData(data => {
      return {
        ...data,
        [key]: e,
      }
    })
  }
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    addEmail({variables: formData})
    console.log('formData', JSON.stringify(formData))
  }

  return (
    <section>
      <h2>Stay in Touch</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name..."
          onChange={e => handleChange('name', e.target.value)}
        />
        <input
          type="email"
          placeholder="Email..."
          onChange={e => handleChange('email', e.target.value)}
        />
        <button>Submit</button>
      </form>
    </section>
  )
}

export default EmailCapture
