import { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckCircle, ArrowRight, ChevronRight, X } from 'lucide-react'
import './App.css'

function App() {
  const [skips, setSkips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [postcode, setPostcode] = useState('NR32')
  const [area, setArea] = useState('Lowestoft')
  const [activeStep, setActiveStep] = useState(3)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSkip, setSelectedSkip] = useState(null)

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`)
        setSkips(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch skip data. Please try again.')
        setLoading(false)
        console.error('Error fetching skips:', err)
      }
    }

    fetchSkips()
  }, [postcode, area])

  const mockSkips = [
    { id: 17933, size: 4, hire_period_days: 14, price_before_vat: 278, vat: 20, allowed_on_road: true, allows_heavy_waste: true },
    { id: 17934, size: 6, hire_period_days: 14, price_before_vat: 305, vat: 20, allowed_on_road: true, allows_heavy_waste: true },
    { id: 17935, size: 8, hire_period_days: 14, price_before_vat: 375, vat: 20, allowed_on_road: true, allows_heavy_waste: true },
    { id: 17936, size: 10, hire_period_days: 14, price_before_vat: 400, vat: 20, allowed_on_road: false, allows_heavy_waste: false },
    { id: 17937, size: 12, hire_period_days: 14, price_before_vat: 439, vat: 20, allowed_on_road: false, allows_heavy_waste: false },
    { id: 17938, size: 14, hire_period_days: 14, price_before_vat: 470, vat: 20, allowed_on_road: false, allows_heavy_waste: false },
  ]

  const displaySkips = skips.length > 0 ? skips : mockSkips

  const steps = [
    { id: 1, name: 'Postcode', status: activeStep > 1 ? 'completed' : activeStep === 1 ? 'active' : 'inactive' },
    { id: 2, name: 'Waste Type', status: activeStep > 2 ? 'completed' : activeStep === 2 ? 'active' : 'inactive' },
    { id: 3, name: 'Select Skip', status: activeStep === 3 ? 'active' : 'inactive' },
    { id: 4, name: 'Permit Check', status: 'inactive' },
    { id: 5, name: 'Choose Date', status: 'inactive' },
    { id: 6, name: 'Payment', status: 'inactive' },
  ]
  
  const handleSelectSkip = (skipId) => {
    const skip = displaySkips.find(s => s.id === skipId)
    setSelectedSkip(skip)
    setIsModalOpen(true)
  }
  
  const handleContinue = () => {
    console.log(`Proceeding with skip ID: ${selectedSkip.id}`)
    setIsModalOpen(false)
    // Here you would navigate to the next step
  }
  
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center ${step.status === 'completed' ? 'text-green-600' : step.status === 'active' ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="h-6 w-6 mr-2" />
                  ) : (
                    <div className={`rounded-full h-6 w-6 flex items-center justify-center mr-2 border ${step.status === 'active' ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-400'}`}>
                      {step.id}
                    </div>
                  )}
                  <span className={`hidden sm:inline-block ${step.status === 'completed' ? 'step-completed' : step.status === 'active' ? 'step-active' : 'step-inactive'}`}>
                    {step.name}
                  </span>
                </div>
                {step.id !== steps.length && (
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Skip Size</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Select the skip size that best suits your needs.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
        ) : (
          <div className="flex flex-col space-y-4">
            {displaySkips.map((skip) => (
              <div key={skip.id} className="skip-card-list bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-1/4">
                    <img 
                      src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`} 
                      alt={`${skip.size} Yard Skip`} 
                      className="w-full h-48 sm:h-full object-cover bg-gray-50"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {skip.size} Yards
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="text-xl font-semibold text-gray-900">{skip.size} Yard Skip</h3>
                      <p className="text-gray-500 mt-1">{skip.hire_period_days} day hire period</p>
                      <ul className="mt-2 text-sm text-gray-600">
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Perfect for {skip.size} yards of waste</li>
                        <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />{skip.hire_period_days} day hire included</li>
                        {skip.allowed_on_road && (
                          <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Can be placed on road</li>
                        )}
                        {skip.allows_heavy_waste && (
                          <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Suitable for heavy waste</li>
                        )}
                      </ul>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="skip-price text-2xl mb-2">£{skip.price_before_vat}</div>
                      <button 
                        onClick={() => handleSelectSkip(skip.id)} 
                        className="skip-button whitespace-nowrap"
                      >
                        Select This Skip
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      {/* Skip Details Modal */}
      {isModalOpen && selectedSkip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-gray-900">{selectedSkip.size} Yard Skip Details</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${selectedSkip.size}-yarder-skip.jpg`}
                  alt={`${selectedSkip.size} Yard Skip`}
                  className="w-20 h-20 object-cover rounded mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{selectedSkip.size} Yard Skip</h4>
                  <p className="text-gray-500">{selectedSkip.hire_period_days} day hire period</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Skip Features:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Capacity: {selectedSkip.size} cubic yards</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Hire period: {selectedSkip.hire_period_days} days</li>
                  {selectedSkip.allowed_on_road && (
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Can be placed on road</li>
                  )}
                  {selectedSkip.allows_heavy_waste && (
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Suitable for heavy waste</li>
                  )}
                </ul>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Price Breakdown:</h4>
                <div className="bg-gray-50 p-3 rounded">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Skip hire:</span>
                    <span className="text-gray-900">£{selectedSkip.price_before_vat}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">VAT ({selectedSkip.vat}%):</span>
                    <span className="text-gray-900">£{(selectedSkip.price_before_vat * selectedSkip.vat / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t border-gray-200 pt-1 mt-1">
                    <span>Total:</span>
                    <span>£{(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleContinue}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
