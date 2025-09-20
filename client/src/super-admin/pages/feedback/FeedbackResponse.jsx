import React, { useState } from "react";
import { Send, AlertCircle } from "lucide-react";

const FeedbackResponse = ({ feedback, onResponseSent, onClose }) => {
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseType, setResponseType] = useState("acknowledgment");

  const responseTypes = [
    { 
      id: "acknowledgment", 
      label: "Acknowledgment", 
      icon: "✅", 
      description: "Thank the user for their feedback" 
    },
    { 
      id: "clarification", 
      label: "Clarification", 
      icon: "❓", 
      description: "Ask for more details about the issue" 
    },
    { 
      id: "resolution", 
      label: "Resolution", 
      icon: "🔧", 
      description: "Provide a solution or workaround" 
    },
    { 
      id: "update", 
      label: "Update", 
      icon: "📢", 
      description: "Inform about system updates or changes" 
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!response.trim()) {
      alert("Please enter a response");
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would typically send the response to the backend
      // For now, we'll simulate the API call
      const responseData = {
        feedbackId: feedback.id,
        response: response.trim(),
        responseType,
        timestamp: new Date().toISOString(),
        adminId: "current_admin_id" // This would come from auth context
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call the callback to update the parent component
      onResponseSent(responseData);
      
      // Close the modal
      onClose();
      
    } catch (error) {
      console.error('Error sending response:', error);
      alert('failed to send response. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 bg-green-100';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-100';
    if (rating >= 2) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      overall: '⭐',
      user_interface: '🎨',
      features: '⚙️',
      performance: '⚡',
      support: '🆘',
      security: '🔒',
      mobile: '📱',
      integration: '🔗'
    };
    return icons[category] || '⭐';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Respond to Feedback</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Original Feedback */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Original Feedback</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(feedback.category || 'overall')}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {feedback.category || 'Overall Experience'}
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(feedback.rating)}`}>
                  {feedback.rating}★
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(feedback.date).toLocaleDateString()}
                </span>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>School:</strong> {feedback.name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Experience:</strong> {feedback.optioni}
                </p>
                {feedback.commenti && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Comment:</p>
                    <p className="text-sm text-gray-600 bg-white p-3 rounded border">
                      {feedback.commenti}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Response Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Response Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {responseTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setResponseType(type.id)}
                    className={`p-3 text-left border rounded-lg transition-colors ${
                      responseType === type.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{type.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{type.label}</p>
                        <p className="text-xs text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Response Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Response <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {response.length}/1000 characters
              </p>
            </div>

            {/* Response Guidelines */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Response Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Be professional and courteous</li>
                    <li>• Address the specific concerns raised</li>
                    <li>• Provide actionable information when possible</li>
                    <li>• Thank the user for their feedback</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !response.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Response</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackResponse;
