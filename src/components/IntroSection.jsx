import React from 'react'
import { BookOpen, Thermometer, GitBranch } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const IntroSection = () => {
    const navigate=useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl  text-gray-800 mb-4">
        <span className="text-purple-700 font-medium">OrthoVenn3</span> is a powerful tool for comparative genomics analysis, used as a web server for full genome comparisons,
        annotation, and evolutionary analysis of orthologous clusters across multiple species. It has already been used by
        thousands of users from over 60 countries.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="flex flex-col items-center text-gray-700">
          <img src='https://orthovenn3.bioinfotoolkits.net/static/show1.f36ca866.svg' alt='img' className="w-14 h-14 text-purple-700 mb-2" />
          <p>
            Two powerful orthologous gene clusters identification algorithms are provided
          </p>
        </div>
        <div className="flex flex-col items-center text-gray-700">
         <img src='https://orthovenn3.bioinfotoolkits.net/static/show2.888d5f36.svg' alt='img' className="w-14 h-14 text-purple-700 mb-2" />
          <p>
            The backend algorithm architecture has been optimized to improve analysis performance
          </p>
        </div>
        <div className="flex flex-col items-center text-gray-700">
          <img src='https://orthovenn3.bioinfotoolkits.net/static/show3.ab3ef79d.svg' alt='img' className="w-14 h-14 text-purple-700 mb-2" />
          <p>
            The interactive visualization tool has been upgraded to be more clear and intuitive
          </p>
        </div>
      </div>

      <div className="mt-12">
        <button onClick={()=>navigate('/start')} className="bg-purple-700 italic  text-white text-2xl font-bold px-10 py-3 rounded-full shadow-lg hover:bg-purple-800 transition">
          Quick Start
        </button>
      </div>
    </div>
  )
}

export default IntroSection
