import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPasswords = async() => {
    
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()

    console.log(passwords)
    setpasswordArray(passwords)
  }
  
  useEffect(() => {
    getPasswords()
  }, [])

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }
  
  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("/public/icons/crossEye.webp")) {
      ref.current.src = "/public/icons/eyee.png"
      passwordRef.current.type = "text"
    } else {
      ref.current.src = "/public/icons/crossEye.webp"
      passwordRef.current.type = "password"
    }
  }

  const savePassword = async () => {
  if (form.site && form.username && form.password) {
    const newEntry = { ...form, id: uuidv4() };

    // Update local state
    setpasswordArray((prev) => [...prev, newEntry]);

    // Save the new entry to the server
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newEntry),
    });

    // Reset the form
    setform({ site: "", username: "", password: "" });

    toast('Password Saved Successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else {
    toast('Please fill all fields!', { theme: "dark" });
  }
};

  const deletePassword = async (id) => {
    // console.log("Deleting"+ id)
    let c = confirm("do you want to delete it!!!")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"content-type": "application/json"}, body: JSON.stringify({ id}) })

      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      toast('Password Deleted Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }else{
    }
  }
  
  const editPassword = (id) => {
    setform({...passwordArray.filter(i=>i.id===id)[0], id: id})
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    toast('Password Edited!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: [e.target.value] })
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>

      <div className='p-3 md:mycontainer min-h-[88.6vh]' >
        <h1 className='text-3xl text-center font-bold' >
          <span className='text-green-700'>&lt;</span>
          <span className='text-black'>Key</span>
          <span className='text-purple-400'>Safe</span>
          <span className='text-green-700'>/&gt;</span>
        </h1>
        <p className='text-green-600 text-lg text-center'>This is your password Manager</p>

        <div className='flex-col flex p-4 gap-8 items-center' >
          <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-800 p-3 py-1 text-black w-full' type="text" name='site' id='site' />
          <div className='flex flex-col md:flex-row gap-8 justify-between w-full'>
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-800 p-3 py-1 text-black w-full' type="text" name='username' id='username' />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-800 p-3 py-1 text-black w-full' type="password" name='password' id='password' />
              <span className='absolute right-0 top-1 cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={25} src="/public/icons/eyee.png" alt="eye" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex bg-green-500 hover:bg-green-300 rounded-full items-center justify-center w-fit p-2 px-3 py-2 hover:border border-black border-2'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Add Password</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-center py-2 text-lg'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-7">
            <thead className='bg-purple-800 text-white' >
              <tr>
                <th>Your Site </th>
                <th>Username </th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-purple-200'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-black text-center' >
                    <div className='flex items-center justify-center' >
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer py-2 px-2' onClick={() => { copyText(item.site) }} >
                        <lord-icon src="https://cdn.lordicon.com/fjvfsqea.json"
                          style={{ "width": "20px", "height": "20px" }}
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-black text-center' >
                    <div className='flex items-center justify-center' >
                      <span>
                        {item.username}
                      </span>
                      <div className='lordiconcopy size-7 cursor-pointer py-2 px-2' onClick={() => { copyText(item.username) }} >
                        <lord-icon src="https://cdn.lordicon.com/fjvfsqea.json"
                          style={{ "width": "20px", "height": "20px" }}
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-black text-center' >
                    <div className='flex items-center justify-center' >
                      <span>{(item.password)}</span>
                      <div className='lordiconcopy size-7 cursor-pointer py-2 px-2' onClick={() => { copyText(item.password) }} >
                        <lord-icon src="https://cdn.lordicon.com/fjvfsqea.json"
                          style={{ "width": "20px", "height": "20px" }}
                          trigger="hover">
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='py-2 border border-black text-center' >
                    <span className='cursor-pointer mx-2' onClick={()=>{deletePassword(item.id)}}><lord-icon
                      src="https://cdn.lordicon.com/hwjcdycb.json"
                      trigger="hover"
                      style={{ "width": "25px", "height": "25px" }}>
                    </lord-icon></span>
                    <span className='cursor-pointer mx-2' onClick={()=>{editPassword(item.id)}}><lord-icon
                      src="https://cdn.lordicon.com/exymduqj.json"
                      trigger="hover"
                      style={{"width":"25px","height":"25px"}}>
                    </lord-icon></span>
                        </td>
                  
                </tr>
              })}
            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager

// // 1:57:40 / 2:28:15
