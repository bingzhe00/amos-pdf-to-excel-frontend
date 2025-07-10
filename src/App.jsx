import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [pages, setPages] = useState('') // new state for page numbers

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
      console.log('Selected file:', file)
      setSelectedFile(file)
    }
  }

  const handleConvert = async () => {
  if (!selectedFile) return

  const formData = new FormData()
  formData.append('file', selectedFile)
  formData.append('pages', pages)

  try {
    const response = await axios.post(
      'https://amos-pdf-to-excel-backend-production.up.railway.app/convert',
      formData,
      { responseType: 'blob' }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'converted.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.error('Error converting file:', error)

    if (error.response) {
      // Try to read backend error text from the blob
      const reader = new FileReader()
      reader.onload = () => {
        alert(`Backend error: ${reader.result}`)
      }
      reader.readAsText(error.response.data)
    } else {
      alert('Failed to convert the file. Network error or unknown issue.')
    }
  }
}


  return (
    <>
      <div>
        <h1>Nabei... Cannot just copy paste meh?</h1>
      </div>
      <div className="card">
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <input
          type="text"
          placeholder="Pages (e.g., 1,2,5 or 1-3)"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <button onClick={handleConvert} disabled={!selectedFile}>
          Convert to Excel
        </button>
      </div>
    </>
  )
}

export default App
