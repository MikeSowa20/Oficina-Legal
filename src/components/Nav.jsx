import { Link } from "react-router-dom"

function Nav() {
    return (
        <nav className="min-h-[15vh] bg-cyan-950 text-gray-100 flex items-stretch shadow-lg">
            
            {/* Logo - quadrado com altura igual à da nav */}
            <div className="bg-emerald-800 aspect-square min-h-[15vh]">
            </div>

            {/* Links alinhados à direita */}
            <ul className="flex items-center gap-10 justify-end px-20 ml-auto">
                <li className="font-extrabold relative group text-xl">
                        <Link to={"/producoes"} className="inline-flex items-center">Produções</Link>
                        <ul className="absolute left-0 top-full w-40 bg-cyan-950 text-sm shadow-lg hidden group-hover:block z-50">
                            <li className="border-b last:border-b-0 text-1xl">
                                <Link to={"/producoes/artigos"} className="block px-4 py-2 hover:bg-cyan-800  text-xl">Artigos</Link>
                            </li>
                            <li>
                                <Link to={"/producoes/folders"} className="block px-4 py-2 hover:bg-cyan-800 text-xl">Folders</Link>
                            </li>
                        </ul>
                </li>
                <hr className="border-e min-h-7" />
                <li className="font-extrabold"> 
                    <Link className="text-xl" to={"/"}>Home</Link>
                </li>
                <hr className="border-e min-h-7" />
                <li className="font-extrabold">
                    <Link className="text-xl" to={"/about"}>About</Link>
                </li>
                <hr className="border-e min-h-7" />
                <li className="font-extrabold">
                    <Link className="text-xl" to={"/contact"}>Contact</Link>
                </li>
                <hr className="border-e min-h-7" />
                <li className="font-extrabold">
                    <Link className="text-xl text-amber-500" to={"/admin"}>Admin</Link>
                </li>
            </ul>

        </nav>
    )
}

export default Nav