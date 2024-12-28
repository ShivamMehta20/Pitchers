import {ReactNode} from "react";
import Navbar from "@/components/Navbar";
import 'easymde/dist/easymde.min.css';

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
return (
    <main className="font-work-sans">
        <Navbar/>
        {children}
    </main>
)
}