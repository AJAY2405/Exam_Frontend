import React from "react";

const teachers = [
  {
    id: 1,
    name: "Mr. Shivam Sahani",
    subject: "Mathematics / English",
    qualification: "B.Sc , M.Sc",
    image: "/Images/teacher1.jpg",
  },
  {
    id: 2,
    name: "Mr. Ramkaran Sahani",
    subject: "Physics / Social Science",
    qualification: "M.Sc",
    image: "/Images/teacher2.jpg",
  },
  {
    id: 3,
    name: "Mr. Raj Sahani",
    subject: "Science / Hindi",
    qualification: "B.A , M.A  Politechnic [civil]",
    image: "/Images/teacher3.jpg",
  },
  {
    id: 4,
    name: "Mr. Nirbhay Sahani",
    subject: "Hindi / General Knowledge",
    qualification: "B.A [Hindi] , BTC",
    image: "/Images/teacher4.jpg",
  },
];

const achievers = [
  {
    id: 1,
    name: "Priya Singh",
    achievement: "CHS Topper 2024",
    qualification: "96%",
    image: "/images/topper1.jpg",
  },
  {
    id: 2,
    name: "Ravi Kumar",
    achievement: "UP Board Rank 1",
    qualification: "98%",
    image: "/images/topper2.jpg",
  },
  {
    id: 3,
    name: "Amit Verma",
    achievement: "JNV Selection",
    qualification: "Selected Student",
    image: "/images/topper3.jpg",
  },
  {
    id: 4,
    name: "Ajay Yadav",
    achievement: "JNV Selection",
    qualification: "Selected Student",
    image: "/images/topper3.jpg",
  },
  {
    id: 5,
    name: "Aashish Kumar",
    achievement: "JNV Selection",
    qualification: "Selected Student",
    image: "/images/topper3.jpg",
  },
  {
    id: 6,
    name: "Anup Sahanai",
    achievement: "JNV Selection",
    qualification: "Selected Student",
    image: "/images/topper3.jpg",
  },
];

function HomeSection() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-blue-50 px-4 sm:px-6 md:px-8 py-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4 px-2">
        <h1
          className="font-bold text-blue-700 leading-snug text-center 
             text-xl xs:text-2xl sm:text-3xl md:text-4xl 
             break-words whitespace-normal mt-8"
        >
          🏫 Mangaldeep <br className="block sm:hidden" /> Academy
        </h1>

        <p className="max-w-3xl mx-auto text-gray-600 text-base sm:text-lg md:text-xl">
          We prepare students for CHS, UP Board, CBSE, Bihar Board, and JNV with
          dedicated guidance, expert faculty, and modern teaching methods.
        </p>
      </section>

      {/* Teachers Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          👩‍🏫 Our Teachers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mx-auto mb-4 border-4 border-blue-500"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {teacher.name}
              </h3>
              <p className="text-blue-600 font-medium">{teacher.subject}</p>
              <p className="text-gray-500 text-sm sm:text-base">
                {teacher.qualification}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Thought Section */}
      <section className="bg-blue-100 px-4 sm:px-8 py-6 sm:py-8 rounded-xl shadow-md text-center">
        <blockquote className="text-lg sm:text-xl md:text-2xl italic text-gray-800">
          “Education is the most powerful weapon which you can use to change the
          world.”
          <span className="block mt-2 font-semibold">– Nelson Mandela</span>
        </blockquote>
      </section>

      {/* Achievements Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
          🏆 Our Achievers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievers.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={student.image}
                alt={student.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mx-auto mb-4 border-4 border-yellow-500"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                {student.name}
              </h3>
              <p className="text-yellow-600 font-medium">
                {student.achievement}
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                {student.qualification}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeSection;
