import { Link } from "react-router-dom";
import { Upload, File, Trash2 } from "lucide-react";

export default function StudentDocuments() {
  const documents = [
    { name: "Resume.pdf", size: "2.1 MB", uploaded: "2023-04-10" },
    { name: "Certificates.zip", size: "5.8 MB", uploaded: "2023-03-22" },
    { name: "ID Proof.jpg", size: "0.5 MB", uploaded: "2023-02-15" },
  ];

  const handleUpload = () => {
    alert("This is a prototype. A file upload dialog would appear here.");
  };

  const handleDelete = (docName) => {
    alert(`This is a prototype. The document "${docName}" would be deleted.`);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">My Documents</h1>
          <button
            onClick={handleUpload}
            className="btn bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
          >
            <Upload size={16} /> Upload New
          </button>
        </div>
        
        <div className="mt-8 space-y-4">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <File size={24} className="text-gray-500" />
                  <div>
                    <p className="font-semibold">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.size} - Uploaded on {doc.uploaded}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(doc.name)}
                  className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">You have not uploaded any documents yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
