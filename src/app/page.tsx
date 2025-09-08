import { redirect } from "next/navigation";

function HomePage(){
    redirect("/dashboard/products")
}

export default HomePage;