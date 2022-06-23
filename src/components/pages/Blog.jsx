import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import BlogDetails from "../BlogDetails"
import BlogForm from "../BlogForm"


export default function Blog() {
  // State to get the blog
  const [blog, setBlog] = useState({})
  const [showForm, setShowForm] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  // Retrieve the blog from the server
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
      .then((response) => {
        console.log(response.data)
        setBlog(response.data)
      })
      .catch(console.warn)
  }, [id])

  const handleSubmit = (e, form, setForm) => {
    e.preventDefault()
    axios.put(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`, form)
      .then((response) => {
        console.log(response.data)
        setBlog(response.data) // This updates the blog to state
        setShowForm(false) // This hides the form
      })
      .catch(console.warn)
    }

    const handleDelete = () => {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
        .then((response) => {
          // Navigate away from this page
          navigate("/")
        })
        .catch(console.warn)
    }

    return (
      <div>
        {showForm ?
        <BlogForm 
            initialForm={blog}
            submitHandler={handleSubmit}
        /> :
        <BlogDetails 
            blog={blog}
        />
        }

        <button onClick={() => setShowForm(!showForm)}>{ showForm ? 'Cancel' : 'Edit' }</button>

        {showForm ?
				<button
					onClick={handleDelete}
				>
					Delete
				</button> :
				''
			}
      </div>
    )
}

