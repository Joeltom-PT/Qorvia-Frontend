import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';

// Types
interface EventType {
  id: string;
  name: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
}

interface EventFormData {
  name: string;
  category: SelectOption | null;
  type: string;
  description: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const EventDetails: React.FC = () => {
  // Convert categories to react-select options format
  const categories: Category[] = [
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Business' },
    { id: '3', name: 'Design' },
    { id: '4', name: 'Marketing' },
    { id: '5', name: 'Education' },
    { id: '6', name: 'Healthcare' },
    { id: '7', name: 'Entertainment' },
    { id: '8', name: 'Sports' },
    // Add more categories as needed
  ];

  const categoryOptions: SelectOption[] = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  // States for form fields
  const [formData, setFormData] = useState<EventFormData>({
    name: '',
    category: null,
    type: '',
    description: ''
  });

  // Mock event types data
  const eventTypes: EventType[] = [
    { id: '1', name: 'Conference', image: '/api/placeholder/100/100' },
    { id: '2', name: 'Workshop', image: '/api/placeholder/100/100' },
    { id: '3', name: 'Webinar', image: '/api/placeholder/100/100' },
    { id: '4', name: 'Meetup', image: '/api/placeholder/100/100' }
  ];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const handleCategoryChange = (selectedOption: SelectOption | null) => {
    setFormData(prev => ({ ...prev, category: selectedOption }));
  };

  // Handle event type selection
  const handleTypeSelect = (typeId: string) => {
    setFormData(prev => ({ ...prev, type: typeId }));
  };

  // Handle description change
  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
      '&:hover': {
        borderColor: '#3B82F6'
      }
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#3B82F6' 
        : state.isFocused 
          ? '#EFF6FF'
          : 'transparent',
      color: state.isSelected ? 'white' : '#374151',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#2563EB'
      }
    }),
    input: (base: any) => ({
      ...base,
      color: '#374151'
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    })
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter event name"
          />
        </div>

        {/* Category Select with Search using react-select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Category
          </label>
          <Select
            value={formData.category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            styles={selectStyles}
            placeholder="Search categories..."
            isClearable
            isSearchable
            className="text-sm"
          />
        </div>

        {/* Event Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Event Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventTypes.map(type => (
              <div
                key={type.id}
                className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                  formData.type === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => handleTypeSelect(type.id)}
              >
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
                <p className="text-center text-sm font-medium">{type.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Description - Rich Text Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Description
          </label>
          <div className="border rounded-md">
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              theme="snow"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Next 
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventDetails;