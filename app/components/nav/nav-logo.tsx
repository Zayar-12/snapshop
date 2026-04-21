import {  ShoppingBasket } from "lucide-react"
import Link from "next/link"


const NavLogo = () => {
  return (
    <Link href={"/"} className="text-3xl font-bold text-blue-600"><ShoppingBasket size={48}/></Link>
  )
}

export default NavLogo