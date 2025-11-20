// import React from 'react'
// import { useRef, useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';
// import 'react-toastify/dist/ReactToastify.css';

// const Manager = () => {
//     const ref = useRef()
//     const passwordRef = useRef()
//     const [form, setform] = useState({ site: "", username: "", password: "" })
//     const [passwordArray, setPasswordArray] = useState([])

//     const getPasswords = async () => {
//         let req = await fetch("http://localhost:3000/")
//         let passwords = await req.json()
//         setPasswordArray(passwords)
//     }


//     useEffect(() => {
//         getPasswords()
//     }, [])


//     const copyText = (text) => {
//         toast('Copied to clipboard!', {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//         });
//         navigator.clipboard.writeText(text)
//     }

//     const showPassword = () => {
//         passwordRef.current.type = "text"
//         console.log(ref.current.src)
//         if (ref.current.src.includes("icons/eyecross.png")) {
//             ref.current.src = "icons/eye.png"
//             passwordRef.current.type = "password"
//         }
//         else {
//             passwordRef.current.type = "text"
//             ref.current.src = "icons/eyecross.png"
//         }

//     }

//     const savePassword = async () => {
//         if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

//             // If any such id exists in the db, delete it 
//             await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

//             setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
//             await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

//             // Otherwise clear the form and show toast
//             setform({ site: "", username: "", password: "" })
//             toast('Password saved!', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });
//         }
//         else {
//             toast('Error: Password not saved!');
//         }

//     }

//     const deletePassword = async (id) => {
//         console.log("Deleting password with id ", id)
//         let c = confirm("Do you really want to delete this password?")
//         if (c) {
//             setPasswordArray(passwordArray.filter(item => item.id !== id))
            
//             await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

//             toast('Password Deleted!', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true, 
//                 draggable: true,
//                 progress: undefined,
//                 theme: "dark",
//             });
//         }

//     }

//     const editPassword = (id) => {
//         setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
//         setPasswordArray(passwordArray.filter(item => item.id !== id))
//     }


//     const handleChange = (e) => {
//         setform({ ...form, [e.target.name]: e.target.value })
//     }


//     return (
//         <>
//             <ToastContainer />
//             <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
//             <div className=" p-3 md:mycontainer min-h-[88.2vh] ">
//                 <h1 className='text-4xl text font-bold text-center'>
//                     <span className='text-green-500'> &lt;</span>

//                     <span>Pass</span><span className='text-green-500'>OP/&gt;</span>

//                 </h1>
//                 <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

//                 <div className="flex flex-col p-4 text-black gap-8 items-center">
//                     <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
//                     <div className="flex flex-col md:flex-row w-full justify-between gap-8">
//                         <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />
//                         <div className="relative">
//                             <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
//                             <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
//                                 <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
//                             </span>
//                         </div>

//                     </div>
//                     <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
//                         <lord-icon
//                             src="https://cdn.lordicon.com/jgnvfzqg.json"
//                             trigger="hover" >
//                         </lord-icon>
//                         Save</button>
//                 </div>

//                 <div className="passwords">
//                     <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
//                     {passwordArray.length === 0 && <div> No passwords to show</div>}
//                     {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
//                         <thead className='bg-green-800 text-white'>
//                             <tr>
//                                 <th className='py-2'>Site</th>
//                                 <th className='py-2'>Username</th>
//                                 <th className='py-2'>Password</th>
//                                 <th className='py-2'>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className='bg-green-100'>
//                             {passwordArray.map((item, index) => {
//                                 return <tr key={index}>
//                                     <td className='py-2 border border-white text-center'>
//                                         <div className='flex items-center justify-center '>
//                                             <a href={item.site} target='_blank'>{item.site}</a>
//                                             <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
//                                                 <lord-icon
//                                                     style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
//                                                     src="https://cdn.lordicon.com/iykgtsbt.json"
//                                                     trigger="hover" >
//                                                 </lord-icon>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className='py-2 border border-white text-center'>
//                                         <div className='flex items-center justify-center '>
//                                             <span>{item.username}</span>
//                                             <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
//                                                 <lord-icon
//                                                     style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
//                                                     src="https://cdn.lordicon.com/iykgtsbt.json"
//                                                     trigger="hover" >
//                                                 </lord-icon>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className='py-2 border border-white text-center'>
//                                         <div className='flex items-center justify-center '>
//                                             <span>{"*".repeat(item.password.length)}</span>
//                                             <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
//                                                 <lord-icon
//                                                     style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
//                                                     src="https://cdn.lordicon.com/iykgtsbt.json"
//                                                     trigger="hover" >
//                                                 </lord-icon>
//                                             </div>
//                                         </div>
//                                     </td>
//                                     <td className='justify-center py-2 border border-white text-center'>
//                                         <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
//                                             <lord-icon
//                                                 src="https://cdn.lordicon.com/gwlusjdu.json"
//                                                 trigger="hover"
//                                                 style={{ "width": "25px", "height": "25px" }}>
//                                             </lord-icon>
//                                         </span>
//                                         <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
//                                             <lord-icon
//                                                 src="https://cdn.lordicon.com/skkahier.json"
//                                                 trigger="hover"
//                                                 style={{ "width": "25px", "height": "25px" }}>
//                                             </lord-icon>
//                                         </span>
//                                     </td>
//                                 </tr>
//                             })}
//                         </tbody>
//                     </table>}
//                 </div>
//             </div>

//         </>
//     )
// }

// export default Manager

























import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredPasswords, setFilteredPasswords] = useState([])
    const [passwordStrength, setPasswordStrength] = useState("")
    const [showStrength, setShowStrength] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    const getPasswords = async () => {
        try {
            let req = await fetch("http://localhost:3000/")
            let passwords = await req.json()
            setPasswordArray(passwords)
            setFilteredPasswords(passwords)
        } catch (error) {
            console.error("Failed to fetch passwords:", error)
            toast.error('Failed to load passwords!')
        }
    }

    useEffect(() => {
        getPasswords()
    }, [])

    useEffect(() => {
        const filtered = passwordArray.filter(item => 
            item.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPasswords(filtered)
    }, [searchTerm, passwordArray])

    const checkPasswordStrength = (password) => {
        let strength = 0
        if (password.length >= 8) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++
        
        const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
        const strengthColors = ["text-red-500", "text-orange-500", "text-yellow-500", "text-blue-500", "text-green-500"]
        
        return {
            level: strength,
            label: strengthLabels[strength - 1] || "Very Weak",
            color: strengthColors[strength - 1] || "text-red-500"
        }
    }

    const generateStrongPassword = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
        let password = ""
        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setform({...form, password})
        const strength = checkPasswordStrength(password)
        setPasswordStrength(strength)
        setShowStrength(true)
    }

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: darkMode ? "dark" : "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        } else {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eye.png"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            try {
                if (form.id) {
                    await fetch("http://localhost:3000/", { 
                        method: "DELETE", 
                        headers: { "Content-Type": "application/json" }, 
                        body: JSON.stringify({ id: form.id }) 
                    })
                }

                const newPassword = { ...form, id: form.id || uuidv4() }
                await fetch("http://localhost:3000/", { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify(newPassword) 
                })

                if (form.id) {
                    setPasswordArray(passwordArray.map(item => item.id === form.id ? newPassword : item))
                } else {
                    setPasswordArray([...passwordArray, newPassword])
                }

                setform({ site: "", username: "", password: "" })
                setShowStrength(false)
                toast.success('Password saved successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } catch (error) {
                toast.error('Failed to save password!')
            }
        } else {
            toast.error('All fields must contain at least 4 characters!');
        }
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            try {
                setPasswordArray(passwordArray.filter(item => item.id !== id))
                await fetch("http://localhost:3000/", { 
                    method: "DELETE", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify({ id }) 
                })
                toast.success('Password deleted successfully!')
            } catch (error) {
                toast.error('Failed to delete password!')
                getPasswords() // Reload passwords if delete failed
            }
        }
    }

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id)
        setform({ ...passwordToEdit })
        const strength = checkPasswordStrength(passwordToEdit.password)
        setPasswordStrength(strength)
        setShowStrength(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setform({ ...form, [name]: value })
        
        if (name === 'password') {
            const strength = checkPasswordStrength(value)
            setPasswordStrength(strength)
            setShowStrength(true)
        }
    }

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    const getStrengthBars = (level) => {
        return Array.from({ length: 5 }, (_, i) => (
            <div 
                key={i}
                className={`h-2 rounded-full mx-1 flex-1 ${
                    i < level ? 
                    (level === 1 ? 'bg-red-500' : 
                     level === 2 ? 'bg-orange-500' : 
                     level === 3 ? 'bg-yellow-500' : 
                     level === 4 ? 'bg-blue-500' : 'bg-green-500') : 
                    (darkMode ? 'bg-gray-600' : 'bg-gray-300')
                }`}
            />
        ))
    }

    return (
        <>
            <ToastContainer />
            <div className={`min-h-screen transition-colors duration-300 ${
                darkMode 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 text-gray-900'
            }`}>
                {/* Animated Background */}
                <div className="fixed inset-0 -z-10 overflow-hidden">
                    <div className={`absolute inset-0 bg-[linear-gradient(to_right,${darkMode ? '#4a5568' : '#808080'}0a_1px,transparent_1px),linear-gradient(to_bottom,${darkMode ? '#4a5568' : '#808080'}0a_1px,transparent_1px)] bg-[size:14px_24px]`}></div>
                    <div className="absolute left-0 right-0 top-0 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
                    <div className="absolute right-0 bottom-0 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-4 py-8 max-w-6xl">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-12">
                        <div className="flex items-center space-x-4">
                            <h1 className='text-5xl font-bold'>
                                <span className='text-green-500'> &lt;</span>
                                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Pass</span>
                                <span className='text-green-500'>OP/&gt;</span>
                            </h1>
                            <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
                            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Your Secure Password Manager
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className={`p-3 rounded-2xl transition-all duration-300 ${
                                    darkMode 
                                        ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300' 
                                        : 'bg-white hover:bg-gray-100 text-gray-700 shadow-lg'
                                }`}
                            >
                                {darkMode ? '🌙' : '☀️'}
                            </button>
                            <div className={`px-4 py-2 rounded-2xl ${
                                darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                            }`}>
                                <span className="text-sm opacity-75">Total: </span>
                                <span className="font-bold text-green-500">{passwordArray.length}</span>
                            </div>
                        </div>
                    </header>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-12">
                        {/* Add Password Card */}
                        <div className={`lg:col-span-1 rounded-3xl p-8 transition-all duration-300 ${
                            darkMode 
                                ? 'bg-gray-800 shadow-2xl' 
                                : 'bg-white shadow-2xl border border-gray-100'
                        }`}>
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
                                {form.id ? 'Edit Password' : 'Add New Password'}
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Website URL
                                    </label>
                                    <input 
                                        value={form.site} 
                                        onChange={handleChange}
                                        placeholder='https://example.com' 
                                        className={`w-full rounded-2xl p-4 transition-all duration-300 ${
                                            darkMode 
                                                ? 'bg-gray-700 border-gray-600 focus:border-green-500' 
                                                : 'bg-gray-50 border-gray-200 focus:border-green-500'
                                        } border focus:ring-2 focus:ring-green-200`} 
                                        type="text" 
                                        name="site" 
                                    />
                                </div>
                                
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Username
                                    </label>
                                    <input 
                                        value={form.username} 
                                        onChange={handleChange}
                                        placeholder='Enter your username' 
                                        className={`w-full rounded-2xl p-4 transition-all duration-300 ${
                                            darkMode 
                                                ? 'bg-gray-700 border-gray-600 focus:border-green-500' 
                                                : 'bg-gray-50 border-gray-200 focus:border-green-500'
                                        } border focus:ring-2 focus:ring-green-200`} 
                                        type="text" 
                                        name="username" 
                                    />
                                </div>
                                
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={generateStrongPassword}
                                            className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-colors"
                                        >
                                            Generate
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input 
                                            ref={passwordRef}
                                            value={form.password} 
                                            onChange={handleChange}
                                            placeholder='Enter your password' 
                                            className={`w-full rounded-2xl p-4 pr-12 transition-all duration-300 ${
                                                darkMode 
                                                    ? 'bg-gray-700 border-gray-600 focus:border-green-500' 
                                                    : 'bg-gray-50 border-gray-200 focus:border-green-500'
                                            } border focus:ring-2 focus:ring-green-200`} 
                                            type="password" 
                                            name="password" 
                                        />
                                        <span 
                                            className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform'
                                            onClick={showPassword}
                                        >
                                            <img 
                                                ref={ref} 
                                                className='w-6 h-6 opacity-60' 
                                                src="icons/eye.png" 
                                                alt="Toggle visibility" 
                                            />
                                        </span>
                                    </div>
                                    
                                    {showStrength && passwordStrength && (
                                        <div className="mt-3">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                                    Strength:
                                                </span>
                                                <span className={`font-semibold ${passwordStrength.color}`}>
                                                    {passwordStrength.label}
                                                </span>
                                            </div>
                                            <div className="flex space-x-1">
                                                {getStrengthBars(passwordStrength.level)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <button 
                                    onClick={savePassword}
                                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                                >
                                    <lord-icon
                                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                                        trigger="hover"
                                        colors="primary:#ffffff"
                                        style={{width: '24px', height: '24px'}}>
                                    </lord-icon>
                                    <span>{form.id ? 'Update Password' : 'Save Password'}</span>
                                </button>
                            </div>
                        </div>

                        {/* Password List */}
                        <div className={`lg:col-span-2 rounded-3xl p-8 transition-all duration-300 ${
                            darkMode 
                                ? 'bg-gray-800 shadow-2xl' 
                                : 'bg-white shadow-2xl border border-gray-100'
                        }`}>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                                <h2 className="text-2xl font-bold flex items-center">
                                    <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
                                    Your Passwords
                                    <span className={`ml-3 text-sm px-3 py-1 rounded-full ${
                                        darkMode ? 'bg-gray-700' : 'bg-gray-100'
                                    }`}>
                                        {filteredPasswords.length} items
                                    </span>
                                </h2>
                                
                                <div className="relative w-full sm:w-64">
                                    <input
                                        type="text"
                                        placeholder="Search passwords..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className={`w-full rounded-2xl pl-10 pr-4 py-3 transition-all duration-300 ${
                                            darkMode 
                                                ? 'bg-gray-700 border-gray-600 focus:border-blue-500' 
                                                : 'bg-gray-50 border-gray-200 focus:border-blue-500'
                                        } border focus:ring-2 focus:ring-blue-200`}
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                        <lord-icon
                                            src="https://cdn.lordicon.com/xfftupfv.json"
                                            trigger="hover"
                                            colors={darkMode ? "primary:#ffffff" : "primary:#6b7280"}
                                            style={{width: '20px', height: '20px'}}>
                                        </lord-icon>
                                    </div>
                                </div>
                            </div>

                            {filteredPasswords.length === 0 ? (
                                <div className={`text-center py-16 rounded-2xl ${
                                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                }`}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/wxnxiano.json"
                                        trigger="hover"
                                        colors={darkMode ? "primary:#9ca3af" : "primary:#6b7280"}
                                        style={{width: '80px', height: '80px'}}>
                                    </lord-icon>
                                    <p className={`mt-4 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {searchTerm ? 'No passwords match your search' : 'No passwords saved yet'}
                                    </p>
                                    <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {searchTerm ? 'Try a different search term' : 'Add your first password to get started'}
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
                                    <table className="w-full">
                                        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                                            <tr>
                                                <th className="py-4 px-6 text-left font-semibold">Site</th>
                                                <th className="py-4 px-6 text-left font-semibold">Username</th>
                                                <th className="py-4 px-6 text-left font-semibold">Password</th>
                                                <th className="py-4 px-6 text-center font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {filteredPasswords.map((item, index) => {
                                                const strength = checkPasswordStrength(item.password)
                                                return (
                                                    <tr 
                                                        key={item.id} 
                                                        className={`transition-colors hover:${
                                                            darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                        }`}
                                                    >
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                                                    {item.site.charAt(0).toUpperCase()}
                                                                </div>
                                                                <div>
                                                                    <a 
                                                                        href={item.site.startsWith('http') ? item.site : `https://${item.site}`}
                                                                        target='_blank' 
                                                                        rel="noopener noreferrer"
                                                                        className="font-medium hover:text-green-500 transition-colors"
                                                                    >
                                                                        {item.site.length > 20 ? item.site.substring(0, 20) + '...' : item.site}
                                                                    </a>
                                                                </div>
                                                                <button 
                                                                    onClick={() => copyText(item.site)}
                                                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                                                >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                        trigger="hover"
                                                                        colors={darkMode ? "primary:#ffffff" : "primary:#6b7280"}
                                                                        style={{width: '18px', height: '18px'}}>
                                                                    </lord-icon>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="font-mono">{item.username}</span>
                                                                <button 
                                                                    onClick={() => copyText(item.username)}
                                                                    className="opacity-60 hover:opacity-100 transition-opacity p-1"
                                                                >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                        trigger="hover"
                                                                        colors={darkMode ? "primary:#ffffff" : "primary:#6b7280"}
                                                                        style={{width: '18px', height: '18px'}}>
                                                                    </lord-icon>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="font-mono text-sm">
                                                                        {"•".repeat(Math.min(item.password.length, 12))}
                                                                    </span>
                                                                    <div className={`w-2 h-2 rounded-full ${strength.color.replace('text-', 'bg-')}`}></div>
                                                                </div>
                                                                <button 
                                                                    onClick={() => copyText(item.password)}
                                                                    className="opacity-60 hover:opacity-100 transition-opacity p-1"
                                                                >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                                        trigger="hover"
                                                                        colors={darkMode ? "primary:#ffffff" : "primary:#6b7280"}
                                                                        style={{width: '18px', height: '18px'}}>
                                                                    </lord-icon>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <div className="flex justify-center space-x-2">
                                                                <button 
                                                                    onClick={() => editPassword(item.id)}
                                                                    className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white"
                                                                    title="Edit"
                                                                >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                                        trigger="hover"
                                                                        colors="primary:#ffffff"
                                                                        style={{width: '20px', height: '20px'}}>
                                                                    </lord-icon>
                                                                </button>
                                                                <button 
                                                                    onClick={() => deletePassword(item.id)}
                                                                    className="p-2 rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-white"
                                                                    title="Delete"
                                                                >
                                                                    <lord-icon
                                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                                        trigger="hover"
                                                                        colors="primary:#ffffff"
                                                                        style={{width: '20px', height: '20px'}}>
                                                                    </lord-icon>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Footer */}
                    <footer className={`rounded-3xl p-6 transition-all duration-300 ${
                        darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
                    }`}>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-2xl font-bold text-green-500">{passwordArray.length}</div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Passwords</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-500">
                                    {passwordArray.filter(item => checkPasswordStrength(item.password).level >= 4).length}
                                </div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Strong Passwords</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-500">
                                    {new Set(passwordArray.map(item => item.site)).size}
                                </div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Unique Sites</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-purple-500">
                                    {Math.round((passwordArray.filter(item => checkPasswordStrength(item.password).level >= 3).length / passwordArray.length) * 100) || 0}%
                                </div>
                                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Security Score</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default Manager