import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";

export default function ResumeUploadButton({ asLink }: { asLink?: boolean }) {
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onPick = (f: File) => {
    setFile(f);
    // simple client-side score heuristic
    const ext = f.name.toLowerCase().split(".").pop() || "";
    const typeBoost = ext === "pdf" ? 15 : ext === "docx" || ext === "doc" ? 10 : 0;
    const sizeKb = f.size / 1024;
    // ideal size between 80KB and 1500KB
    const sizeScore = Math.max(0, 100 - Math.abs(300 - Math.min(2000, sizeKb)) / 300 * 40);
    const base = 50 + typeBoost + Math.min(35, sizeScore);
    setScore(Math.round(Math.min(100, Math.max(20, base))));
  };

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) onPick(f);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (f) onPick(f);
  };

  const startUpload = async () => {
    if (!file) return;
    setUploading(true);
    await new Promise((r) => setTimeout(r, 900));
    setUploading(false);
  };

  const trigger = (
    <button
      className={`btn ${asLink ? "btn-accent" : "btn btn-accent"}`}
      onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
    >
      Upload Resume / CV
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        {!isLoggedIn ? (
          <div>
            <h3 className="text-2xl">Please login first to upload your resume.</h3>
            <p className="mt-2 text-muted-foreground">
              You need an account to securely upload and score your resume.
            </p>
            <div className="mt-6 flex gap-3 justify-end">
              <button className="btn bg-secondary" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn btn-accent" onClick={() => navigate("/login")}>Login Now</button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl">Upload your resume</h3>
            <p className="mt-1 text-sm text-muted-foreground">Accepted formats: PDF, DOCX</p>
            <div
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              className="mt-4 border-2 border-dashed rounded-xl p-6 text-center hover:bg-secondary/50"
            >
              <input id="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={onChange} className="hidden" />
              <label htmlFor="resume" className="btn bg-white text-primary border">Choose File</label>
              <p className="mt-2 text-sm text-muted-foreground">or drag & drop here</p>
              {file && (
                <div className="mt-4 text-left">
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size/1024).toFixed(0)} KB</p>
                </div>
              )}
            </div>
            {score !== null && (
              <div className="mt-5">
                <p className="text-sm font-medium">Resume Score</p>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${score}%` }} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{score}/100</p>
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button className="btn bg-secondary" onClick={() => setOpen(false)}>Close</button>
              <button disabled={!file || uploading} className="btn btn-accent" onClick={startUpload}>{uploading?"Processing...":"Process Score"}</button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
