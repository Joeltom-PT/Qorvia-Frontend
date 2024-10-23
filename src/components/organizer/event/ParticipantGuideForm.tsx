import React, { useState } from 'react';
import { Plus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import CloudinaryUpload from '../../global/CloudinaryUpload';

interface Participant {
  username: string;
  role: string;
  profileImage: string;
}

interface Guide {
  heading: string;
  content: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ParticipantGuideFormProps {
  onSubmit: (data: { participants: Participant[]; guides: Guide[] }) => void;
  onSkip: () => void;
  onPrevious: () => void;
}

const ParticipantGuideForm: React.FC<ParticipantGuideFormProps> = ({ 
  onSubmit, 
  onSkip, 
  onPrevious 
}) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  // Helper to update participants dynamically
  const updateParticipant = (index: number, field: keyof Participant, value: string): void => {
    setParticipants(prev => {
      const newParticipants = [...prev];
      newParticipants[index] = { ...newParticipants[index], [field]: value };
      return newParticipants;
    });
  };

  // Helper to update guides dynamically
  const updateGuide = (index: number, field: keyof Guide, value: string): void => {
    setGuides(prev => {
      const newGuides = [...prev];
      newGuides[index] = { ...newGuides[index], [field]: value };
      return newGuides;
    });
  };

  // Adding a new participant or guide
  const addParticipant = () => setParticipants([...participants, { username: '', role: '', profileImage: '' }]);
  const addGuide = () => setGuides([...guides, { heading: '', content: '' }]);

  // Removing a participant or guide
  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`participant${index}`];
      return newErrors;
    });
  };

  const removeGuide = (index: number) => {
    setGuides(guides.filter((_, i) => i !== index));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`guide${index}`];
      return newErrors;
    });
  };

  // Validate participants and guides
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    participants.forEach((participant, index) => {
      if (!participant.username || !participant.role || !participant.profileImage) {
        newErrors[`participant${index}`] = 'All participant fields are required';
      }
    });
    guides.forEach((guide, index) => {
      if (!guide.heading || !guide.content) {
        newErrors[`guide${index}`] = 'All guide fields are required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (participants.length === 0 && guides.length === 0) {
      onSkip();
      return;
    }
    if (validateForm()) {
      onSubmit({ participants, guides });
    }
  };

  return (
    <div className="space-y-8">
      {/* Participants Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Participants</h2>
          <button
            onClick={addParticipant}
            className="flex items-center px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
            type="button"
            aria-label="Add Participant"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Participant
          </button>
        </div>

        {participants.map((participant, index) => (
          <div key={`participant-${index}`} className="p-4 border rounded-lg">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">Participant {index + 1}</h3>
                <button
                  onClick={() => removeParticipant(index)}
                  className="p-1 hover:bg-gray-100 rounded"
                  type="button"
                  aria-label={`Remove Participant ${index + 1}`}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    value={participant.username}
                    onChange={(e) => updateParticipant(index, 'username', e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-3 py-2 border rounded-md"
                    aria-label={`Participant ${index + 1} Username`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    type="text"
                    value={participant.role}
                    onChange={(e) => updateParticipant(index, 'role', e.target.value)}
                    placeholder="Enter role"
                    className="w-full px-3 py-2 border rounded-md"
                    aria-label={`Participant ${index + 1} Role`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Profile Image</label>
                  <CloudinaryUpload
                    fixedSize={{ width: 16, height: 9 }}
                    onUploadSuccess={(url) => updateParticipant(index, 'profileImage', url)}
                    uploadMessage="Click to Upload Image"
                    aria-label={`Participant ${index + 1} Profile Image`}
                  />
                </div>
              </div>
              {errors[`participant${index}`] && (
                <p className="text-red-500 text-sm">{errors[`participant${index}`]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Guides Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Guides</h2>
          <button
            onClick={addGuide}
            className="flex items-center px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
            type="button"
            aria-label="Add Guide"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Guide
          </button>
        </div>

        {guides.map((guide, index) => (
          <div key={`guide-${index}`} className="p-4 border rounded-lg">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">Guide {index + 1}</h3>
                <button
                  onClick={() => removeGuide(index)}
                  className="p-1 hover:bg-gray-100 rounded"
                  type="button"
                  aria-label={`Remove Guide ${index + 1}`}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Heading</label>
                  <input
                    type="text"
                    value={guide.heading}
                    onChange={(e) => updateGuide(index, 'heading', e.target.value)}
                    placeholder="Enter heading"
                    className="w-full px-3 py-2 border rounded-md"
                    aria-label={`Guide ${index + 1} Heading`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <textarea
                    value={guide.content}
                    onChange={(e) => updateGuide(index, 'content', e.target.value)}
                    placeholder="Enter content"
                    className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                    aria-label={`Guide ${index + 1} Content`}
                  />
                </div>
              </div>
              {errors[`guide${index}`] && (
                <p className="text-red-500 text-sm">{errors[`guide${index}`]}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <button
          onClick={onPrevious}
          className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50"
          type="button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-50"
          type="button"
        >
          {participants.length === 0 && guides.length === 0 ? 'Skip' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ParticipantGuideForm;
