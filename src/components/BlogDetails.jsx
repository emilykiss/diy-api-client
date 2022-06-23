export default function BlogDetails({ blog }) {
  return (
    <div>
      <h1>{blog.title}</h1>

      <h2>{blog.body}</h2>
    </div>
  )
}
