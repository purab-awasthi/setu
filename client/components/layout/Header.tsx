import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow">
      <div className="container mx-auto flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <circle cx="12" cy="12" r="10" className="fill-white/90" />
                <path d="M7 12h10M12 7v10" className="stroke-primary" strokeWidth={2} strokeLinecap="round"/>
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-sm opacity-90">PM Internship Scheme</p>
              <p className="text-lg font-bold -mt-0.5">InternSetu</p>
            </div>
          </Link>
        </div>

        <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-white/20">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive})=>`hover:underline underline-offset-4 ${isActive?"opacity-100":"opacity-80"}`}>Home</NavLink>
          <NavLink to="/help" className={({isActive})=>`hover:underline underline-offset-4 ${isActive?"opacity-100":"opacity-80"}`}>Help</NavLink>
          <NavLink to="/student" className={({isActive})=>`hover:underline underline-offset-4 ${isActive?"opacity-100":"opacity-80"}`}>Student</NavLink>
          <NavLink to="/company" className={({isActive})=>`hover:underline underline-offset-4 ${isActive?"opacity-100":"opacity-80"}`}>Company</NavLink>
          <NavLink to="/admin" className={({isActive})=>`hover:underline underline-offset-4 ${isActive?"opacity-100":"opacity-80"}`}>Admin</NavLink>
          <div className="h-6 w-px bg-white/20" />
          <NavLink to="/apply" className="btn btn-accent text-sm">Apply Now</NavLink>
          <NavLink to="/login" className="btn bg-white text-primary hover:bg-white/90 text-sm">Login</NavLink>
        </nav>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/15 bg-primary/95">
          <div className="container mx-auto py-3 flex flex-col gap-2">
            <Link to="/" onClick={()=>setOpen(false)} className="py-2">Home</Link>
            <Link to="/help" onClick={()=>setOpen(false)} className="py-2">Help</Link>
            <Link to="/student" onClick={()=>setOpen(false)} className="py-2">Student</Link>
            <Link to="/company" onClick={()=>setOpen(false)} className="py-2">Company</Link>
            <Link to="/admin" onClick={()=>setOpen(false)} className="py-2">Admin</Link>
            <div className="flex gap-3 pt-2">
              <Link to="/apply" onClick={()=>setOpen(false)} className="btn btn-accent flex-1">Apply Now</Link>
              <Link to="/login" onClick={()=>setOpen(false)} className="btn bg-white text-primary flex-1">Login</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
