import Button from "@/components/Button"

const Navbar = () => {
  return (
    <div className="z-50 absolute top-0 left-0 w-full bg-transparent">
        
     <div className="text-right mr-25">
       <Button text="Login" link="/login" secondary />
    </div>    
    </div>
  )
}

export default Navbar