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

interface LoginData {
    email: string;
    password: string;
}

export default function Login () {
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<LoginData>();

    function onSubmit( data: LoginData ) {
        // fetch("https://api-25-ebs.ignaciomdza.dev/auth", {
        fetch("http://localhost:8080/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            email: data.email,
            password: data.password,
            }),
        })
        .then((response) => response.json())
        .then((response) => {
            console.log("response: ", response);
            if (response?.token) {
                // el signo de '?' es nullSafeOperator, se utiliza cuando no queremos que el lenguaje mande un error si la ruta no existe
                localStorage.setItem("token", response?.token);
                //const token = localStorage.getItem('token')
                toast.success("Has iniciado sesión", {autoClose: 2000,});
                setTimeout(() => navigate("/"), 2000); // Redireccionar a otra página
            } else {
                toast.error("Usuario o contraseña no válido");
            }
        })
        .catch(() => {
            alert("falló el fetch");
        });
    }

    const token = localStorage.getItem("token") || "";
    if(token !== ''){
        window.location.replace("/");
    } else {
    return (
        <>  
            <header>
                <NavBar/>
            </header>
            <main className='bg-[rgb(245,245,245)] font-sans sm:p-3 mt-[56px]'>
                <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
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
                        <p className='font-semibold'>Email</p>
                        <input
                        type="text"
                        className="outline-[rgb(59,73,223)] bg-white border border-neutral-300 rounded text-black p-2 text-center"
                        {...register('email', { required: {value: true, message: 'Email requerido'}})}
                        />
                        { errors.email && <p className='text-center text-red-500 text-sm'>{ errors.email.message }</p>}
                        <p className='font-semibold'>Password</p>
                        <input
                        type="password"
                        className="outline-[rgb(59,73,223)] bg-white border border-neutral-300 rounded text-black p-2 text-center"
                        {...register('password', { required: {value: true, message: 'Contraseña requerida'}})}
                        />
                        { errors.password && <p className='text-center text-red-500 text-sm'>{ errors.password.message }</p>}
                        <div className='flex gap-3'>
                            <input type='checkbox'/>
                            <label className='py-1'>Remember me</label>
                        </div>
                        <input
                        type="submit"
                        value="Continue"
                        className="bg-[rgb(59,73,223)] rounded p-3 text-white cursor-pointer hover:bg-[rgb(47,58,178)] hover:transition-all font-semibold"
                        />
                        <p className='text-[rgb(59,73,223)] pt-4 text-sm mx-auto'>I forgot my password</p>
                    </form>
                </div>
            </main>
            <Footer/>
        </>
    )
}}