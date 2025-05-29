import React, { useState } from 'react';
import Layout from '../layout/Layout';

const StartPage = () => {
  const [activeTab, setActiveTab] = useState('database');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState([]);
  const [file, setFile] = useState(null);
  const [speciesName, setSpeciesName] = useState('');
  
  // Sample species data
  const speciesData = {
    Bacteria: ['Absiella doldrium', 'Achromobacter xylosoxidans'],
    Fungi: ['Acetobacter cerevisiae', 'Aeromonas hydrophila'],
    Metaxoa: ['Acetobacter malorum', 'Aggregatibacter actinomycetemca'],
    Plants: ['Acetobacter posteurianus', 'Alteromonas macleodii'],
    Proisis: ['Acetobacteraceae bacterium', 'Alteromonas mediterranea'],
    Vertebrates: ['Achromobacter spanius', 'Aquifex aeolicus']
  };

  // Filter species based on search term and category
  const filteredSpecies = Object.entries(speciesData).flatMap(([category, speciesList]) => 
    speciesList
      .filter(species => 
        species.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeCategory === 'All' || category === activeCategory)
      )
      .map(species => ({ category, name: species }))
  );

  // Add species to selection
  const addSpecies = (species) => {
    if (!selectedSpecies.some(s => s.name === species.name)) {
      setSelectedSpecies([...selectedSpecies, species]);
    }
  };

  // Remove species from selection
  const removeSpecies = (speciesName) => {
    setSelectedSpecies(selectedSpecies.filter(s => s.name !== speciesName));
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // Handle adding uploaded species
  const handleAddUploadedSpecies = () => {
    if (speciesName.trim() && !selectedSpecies.some(s => s.name === speciesName)) {
      setSelectedSpecies([...selectedSpecies, { 
        name: speciesName, 
        category: 'Uploaded',
        file: file?.name || 'No file'
      }]);
      setSpeciesName('');
      setFile(null);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`px-4 sm:px-6 py-3 font-medium text-base sm:text-lg ${
              activeTab === 'database'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('database')}
          >
            From Database
          </button>
          <button
            className={`px-4 sm:px-6 py-3 font-medium text-base sm:text-lg ${
              activeTab === 'upload'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Upload File
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="w-full lg:w-2/3">
            {activeTab === 'database' ? (
              <DatabaseView 
                speciesData={speciesData}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredSpecies={filteredSpecies}
                addSpecies={addSpecies}
              />
            ) : (
              <UploadView 
                file={file}
                speciesName={speciesName}
                setSpeciesName={setSpeciesName}
                handleFileUpload={handleFileUpload}
                handleAddUploadedSpecies={handleAddUploadedSpecies}
              />
            )}

      
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3">
            {/* Added Species Section */}
            <AddedSpecies 
              selectedSpecies={selectedSpecies} 
              removeSpecies={removeSpecies} 
            />
            <AnalysisConfig />
            <TaskInfo />
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Database View Component
const DatabaseView = ({ 
  speciesData, 
  activeCategory, 
  setActiveCategory, 
  searchTerm, 
  setSearchTerm,
  filteredSpecies,
  addSpecies
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-4">Input species keyword or tap to select</h3>
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search species..."
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 py-2">
        {['All', ...Object.keys(speciesData)].map(category => (
          <button
            key={category}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Species Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {filteredSpecies.map((species, index) => (
          <div 
            key={index} 
            className="border rounded-lg p-3 cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => addSpecies(species)}
          >
            <div className="font-medium">{species.name}</div>
            <div className="text-sm text-gray-600">{species.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Upload View Component
const UploadView = ({ 
  file, 
  speciesName, 
  setSpeciesName, 
  handleFileUpload,
  handleAddUploadedSpecies
}) => {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Species name</h3>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg"
          value={speciesName}
          onChange={(e) => setSpeciesName(e.target.value)}
          placeholder="Enter species name"
        />
      </div>
      
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">fasta file</h3>
        <label 
          htmlFor="file-upload" 
          className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
        >
          {file ? (
            <div className="text-center">
              <p className="font-medium text-blue-600">{file.name}</p>
              <p className="text-sm text-gray-500 mt-1">Click to change file</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">Drop fasta file here or Tap to upload.</p>
              <p className="text-sm text-gray-500 mt-1">Supports .fasta, .fa formats</p>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".fasta,.fa"
            onChange={handleFileUpload}
          />
        </label>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          onClick={handleAddUploadedSpecies}
          disabled={!speciesName.trim() || !file}
        >
          Add to Analysis List
        </button>
        
        <div className="flex gap-4 text-blue-600 text-sm sm:text-base">
          <a href="#" className="hover:underline">Input file format?</a>
          <a href="#" className="hover:underline">Download Example File</a>
        </div>
      </div>
    </div>
  );
};

// Added Species Component
const AddedSpecies = ({ selectedSpecies, removeSpecies }) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium">Added Species</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {selectedSpecies.length} selected
        </span>
      </div>
      
      {selectedSpecies.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No species selected yet</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto p-1">
          {selectedSpecies.map((species, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center bg-white border rounded-lg p-3 hover:shadow-sm transition-shadow"
            >
              <div>
                <div className="font-medium">{species.name}</div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    {species.category}
                  </span>
                  {species.file && (
                    <span className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-xs">
                      {species.file}
                    </span>
                  )}
                </div>
              </div>
              <button 
                onClick={() => removeSpecies(species.name)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Remove species"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Analysis Config Component (unchanged)
const AnalysisConfig = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Analysis Config:</h3>
      <div className="space-y-4">
        {/* Orthologous Analysis */}
        <div className="border rounded-lg p-4">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="mr-3 h-5 w-5" />
            <span className="font-medium">Orthologous analysis</span>
          </label>
          
          <div className="ml-8 mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Algorithm</label>
              <select className="w-full p-2 border rounded">
                <option>OrthoMCL algorithm</option>
                <option>Orthofinder algorithm</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-1">E-value</label>
              <input 
                type="text" 
                defaultValue="1e-2" 
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block mb-1">Inflation value</label>
              <input 
                type="text" 
                defaultValue="1.50" 
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span>Enable Annotation</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span>Protein similarity</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span>Cluster relationship network</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Other Analyses */}
        {['Phylogenetic analysis', 'Collinearity analysis', 'Expansions and contractions analysis'].map((analysis) => (
          <div key={analysis} className="border rounded-lg p-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-3 h-5 w-5" />
              <span>{analysis}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Task Info Component (unchanged)
const TaskInfo = () => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Task Name:</label>
          <input
            type="text"
            placeholder="Please input your task name"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-2">E-Mail:</label>
          <input
            type="email"
            placeholder="Please input your email"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      
      {/* Start Button */}
      <div className="text-center mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
          Start Analysis
        </button>
      </div>
    </div>
  );
};

export default StartPage;