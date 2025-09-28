import React from "react";

function About() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Logo + Title */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/Images/logo.png"
            alt="Institute Logo"
            className="w-35 h-auto mb-4 select-none"
          />
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            About Our Institute
          </h1>
          <p className="text-gray-600 mt-2">
            Excellence in Guidance for CHS • UP Board • CBSE • Bihar Board • JNV
          </p>
        </div>

        {/* Body */}
        <div className="mt-10 space-y-6 text-gray-700 leading-7">
          <p>
            Founded with a simple promise—to help every learner discover their
            fullest potential—our institute has grown into a trusted learning
            destination for students preparing for a range of academic pathways,
            including CHS (Central Hindu School) entrance, UP Board, CBSE, Bihar
            Board, and Jawahar Navodaya Vidyalaya (JNV) selection tests. We
            believe that great results emerge from consistent effort, thoughtful
            mentoring, and a classroom culture that nurtures curiosity. Over the
            years, our students have consistently achieved outstanding outcomes
            in board examinations and competitive school-level selections, not
            only because they studied harder, but because they learned
            smarter—with clarity, discipline, and purpose.
          </p>

          <p>
            Our mission is straightforward: to deliver high-quality, affordable,
            and ethical education that strengthens fundamentals, builds
            confidence, and inspires character. We aim to serve families who
            value long-term growth over shortcuts, and students who are ready to
            take ownership of their learning. Whether a child is targeting
            admission to CHS, competing for a coveted seat in JNV, or striving
            to excel in UP Board, CBSE, or Bihar Board examinations, our
            academic ecosystem is designed to meet them where they are and to
            guide them towards where they aspire to be.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">Our Values</h2>
          <p>
            At the heart of our institute are four values that shape every
            class, assessment, and conversation: integrity, mastery, empathy,
            and resilience. Integrity means doing the right thing even when no
            one is watching—from attendance and homework to exam conduct and
            feedback. Mastery is a commitment to understanding concepts deeply
            rather than memorizing them superficially. Empathy keeps our
            classrooms kind and inclusive, ensuring that every student feels
            seen and supported. Resilience helps learners approach challenges
            with courage, recover from mistakes, and keep moving forward with
            determination.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Programs We Offer
          </h2>
          <p>
            Our programs are aligned with the learning objectives and assessment
            styles of different boards and selection tests:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">CHS Preparation:</span> We focus
              on subject fundamentals, speed and accuracy, and real-exam
              temperament using curated practice sheets and simulated tests. Our
              mentors provide targeted strategies to strengthen weak topics
              while sharpening strengths.
            </li>
            <li>
              <span className="font-semibold">UP Board & Bihar Board:</span> Our
              approach honors the distinctive patterns of state boards while
              elevating conceptual clarity. We combine crisp theory notes,
              question banks, previous-year solutions, and structured revision.
            </li>
            <li>
              <span className="font-semibold">CBSE Curriculum Support:</span>{" "}
              With its conceptual rigor and application-oriented questions, CBSE
              demands understanding over rote learning. We emphasize NCERT
              mastery, exemplar practice, and exam writing skills.
            </li>
            <li>
              <span className="font-semibold">JNV Selection:</span> For Navodaya
              entrance, we design a focused, age-appropriate program that builds
              the analytical skills, reasoning habits, and test confidence
              required for success.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Teaching Philosophy
          </h2>
          <p>
            We teach for understanding. Each lesson is planned to move from
            concrete to abstract, ensuring that students can connect concepts to
            real-life examples and then apply them in new contexts. Our classes
            encourage active learning through guided practice, doubt-clearing,
            and collaborative problem solving. Assessment is not an event; it is
            a continuous loop that informs teaching and empowers students with
            feedback they can act upon. We make space for questions, celebrate
            progress, and normalize the trial-and-error process that deep
            learning requires.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Faculty & Mentoring
          </h2>
          <p>
            Our faculty bring a blend of subject expertise and classroom warmth.
            Many of our teachers are postgraduates and trained educators with
            years of experience across boards and competitive school-level
            exams. But what truly sets them apart is their ability to
            mentor—listening to students, noticing patterns in errors, and
            suggesting precise, practical improvements. We run mentor meetings
            to review progress, adjust study plans, and build habits that last:
            consistent revision, disciplined note-making, and time-bound
            practice.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Learning Resources & Support
          </h2>
          <p>
            Students receive carefully designed study material that prioritizes
            clarity over clutter: concise notes, graded worksheets, past papers,
            and chapter-end summaries. Weekly tests benchmark progress; detailed
            solutions and explanations help students learn from mistakes without
            fear. We also provide doubt sessions, parent-teacher reviews, and
            exam readiness workshops that demystify everything from filling
            answer sheets to managing nerves on test day. Our academic calendar
            balances syllabus coverage with revision cycles, ensuring that
            knowledge consolidates over time rather than piling up.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Results & Achievements
          </h2>
          <p>
            The success of our students is our proudest testimony. Year after
            year, learners from our classrooms secure admissions to CHS, earn
            top ranks in UP Board and Bihar Board, excel in CBSE assessments,
            and win seats in JNV. We share these achievements not as marketing
            trophies but as milestones in a longer journey of growth—proof that
            patient effort, honest guidance, and a supportive environment can
            transform potential into performance. We also highlight improvement
            stories: students who began with self-doubt and rose steadily
            through persistence and good study habits.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Campus Culture & Well-Being
          </h2>
          <p>
            We are intentional about the atmosphere we create. Our classrooms
            are disciplined yet friendly, competitive yet compassionate. We
            discourage unhealthy pressure and focus instead on confidence,
            curiosity, and consistency. We value punctuality, respect for peers
            and teachers, and care for the learning space. While academics are
            central, we also encourage healthy routines—sleep, nutrition,
            physical activity—because strong minds need strong bodies.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Community & Parents
          </h2>
          <p>
            Education works best as a partnership between students, parents, and
            teachers. We maintain open communication with families through
            progress updates, meetings, and actionable feedback. Parents often
            tell us they feel included and informed; they understand what their
            child is learning, how they are performing, and what small changes
            can amplify progress at home. This shared responsibility keeps
            students motivated and grounded.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">
            Admissions & Contact
          </h2>
          <p>
            We welcome students who are eager to learn and families who share
            our long-term vision. Admission typically involves a counseling
            conversation to understand academic goals and find the best-fit
            program. To know more about batches, schedules, and fees—or to visit
            our classrooms—please reach out to us. We would be delighted to show
            you how we work, introduce you to our faculty, and help you craft a
            plan that matches your ambitions.
          </p>

          <p className="mt-6">
            Thank you for considering our institute as your learning partner.
            Whether you are preparing for CHS, aiming high in UP Board, CBSE, or
            Bihar Board, or targeting JNV, we are here to support you with
            empathy, expertise, and unwavering commitment. Let’s learn deeply,
            practice consistently, and move forward—one clear concept, one
            evaluated test, and one confident step at a time.
          </p>
        </div>
        {/* Director's Signature */}
        <div className="mt-12 flex flex-col items-center text-center">
          <img
            src="/Images/signature.png" // your signature image path
            alt="Signature of Ram Karan Sir"
            className="h-20 w-auto mb-2 select-none"
          />
          <p className="text-gray-800 font-semibold">Ram Karan Sir</p>
          <p className="text-gray-600 text-sm">Director</p>
        </div>
      </div>
    </div>
  );
}

export default About;
