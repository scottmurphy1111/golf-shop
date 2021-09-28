import React, {ChangeEvent, useState} from 'react'

const EmailCapture = () => {
  const [formData, setFormData] = useState({})

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

    console.log('formData', formData)
  }

  return (
    <section>
      <h2>Stay in Touch</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first"
          placeholder="First Name..."
          onChange={e => handleChange('first', e.target.value)}
        />
        <input
          type="text"
          name="last"
          placeholder="Last Name..."
          onChange={e => handleChange('last', e.target.value)}
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
