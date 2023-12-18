import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
const useResource = (baseUrl, token) => {
  const [values, setValues] = useState([]);

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  const service = {
    create
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(baseUrl);
        setValues(data);
      } catch (error) {
        console.error(error)
      }
    };
    fetchData();
  }, [baseUrl]);

  return [
    values,
    service,
  ];
};

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  let [notes, noteService] = useResource('http://localhost:3005/notes')
  let [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    const newNote = await noteService.create({ content: content.value })
    notes.concat(newNote)
    content.value = ''
  }
 
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const newPerson = await personService.create({ name: name.value, number: number.value})
    persons = persons.concat(newPerson)
    name.value = ''
    number.value = ''
  }

  return (
    (<div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>)
  )
}

export default App