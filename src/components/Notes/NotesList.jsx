import React, { useEffect, useState } from "react";
import axios from "axios";
import { NOTES_API_END_POINT } from "../../utils/constants";
import { FileText, Download, User } from "lucide-react"; // ✅ nice icons

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(NOTES_API_END_POINT, {
          withCredentials: true,
        });

        if (Array.isArray(res.data)) {
          setNotes(res.data);
        } else if (Array.isArray(res.data.notes)) {
          setNotes(res.data.notes);
        } else {
          setNotes([]);
        }
      } catch (err) {
        setError("⚠️ Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        ⏳ Loading notes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 mt-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FileText className="w-7 h-7 text-blue-600" /> Available Notes
        </h2>

        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">No notes available yet.</p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {notes.map((note) => (
              <li
                key={note._id}
                className="border border-gray-200 rounded-xl shadow-sm bg-gray-50 p-4 flex flex-col justify-between hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  {note.uploadedBy?.fullname || "Unknown"}
                </p>
                <a
                  href={note.pdfUrl}
                  target="_blank" // open in new tab
                  rel="noopener noreferrer"
                  download // force browser to download instead of just viewing
                  className="flex items-center justify-center gap-2 w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotesList;
