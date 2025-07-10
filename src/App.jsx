import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
      console.log('Selected file:', file)
      setSelectedFile(file)
      // Removed setFileName(file.name)
    }
  }

  const handleConvert = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axios.post('amos-pdf-to-excel-backend-production.up.railway.app/convert', formData, {
        responseType: 'blob', // important for file download
      })

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'converted.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error converting file:', error)
      alert('Failed to convert the file. Please try again.')
    }
  }

  return (
    <>
      <div>
        <h1>Nabei... Cannot just copy paste meh?</h1>
      </div>
      <div className="card">
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        {/* Removed {fileName} display */}
        <button onClick={handleConvert} disabled={!selectedFile}>
          Convert to Excel
        </button>
      </div>
    </>
  )
}

export default App
