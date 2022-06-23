import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import BlogForm from "../BlogForm"

export default function Home() {
  // Blogs from the backend
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog`)
        setBlogs(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlogs()
  }, []) // Get all of the blogs when the page loads

  // Submit handler function
  const handleSubmit = async (e, form) => {
    e.preventDefault()
    // Axios to POST a new blog using the form state
    try {
      // Post to the backend
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blog`, form)
     
      // Add this new blog into state
      setBlogs([...blogs, response.data])
      
    } catch (error) {
      console.warn("submit error:", error)
      if (error.response) {
        if (error.response.status === 400) {
          console.log(error)
        }
      }
    }
  }

  console.log("My server url is", process.env.REACT_APP_SERVER_URL)
  const blogLinks = blogs.map((blog, idx) => {
    return (
      <div key={`blogLink${idx}`}>
        <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
      </div>
    )
  })
  return (
    <div>
      <h1>Create New Blog:</h1>
      <BlogForm
        submitHandler={handleSubmit}
        initialForm={{
          title: "",
          body: "",
        }}
      />
      <h1>Current Blogs:</h1>
      {blogLinks}
    </div>
  )
}