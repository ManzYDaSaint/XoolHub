import React from "react"
import { useState } from "react"
import { Star, Send, AlertCircle, CheckCircle } from "lucide-react"
import api from "../../services/apiServices"
import toast, { Toaster } from "react-hot-toast"

export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const feedbackCategories = [
    { id: "overall", label: "Overall Experience", icon: "⭐", description: "General experience with the system" },
    { id: "user_interface", label: "User Interface", icon: "🎨", description: "Design, navigation, and usability" },
    { id: "features", label: "Features & Functionality", icon: "⚙️", description: "Available features and their effectiveness" },
    { id: "performance", label: "Performance", icon: "⚡", description: "Speed, reliability, and responsiveness" },
    { id: "support", label: "Support & Help", icon: "🆘", description: "Customer support and documentation" },
    { id: "security", label: "Security & Privacy", icon: "🔒", description: "Data protection and security measures" },
    { id: "mobile", label: "Mobile Experience", icon: "📱", description: "Mobile app or responsive design" },
    { id: "integration", label: "Integration", icon: "🔗", description: "Third-party integrations and APIs" }
  ]

  const experienceOptions = [
    { value: "excellent", label: "Excellent", color: "text-green-600", bgColor: "bg-green-50" },
    { value: "good", label: "Good", color: "text-blue-600", bgColor: "bg-blue-50" },
    { value: "average", label: "Average", color: "text-yellow-600", bgColor: "bg-yellow-50" },
    { value: "poor", label: "Poor", color: "text-orange-600", bgColor: "bg-orange-50" },
    { value: "very_poor", label: "Very Poor", color: "text-red-600", bgColor: "bg-red-50" }
  ]

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const res = await api.insertFeedback(data);
      if (res.data.success === true) {
        toast.success(res.data.message);
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          resetForm()
        }, 3000)
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("failed to submit feedback");
    }
    finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setRating(0);
    setComment("");
    setSelectedCategory("");
    setSelectedOption("");
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!rating || !selectedCategory || !selectedOption) {
      toast.error("Please fill in all required fields");
      return
    }
    onSubmit({ 
      rating, 
      comment, 
      selectedOption, 
      category: selectedCategory,
      timestamp: new Date().toISOString()
    });
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 mt-20">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your feedback has been submitted successfully. We appreciate your input!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
            Share Your Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us improve XoolHub by sharing your experience. Your feedback is valuable to us and helps us make the system better for all schools.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-8"
        >
          {/* Feedback Category Selection */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800">
              What would you like to provide feedback about? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feedbackCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "border-indigo-500 bg-indigo-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">{category.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800">
              How would you rate your experience? <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={40}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer transition-all duration-200 ${
                    rating >= star ? "text-yellow-400 scale-110" : "text-gray-300 hover:text-yellow-200"
                  }`}
                />
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-gray-600">
                {rating === 1 && "Very Poor"}
                {rating === 2 && "Poor"}
                {rating === 3 && "Average"}
                {rating === 4 && "Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Experience Options */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800">
              What best describes your overall experience? <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {experienceOptions.map((option) => (
                <label
                  key={option.value}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOption === option.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="experience"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={() => setSelectedOption(option.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedOption === option.value ? "bg-indigo-500" : "bg-gray-300"
                    }`}></div>
                    <span className={`font-medium ${option.color}`}>{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <label htmlFor="comment" className="block text-lg font-semibold text-gray-800">
              Additional Comments (Optional)
            </label>
            <textarea
              id="comment"
              rows={5}
              className="w-full px-4 py-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none transition-all duration-200"
              placeholder="Tell us more about your experience, suggestions for improvement, or any specific issues you encountered..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              {comment.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !rating || !selectedCategory || !selectedOption}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span className="font-semibold">Submit Feedback</span>
                </>
              )}
            </button>
          </div>

          {/* Privacy Note */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-gray-500 mt-0.5" />
              <p className="text-sm text-gray-600">
                Your feedback is anonymous and will be used solely to improve our services. 
                We respect your privacy and will not share your personal information.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}