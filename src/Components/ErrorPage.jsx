import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="w-full mx-auto block p-4 text-center bg-slate-100 rounded shadow">
            <h3 className="text-3xl font-bold py-5">
                Request Not Available
            </h3>
            <p className="py-3 text-2xl">
                For more Items
            </p>
            <Link to="/">
                <p className="text-pink-500 hover:underline my-5">
                    Go back to Home Page
                </p>
            </Link>
        </div>
    )
}

export default ErrorPage;