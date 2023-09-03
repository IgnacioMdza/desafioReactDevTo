import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { ReactComponent as AppleSvg } from '../assets/apple.svg';
import { ReactComponent as ForemSvg } from '../assets/forem.svg';
import { ReactComponent as GitHubSvg } from '../assets/gitHub.svg'
import { ReactComponent as TwitterSvg } from '../assets/twitter.svg';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar'

interface RegisterData {
    userName: string;
    userLastname: string;
    userNickName: string;
    userImage: string;
    userEmail: string;
    userPassword: string;
    userPasswordConfirm?: string;
    userEducation: string;
    userLocation: string;
    userJoined: string;
}

const locationsArray = [
    'México', 'USA', 'Canada', 'Colombia', 'España'
]
const schoolsArray = [
    'UBA Universidad', 'UNAM', 'UAG', 'MIT', 'Instituto Politécnico', 'UCR & UPC BarcelonaTech', 'Universidad de Colombia'
]

export default function Register () {
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<RegisterData>();

    function onSubmit( data: RegisterData ){
        if (data.userPasswordConfirm === data.userPassword) {
                //fetch("https://api-25-ebs.ignaciomdza.dev/users", {
                fetch("https://localhost:8080/users", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userName: data.userName,
                    userLastname: data.userLastname,
                    userNickName: `${data.userName.slice(0,3).toLowerCase()}${data.userLastname.slice(0,3).toLowerCase()}`,
                    userImage: data.userImage,
                    userEmail: data.userEmail,
                    userPassword: data.userPassword,
                    userEducation: schoolsArray[Math.floor(Math.random() * schoolsArray.length)],
                    userLocation: locationsArray[Math.floor(Math.random() * locationsArray.length)],
                    userJoined: new Date().toDateString()
                }),
            })
            .then((response) => response.json())
            .then(() => {
                // fetch("https://api-25-ebs.ignaciomdza.dev/auth", {
                fetch("https://localhost:8080/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                    email: data.userEmail,
                    password: data.userPassword,
                    }),
                })
                .then((response) => response.json())
                .then((response) => {
                    console.log("response: ", response);
                    if (response?.token) {
                        // el signo de '?' es nullSafeOperator, se utiliza cuando no queremos que el lenguaje mande un error si la ruta no existe
                        localStorage.setItem("token", response?.token);
                        //const token = localStorage.getItem('token')
                        toast.success("Usuario registrado con éxito", {autoClose: 2000,});
                        setTimeout(() => navigate("/"), 2000); 
                    } else {
                        toast.error("Usuario o contraseña no válido");
                    }
                })
                .catch(() => {
                    alert("falló el fetch");
                });
            })
            .catch(() => {
                toast.error('Fallo al registrar usuario')
            })
        } else {
            toast.error('Las contraseñas no coinciden')
        }
    }
    const token = localStorage.getItem("token") || "";
    if(token !== ''){
        localStorage.clear();
    } else {
    return (
        <>  
            <header>
                <NavBar/>
            </header>
            <main className='bg-[rgb(245,245,245)] font-sans sm:p-3 mt-[56px]'>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
                <div className='bg-white mx-auto flex flex-col max-w-[640px] rounded-lg p-4 sm:p-[48px] justify-between items-center gap-6'>
                    <div className='flex flex-col items-center justify-between'>
                        <h1 className='font-bold text-[30px] text-center'>Welcome to DEV Community</h1>
                        <p className='text-center'>DEV Community is a community of 1,095,873 amazing developers</p>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <button className='bg-[rgb(0,0,0)] w-full text-white p-3 rounded-md hover:bg-[#1b1b1b] hover:transition-all font-semibold flex justify-center items-center gap-2
                        '><AppleSvg/><p>Continue with Apple</p></button>
                        <button className='bg-[rgb(10,62,74)] w-full text-white p-3 rounded-md hover:bg-[#05313b] hover:transition-all font-semibold flex justify-center items-center gap-2
                        '><ForemSvg/><p>Continue with Forem</p></button>
                        <button className='bg-[rgb(36,41,46)] w-full text-white p-3 rounded-md hover:bg-[#000] hover:transition-all font-semibold flex justify-center items-center gap-2
                        '><GitHubSvg/><p>Continue with GitHub</p></button>
                        <button className='bg-[rgb(29,161,242)] w-full text-white p-3 rounded-md hover:bg-[#0096F2] hover:transition-all font-semibold flex justify-center items-center gap-2
                        '><TwitterSvg/><p>Continue with Twitter</p></button>
                    </div>
                    <div className='flex w-full items-center flex-nowrap'>
                        <div className='h-[2px] bg-neutral-300 w-full flex-shrink'></div>
                        <p className='text-sm mx-2 min-w-fit text-center'>Have a password? Continue with your email address</p>
                        <div className='h-[2px] bg-neutral-300 w-full'></div>
                    </div>
                    <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex gap-4 max-[400px]:flex-col'>
                            <div className='flex flex-col gap-2 w-2/4 max-[400px]:w-full'>
                                <p className='font-semibold'>Name</p>
                                <input
                                type="text"
                                className="outline-[rgb(59,73,223)] bg-white border border-neutral-300 rounded text-black p-2 text-center w-full"
                                {...register('userName', { required: {value: true, message: 'Nombre requerido'}, minLength:{value: 2, message: 'mínimo 2 caracteres para el nombre'}})}
                                />
                                { errors.userName && <p className='text-red-500 text-sm'>{ errors.userName.message }</p>}
                            </div>
                            <div className='flex flex-col gap-2 w-2/4 max-[400px]:w-full'>
                                <p className='font-semibold'>Lastname</p>
                                <input
                                type="text"
                                className="outline-[rgb(59,73,223)] bg-white border border-neutral-300 rounded text-black p-2 text-center w-full"
                                {...register('userLastname', { required: {value: true, message: 'Apellido requerido'}})}
                                />
                                { errors.userLastname && <p className='text-red-500 text-sm'>{ errors.userLastname.message }</p>}
                            </div>
                        </div>
                        <p className='font-semibold'>Image</p>
                        <input
                        type="text"
                        placeholder='Insert URL'
                        className="outline-[rgb(59,73,223)] bg-white border border-neutral-300 rounded text-black p-2 text-center"
                        {...register('userImage', { required: {value: true, message: 'Url de imagen requerido'}})}
                        />
                        { errors.userImage && <p className='text-red-500 text-sm'>{ errors.userImage.message }</p>}
                        <p className='font-semibold'>Email</p>
                        <input
                        type="text"
                        className="outline-[rgb(59,73,223)] bg-white border border-neutral-300 rounded text-black p-2 text-center"
                        {...register('userEmail', { required: {value: true, message: 'Email requerido'}})}
                        />
                        { errors.userEmail && <p className='text-red-500 text-sm'>{ errors.userEmail.message }</p>}
                        <div className='flex gap-4 max-[400px]:flex-col'>
                            <div className='flex flex-col gap-2 w-2/4 max-[400px]:w-full'>
                                <p className='font-semibold'>Password</p>
                                <input
                                type="password"
                                className="outline-[rgb(59,73,223)] bg-white border border-neutral-300 rounded text-black p-2 text-center w-full"
                                {...register('userPassword', { required: {value: true, message: 'password requerido'}, minLength:{value: 8, message: 'mínimo 8 caracteres para contraseña'}})}
                                />
                                { errors.userPassword && <p className='text-red-500 text-sm'>{ errors.userPassword.message }</p>}
                            </div>
                            <div className='flex flex-col gap-2 w-2/4 max-[400px]:w-full'>
                                <p className='font-semibold'>Confirm</p>
                                <input
                                type="password"
                                placeholder='Repeat password'
                                className="outline-[rgb(59,73,223)] bg-white border border-neutral-300 rounded text-black p-2 text-center w-full"
                                {...register('userPasswordConfirm', { required: {value: true, message: 'password de confirmación requerido'}})}
                                />
                                { errors.userPasswordConfirm && <p className='text-red-500 text-sm'>{ errors.userPasswordConfirm.message }</p>}
                            </div>
                        </div>
                        <input
                        type="submit"
                        value="Register"
                        className="bg-[rgb(59,73,223)] rounded p-3 text-white cursor-pointer hover:bg-[rgb(47,58,178)] hover:transition-all font-semibold my-3"
                        />
                    </form>
                </div>
            </main>
            <Footer/>
        </>
    )
}}