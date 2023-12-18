import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        )
        setCountry(response.data)
      } catch (error) {
        setCountry({})
        console.error(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [name])

  return { country, loading }
}

const Country = ({ country, loading }) => {
  if (loading) {
    return <div>Loading...</div>
  }
  if (!country) {
    return <div>country is null or undefined...</div>
  }
  if (!country.name) {
    return <div>not found...</div>
  }
  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height='100'
        alt={`flag of ${country.name.common}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const { country, loading } = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input name='nameInput' {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} loading={loading} />
    </div>
  )
}

export default App
