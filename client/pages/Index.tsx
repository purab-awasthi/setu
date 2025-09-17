import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResumeUploadButton from "@/components/ResumeUpload";
import InteractiveMap from "@/components/InteractiveMap"; // 1. IMPORT THE NEW COMPONENT

export default function Index() {
  const slides = useMemo(
    () => [
      {
        title: "Empowering Students Nationwide",
        subtitle:
          "AI-guided profiles, resume scoring, and fair recommendations for internships.",
        cta: { label: "Apply Now", href: "/apply" },
        bg: "bg-[linear-gradient(120deg,#FF7A00_0%,#FFB46B_40%,#0052A5_100%)]",
      },
      {
        title: "Trusted by Government & Industry",
        subtitle:
          "Transparent, auditable allocation aligned with MCA standards.",
        cta: { label: "Learn More", href: "/help" },
        bg: "bg-[linear-gradient(120deg,#0052A5_0%,#2C80D8_50%,#FF7A00_100%)]",
      },
      {
        title: "Explainable AI Matching",
        subtitle:
          "See how skills, academics and semantics contribute to your match.",
        cta: { label: "View Demo", href: "/login" },
        bg: "bg-[linear-gradient(120deg,#0052A5_0%,#0A66C2_40%,#FF7A00_100%)]",
      },
    ],
    [],
  );
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    const id = setInterval(() => api.scrollNext(), 5000);
    return () => {
      api.off("select", onSelect);
      clearInterval(id);
    };
  }, [api]);

  const [galleryFilter, setGalleryFilter] = useState<
    "All" | "Events" | "Internships" | "Awards"
  >("All");
  const images = [
    { url: "https://images.unsplash.com/photo-155183 ६०२२-d५d८८e९२१८df?q=८०&w=१२००&auto=format&fit=crop", cat: "Events" },
    { url: "https://images.unsplash.com/photo-१५२४१६८२७२३२२-५fdf०३f१c६b५?q=८०&w=१२००&auto=format&fit=crop", cat: "Internships" },
    { url: "https://images.unsplash.com/photo-१५२१७९११३६०६४-७९८६c२९२०२१६?q=८०&w=१२००&auto=format&fit=crop", cat: "Awards" },
    { url: "https://images.unsplash.com/photo-१५२३५८०८४६०११-d३a५bc२५७०२b?q=८०&w=१२००&auto=format&fit=crop", cat: "Events" },
    { url: "https://images.unsplash.com/photo-१५१३२५८४९६०९९-४८१६८०२४aec०?q=८०&w=१२००&auto=format&fit=crop", cat: "Internships" },
    { url: "https://images.unsplash.com/photo-१५५१८३६०२२-४c४d९a३b०b९७?q=८०&w=१२००&auto=format&fit=crop", cat: "Awards" },
  ];
  const filtered = images.filter((i) => galleryFilter === "All" || i.cat === galleryFilter);

  const partners = [
    { name: "MCA", src: "/placeholder.svg" },
    { name: "AICTE", src: "/placeholder.svg" },
    { name: "NIC", src: "/placeholder.svg" },
    { name: "IIT", src: "/placeholder.svg" },
    { name: "IIM", src: "/placeholder.svg" },
    { name: "PSU", src: "/placeholder.svg" },
  ];

  const upcoming = [
    { date: "Nov 20, 2025", title: "AI Readiness Workshop", desc: "Hands-on session for resume scoring and profile completion.", cta: "Register" },
    { date: "Dec 05, 2025", title: "Employer Onboarding", desc: "Guidelines for fair postings and explainable shortlisting.", cta: "Register" },
  ];
  const past = [
    { date: "Oct 02, 2025", title: "Gandhi Jayanti Hackathon", desc: "Innovation sprint on civic-tech internships." },
    { date: "Sep 15, 2025", title: "Engineers Day Drive", desc: "Nationwide internship awareness campaign." },
  ];

  return (
    <main>
      {/* Slideshow */}
      <section className="bg-white">
        <div className="container mx-auto pt-8 md:pt-10">
          <div className="relative">
            <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
              <CarouselContent>
                {slides.map((s, i) => (
                  <CarouselItem key={i}>
                    <div className={`rounded-2xl ${s.bg} text-white p-10 md:p-16 shadow-lg border overflow-hidden`}>
                      <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-bold">{s.title}</h2>
                        <p className="mt-3 text-white/90 text-lg">{s.subtitle}</p>
                        <Link to={s.cta.href} className="btn bg-white text-primary mt-6">{s.cta.label}</Link>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/90 text-primary border-white/70 hover:bg-white" />
              <CarouselNext className="bg-white/90 text-primary border-white/70 hover:bg-white" />
            </Carousel>
            <div className="mt-4 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    selected === i ? "bg-accent" : "bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl leading-tight">
              InternSetu – AI-Based Smart Allocation Engine
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              A government-grade portal under the PM Internship Scheme (MCA) to fairly match students with opportunities using AI-driven readiness scores and explainable analytics.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/apply" className="btn btn-accent">Apply Now</Link>
              <Link to="/login" className="btn bg-primary text-primary-foreground">Login</Link>
              <ResumeUploadButton />
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent"/>Fair Allocation</span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent"/>Secure & Compliant</span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent"/>Explainable AI</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-white shadow-lg border p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,#FF7A00_0,transparent_40%),radial-gradient(circle_at_80%_60%,#0052A5_0,transparent_40%)]" />
              <div className="relative grid grid-cols-2 gap-4">
                <InfoCard title="Students" text="Upload resume, complete profile, get smart recommendations." iconColor="text-primary"/>
                <InfoCard title="Companies" text="Post roles, view applicants, shortlist with AI insights." iconColor="text-accent"/>
                <InfoCard title="Admins" text="Monitor fairness, approve postings, generate reports." iconColor="text-primary"/>
                <InfoCard title="Analytics" text="Readiness gauge, skill match charts, explainable results." iconColor="text-accent"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="container mx-auto py-16">
        <h2 className="subheading">Partners</h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {partners.map((p) => (
            <div key={p.name} className="flex items-center justify-center rounded-xl border bg-white p-4 shadow-sm">
              <img src={p.src} alt={p.name} className="h-10 w-auto opacity-80 grayscale hover:grayscale-0 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* Scheme Overview */}
      <section className="container mx-auto py-16">
        <h2 className="subheading">Scheme Overview</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl">AI Allocation Engine</h3>
            <p className="mt-2 text-muted-foreground">Matches students to internships using readiness score, skills, academics and semantic fit for transparency and equity.</p>
          </div>
          <div className="card">
            <h3 className="text-xl">Student-Centric</h3>
            <p className="mt-2 text-muted-foreground">Guided profile completion, resume scoring, skill-gap analysis and learning links to improve eligibility.</p>
          </div>
          <div className="card">
            <h3 className="text-xl">Trust & Compliance</h3>
            <p className="mt-2 text-muted-foreground">Secure data handling aligned with government standards, audit trails and explainable allocation decisions.</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto py-16">
        <div className="flex items-center justify-between">
          <h2 className="subheading">Gallery</h2>
          <div className="flex gap-2">
            {(["All","Events","Internships","Awards"] as const).map(cat => (
              <button key={cat} onClick={()=>setGalleryFilter(cat)} className={`px-4 py-2 rounded-full text-sm border ${galleryFilter===cat?"bg-accent text-white border-accent":"bg-white hover:bg-secondary"}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="mt-8 columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {filtered.map((img, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <img src={img.url} alt="gallery" className="mb-4 w-full rounded-xl shadow-sm border hover:opacity-90 cursor-pointer break-inside-avoid" />
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden">
                <img src={img.url} alt="expanded" className="w-full h-full object-contain" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="container mx-auto py-16">
        <h2 className="subheading">Events</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg text-primary font-semibold">Upcoming</h3>
            <div className="mt-4 space-y-4">
              {upcoming.map((e, i) => (
                <div key={i} className="rounded-xl border shadow-sm p-5 bg-white relative">
                  <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-accent" />
                  <p className="text-sm text-muted-foreground">{e.date}</p>
                  <h4 className="text-xl mt-1">{e.title}</h4>
                  <p className="mt-1 text-muted-foreground">{e.desc}</p>
                  <Link to="#" className="btn btn-accent mt-3 w-fit">{e.cta}</Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg text-primary font-semibold">Past</h3>
            <div className="mt-4 space-y-4">
              {past.map((e, i) => (
                <div key={i} className="rounded-xl border shadow-sm p-5 bg-white">
                  <p className="text-sm text-muted-foreground">{e.date}</p>
                  <h4 className="text-xl mt-1">{e.title}</h4>
                  <p className="mt-1 text-muted-foreground">{e.desc}</p>
                  <Link to="#" className="btn bg-secondary mt-3 w-fit">Details</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-secondary">
        <div className="container mx-auto py-12 grid md:grid-cols-3 gap-6">
          <ActionCard title="Student Login/Signup" link="/login" btn="Proceed" desc="Login with email/phone. OTP/Aadhaar option supported." />
          <ActionCard title="Company Portal" link="/company" btn="Post Roles" desc="Create roles, manage applicants, submit feedback." />
          <ActionCard title="Admin Console" link="/admin" btn="Open" desc="Monitor applications, fairness, approve postings." />
        </div>
      </section>

      {/* 2. ADD THE NEW MAP SECTION */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
        <div className="container mx-auto">
          <h2 className="subheading text-center">Internship Opportunities Across India</h2>
          <p className="mt-2 text-center text-muted-foreground">Click on a state to explore available roles and statistics.</p>
        </div>
        <InteractiveMap />
      </section>

      {/* Help & Contact */}
      <section className="container mx-auto py-16">
        <h2 className="subheading">Help & Contact</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg">Support</h3>
            <p className="mt-2 text-muted-foreground">For portal help and technical queries.</p>
            <a href="mailto:support@internsetu.gov.in" className="mt-4 inline-block text-primary font-semibold hover:underline">support@internsetu.gov.in</a>
          </div>
          <div className="card">
            <h3 className="text-lg">Helpline</h3>
            <p className="mt-2 text-muted-foreground">Mon–Fri, 9:00 AM – 6:00 PM IST</p>
            <p className="mt-4 font-semibold">1800-000-000</p>
          </div>
          <div className="card">
            <h3 className="text-lg">Reference</h3>
            <p className="mt-2 text-muted-foreground">Styling inspired by the official portal.</p>
            <a href="https://pminternship.mca.gov.in/login/" target="_blank" rel="noreferrer" className="mt-4 inline-block text-primary font-semibold hover:underline">Visit reference website</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, text, iconColor }: { title: string; text: string; iconColor?: string }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ${iconColor}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 6v12M6 12h12"/></svg>
      </div>
      <h3 className="mt-3 text-lg">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function ActionCard({ title, desc, link, btn }: { title: string; desc: string; link: string; btn: string }) {
  return (
    <div className="card flex flex-col">
      <h3 className="text-xl">{title}</h3>
      <p className="mt-2 text-muted-foreground flex-1">{desc}</p>
      <Link to={link} className="mt-4 btn btn-accent w-fit">{btn}</Link>
    </div>
  );
}

// 3. REMOVED the unused StatCard and StateSelector functions