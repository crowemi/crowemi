export default function Page() {
    return (
        <>
            <div className="container-fluid bg-four py-12">
                <div className="px-10 flex flex-grow">
                    <div className="min-h-24 min-w-24">
                        <img
                            className="inline-block h-24 w-24 rounded-full"
                            src="avatar.jpg"
                            alt="Andy Crowe"
                        />
                    </div>
                    <div className="px-5">
                    <div className="font-extrabold text-one text-3xl text-left">
                        In Christ. Learner. Reader. Writer. Engineer.
                    </div>
                    <div className="leading-loose py-5">
                        I'm Andy Crowe, a <span className="font-extrabold">Christian</span> working as a data engineer <a href="#">@subsplash</a>. 
                        I enjoy <span className="font-extrabold">learning</span>, <span className="font-extrabold">reading</span>, and <span className="font-extrabold">writing</span> about all sorts of things.
                        Hopefully the content of this site will be in some way beneficial to you, if not just a window into my journey.
                    </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}