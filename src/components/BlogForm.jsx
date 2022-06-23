import { useState } from "react"

export default function BlogForm({ submitHandler, initialForm }) {
    const [form, setForm] = useState(initialForm)
     return (
       <form onSubmit={(e) => submitHandler(e, form, setForm)}>
         <label htmlFor="title">Title:</label>
         <input
           type="text"
           id="title"
           value={form.title}
           onChange={(e) => setForm({ ...form, title: e.target.value })}
         />

         <label htmlFor="body">Body:</label>
         <input
           type="text"
           id="body"
           value={form.body}
           onChange={(e) => setForm({ ...form, body: e.target.value })}
         />

         <button type="submit">Submit!</button>
       </form>
     )
}