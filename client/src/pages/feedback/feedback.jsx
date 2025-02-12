import React from "react"
import { useState } from "react"
import { Star, Send } from "lucide-react"
import api from "../../services/apiServices"
import toast, { Toaster } from "react-hot-toast"

export default function FeedbackForm() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [selectedOption, setSelectedOption] = useState("")

  const onSubmit = async (data) => {
    try {
      const res = await api.insertFeedback(data);
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
    finally {
      setRating(0);
      setComment("");
      setSelectedOption("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ rating, comment, selectedOption });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-20">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full space-y-8 transform transition-all duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-center text-gray-600 mb-6" style={{fontFamily: "'Poppins', sans-serif"}}>Your Feedback Matters</h2>

        {/* Star Rating */}
        <div className="space-y-2">
          <label className="block text-md font-medium text-gray-700">How would you rate your experience?</label>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition-colors duration-200 ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Text Area for Comments */}
        <div className="space-y-2">
          <label htmlFor="comment" className="block text-md font-medium text-gray-700">
            Tell us more about your experience
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
            placeholder="Your comments here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        {/* Multiple Choice */}
        <div className="space-y-2">
          <label className="block text-md font-medium text-gray-700">What best describes your experience?</label>
          <div className="space-y-2">
            {["Excellent", "Good", "Average", "Poor"].map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="experience"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                  className="form-radio text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <span>Submit Feedback</span>
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}