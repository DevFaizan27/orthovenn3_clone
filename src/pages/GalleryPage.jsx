import React, { useState } from 'react';
import Layout from '../layout/Layout';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const galleryData = [
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/fecaa1d0c7db49868b8f4437538ca699.png",
      category: "Plants",
      species: [
        "Arabidopsis thaliana",
        "Prunus persica",
        "Vitis vinifera"
      ]
    },
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/825371f2e22b4ba497e58aaa140db935.png",
      category: "Plants",
      species: [
        "Oryza nivara",
        "Oryza meridionalis",
        "Triticum spelta"
      ]
    },
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/07218caf57f84763b3e788b66441e27c.png",
      category: "Fungi",
      species: [
        "Schizosaccharomyces cryophilus",
        "Rhodotorula toruloides",
        "Beauveria bassiana",
      ]
    },
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/fecaa1d0c7db49868b8f4437538ca699.png",
      category: "Plants",
      species: [
        "Arabidopsis thaliana",
        "Prunus persica",
        "Vitis vinifera"
      ]
    },
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/825371f2e22b4ba497e58aaa140db935.png",
      category: "Plants",
      species: [
        "Oryza nivara",
        "Oryza meridionalis",
        "Triticum spelta",
      ]
    },
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/07218caf57f84763b3e788b66441e27c.png",
      category: "Fungi",
      species: [
        "Schizosaccharomyces cryophilus",
        "Rhodotorula toruloides",
        "Beauveria bassiana",
        
      ]
    },
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/fecaa1d0c7db49868b8f4437538ca699.png",
      category: "Plants",
      species: [
        "Arabidopsis thaliana",
        "Prunus persica",
        "Vitis vinifera"
      ]
    },
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/825371f2e22b4ba497e58aaa140db935.png",
      category: "Plants",
      species: [
        "Oryza nivara",
        "Oryza meridionalis",
        "Triticum spelta",
      ]
    },
    {
      imageUrl: "https://minio.bioinfotoolkits.net:8443/orthovenn/image/gallery/07218caf57f84763b3e788b66441e27c.png",
      category: "Fungi",
      species: [
        "Schizosaccharomyces cryophilus",
        "Rhodotorula toruloides",
        "Beauveria bassiana"
      ]
    }
  ];

  // Get unique categories for filtering
  const categories = ['All', ...new Set(galleryData.map(item => item.category))];
  
  // Filter gallery data based on active category
  const filteredData = activeCategory === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeCategory);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">OrthoVenn Gallery</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our collection of biological Venn diagrams showcasing orthologous relationships across various species
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
              >
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="aspect-w-16 aspect-h-9 w-full h-64 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.category}
                      className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{item.category}</h3>
                      <p className="text-sm opacity-90">Click to enlarge</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 border-t border-gray-100">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {item.category}
                  </h2>
                  
                  <div className="space-y-2 mb-4">
                    {item.species.map((specie, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></div>
                        <p className="text-gray-600">{specie}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedImage(item)}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                  >
                    View Analysis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-6xl w-full max-h-[90vh] bg-gray-900 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/3 flex items-center justify-center p-8">
                  <img 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.category}
                    className="max-h-[80vh] max-w-full object-contain"
                  />
                </div>
                
                <div className="md:w-1/3 bg-gray-800 p-6 md:p-8 overflow-y-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">{selectedImage.category} Analysis</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">Species Included</h3>
                    <div className="space-y-3">
                      {selectedImage.species.map((specie, idx) => (
                        <div key={idx} className="flex items-start bg-gray-700/50 rounded-lg p-3">
                          <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                            <span className="text-white font-bold">{idx + 1}</span>
                          </div>
                          <p className="text-gray-200">{specie}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-blue-400 mb-3">Analysis Details</h3>
                    <p className="text-gray-300">
                      This Venn diagram illustrates orthologous gene clusters shared between the species. 
                      The overlapping regions represent common genes while unique regions show species-specific genes.
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Download Image
                    </button>
                    <button className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                      View Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GalleryPage;