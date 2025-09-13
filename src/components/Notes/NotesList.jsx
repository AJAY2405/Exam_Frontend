import React, { useEffect, useState } from "react";
import axios from "axios";
import { NOTES_API_END_POINT } from "../../utils/constants";
import { BookOpen, FileText, ExternalLink, Search } from "lucide-react";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(NOTES_API_END_POINT, {
          withCredentials: true,
        });

        let notesData = [];
        if (Array.isArray(res.data)) {
          notesData = res.data;
        } else if (Array.isArray(res.data.notes)) {
          notesData = res.data.notes;
        }

        setNotes(notesData);
        setFilteredNotes(notesData);
      } catch (err) {
        setError("⚠️ Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

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
      {/* Search Box */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredNotes.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">
            No notes found.
          </p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between border hover:shadow-lg transition"
            >
              {/* Note Title */}
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" /> {note.title}
              </h3>

              {/* Optional uploader or subtitle */}
              <p className="text-gray-600 text-sm flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-gray-500" />{" "}
                {note.uploadedBy?.fullname || "Shared Note"}
              </p>

              {/* Open PDF button */}
              <a
                href={note.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition"
              >
                <ExternalLink className="w-4 h-4" /> Open Note
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesList;
