// AI Utilities for Enhanced Telegram Bot
// Provides NLP, sentiment analysis, and automated insights

const nlp = require('compromise');
const sentiment = require('sentiment');
const natural = require('natural');

// Initialize sentiment analyzer
const sentimentAnalyzer = new sentiment();

// Initialize classifiers
const reportClassifier = new natural.BayesClassifier();
const intentClassifier = new natural.BayesClassifier();

// Train classifiers with sample data
function initializeClassifiers() {
  // Train report classifier
  reportClassifier.addDocument('student performance declining', 'academic_concern');
  reportClassifier.addDocument('grades dropping', 'academic_concern');
  reportClassifier.addDocument('failing subjects', 'academic_concern');
  reportClassifier.addDocument('excellent grades improvement', 'positive_feedback');
  reportClassifier.addDocument('outstanding performance', 'positive_feedback');
  reportClassifier.addDocument('improved attendance', 'positive_feedback');
  reportClassifier.addDocument('behavioral issues', 'behavioral_concern');
  reportClassifier.addDocument('disciplinary problems', 'behavioral_concern');
  reportClassifier.addDocument('attendance problems', 'attendance_concern');
  reportClassifier.addDocument('frequent absences', 'attendance_concern');
  
  // Train intent classifier
  intentClassifier.addDocument('how is my child doing', 'academic_inquiry');
  intentClassifier.addDocument('what are the grades', 'academic_inquiry');
  intentClassifier.addDocument('show me results', 'academic_inquiry');
  intentClassifier.addDocument('attendance record', 'attendance_inquiry');
  intentClassifier.addDocument('is my child present', 'attendance_inquiry');
  intentClassifier.addDocument('fee balance', 'financial_inquiry');
  intentClassifier.addDocument('payment status', 'financial_inquiry');
  intentClassifier.addDocument('talk to teacher', 'communication_request');
  intentClassifier.addDocument('contact administrator', 'communication_request');
  intentClassifier.addDocument('schedule meeting', 'communication_request');
  
  reportClassifier.train();
  intentClassifier.train();
}

// Initialize classifiers on module load
initializeClassifiers();

/**
 * Analyze text sentiment and extract key information
 */
function analyzeText(text) {
  try {
    const doc = nlp(text);
    const sentimentResult = sentimentAnalyzer.analyze(text);
    
    // Extract entities
    const people = doc.people().out('array') || [];
    const dates = doc.match('#Date').out('array') || [];
    const topics = doc.topics().out('array') || [];
    const questions = doc.questions().out('array') || [];
    
    // Determine intent
    const intent = intentClassifier.classify(text);
    const intentConfidence = intentClassifier.getClassifications(text);
    
    return {
      sentiment: {
        score: sentimentResult.score,
        comparative: sentimentResult.comparative,
        positive: sentimentResult.positive,
        negative: sentimentResult.negative
      },
      entities: {
        people,
        dates,
        topics,
        questions
      },
      intent: {
        category: intent,
        confidence: intentConfidence[0]?.value || 0
      },
      processed: true
    };
  } catch (error) {
    console.error('[AI] Text analysis error:', error);
    // Fallback analysis without compromise
    const sentimentResult = sentimentAnalyzer.analyze(text);
    return {
      sentiment: { 
        score: sentimentResult.score, 
        comparative: sentimentResult.comparative, 
        positive: sentimentResult.positive || [], 
        negative: sentimentResult.negative || [] 
      },
      entities: { people: [], dates: [], topics: [], questions: [] },
      intent: { category: 'unknown', confidence: 0 },
      processed: false
    };
  }
}

/**
 * Generate automated insights from student data
 */
function generateStudentInsights(studentData, academicData, attendanceData, disciplinaryData) {
  const insights = [];
  
  try {
    // Academic Performance Insights
    if (academicData && academicData.length > 0) {
      const avgScore = academicData.reduce((sum, record) => sum + (record.score || 0), 0) / academicData.length;
      const recentScores = academicData.slice(-3).map(r => r.score || 0);
      const trend = recentScores.length >= 2 ? recentScores[recentScores.length - 1] - recentScores[0] : 0;
      
      if (avgScore >= 80) {
        insights.push({
          type: 'positive',
          category: 'academic',
          message: `🎉 Excellent academic performance! Average score: ${avgScore.toFixed(1)}%`,
          recommendation: 'Keep up the great work! Consider advanced courses.'
        });
      } else if (avgScore >= 60) {
        insights.push({
          type: 'neutral',
          category: 'academic',
          message: `📚 Good academic progress. Average score: ${avgScore.toFixed(1)}%`,
          recommendation: 'Continue working hard. Consider additional support in weaker subjects.'
        });
      } else {
        insights.push({
          type: 'concern',
          category: 'academic',
          message: `⚠️ Academic performance needs attention. Average score: ${avgScore.toFixed(1)}%`,
          recommendation: 'Consider tutoring or additional support. Schedule meeting with teacher.'
        });
      }
      
      if (trend > 5) {
        insights.push({
          type: 'positive',
          category: 'trend',
          message: '📈 Improving academic performance trend detected!',
          recommendation: 'Great progress! Continue current study habits.'
        });
      } else if (trend < -5) {
        insights.push({
          type: 'concern',
          category: 'trend',
          message: '📉 Declining academic performance trend detected.',
          recommendation: 'Schedule meeting with teacher to discuss support strategies.'
        });
      }
    }
    
    // Attendance Insights
    if (attendanceData && attendanceData.length > 0) {
      const recentAttendance = attendanceData.slice(-10);
      const presentCount = recentAttendance.filter(a => a.status === 'present').length;
      const attendanceRate = (presentCount / recentAttendance.length) * 100;
      
      if (attendanceRate >= 95) {
        insights.push({
          type: 'positive',
          category: 'attendance',
          message: `✅ Excellent attendance record! ${attendanceRate.toFixed(1)}% present`,
          recommendation: 'Outstanding attendance! This contributes to academic success.'
        });
      } else if (attendanceRate >= 80) {
        insights.push({
          type: 'neutral',
          category: 'attendance',
          message: `📅 Good attendance record. ${attendanceRate.toFixed(1)}% present`,
          recommendation: 'Maintain good attendance. Regular attendance improves learning outcomes.'
        });
      } else {
        insights.push({
          type: 'concern',
          category: 'attendance',
          message: `⚠️ Attendance needs improvement. ${attendanceRate.toFixed(1)}% present`,
          recommendation: 'Regular attendance is crucial for academic success. Please ensure consistent school attendance.'
        });
      }
    }
    
    // Disciplinary Insights
    if (disciplinaryData && disciplinaryData.length > 0) {
      const recentDisciplinary = disciplinaryData.slice(-6);
      const severeIssues = recentDisciplinary.filter(d => d.severity === 'high' || d.severity === 'critical');
      
      if (severeIssues.length > 0) {
        insights.push({
          type: 'concern',
          category: 'behavioral',
          message: `🚨 Recent disciplinary concerns detected (${severeIssues.length} serious issues)`,
          recommendation: 'Please schedule meeting with school administration to discuss behavioral support.'
        });
      } else if (recentDisciplinary.length > 0) {
        insights.push({
          type: 'neutral',
          category: 'behavioral',
          message: `📝 Some minor behavioral notes (${recentDisciplinary.length} records)`,
          recommendation: 'Continue positive behavior. Consider discussing expectations at home.'
        });
      }
    }
    
    // Overall Assessment
    const positiveInsights = insights.filter(i => i.type === 'positive').length;
    const concernInsights = insights.filter(i => i.type === 'concern').length;
    
    if (concernInsights === 0 && positiveInsights > 0) {
      insights.push({
        type: 'positive',
        category: 'overall',
        message: '🌟 Overall excellent performance across all areas!',
        recommendation: 'Your child is doing exceptionally well. Continue current support and encouragement.'
      });
    } else if (concernInsights > 2) {
      insights.push({
        type: 'concern',
        category: 'overall',
        message: '⚠️ Multiple areas need attention. Early intervention recommended.',
        recommendation: 'Please schedule comprehensive meeting with school team to develop support plan.'
      });
    }
    
  } catch (error) {
    console.error('[AI] Insights generation error:', error);
    insights.push({
      type: 'neutral',
      category: 'system',
      message: '📊 Generating insights...',
      recommendation: 'Please check back later for detailed analysis.'
    });
  }
  
  return insights;
}

/**
 * Generate personalized recommendations based on analysis
 */
function generateRecommendations(analysis, insights) {
  const recommendations = [];
  
  try {
    // Based on sentiment
    if (analysis.sentiment.score < -2) {
      recommendations.push({
        type: 'support',
        message: '💬 Consider scheduling a meeting to discuss concerns',
        priority: 'high'
      });
    }
    
    // Based on insights
    const concerns = insights.filter(i => i.type === 'concern');
    if (concerns.length > 0) {
      recommendations.push({
        type: 'action',
        message: '📞 Schedule meeting with teacher/administrator',
        priority: 'high'
      });
    }
    
    const positives = insights.filter(i => i.type === 'positive');
    if (positives.length > 0) {
      recommendations.push({
        type: 'encouragement',
        message: '🎉 Continue current support and encouragement',
        priority: 'medium'
      });
    }
    
    // Based on intent
    if (analysis.intent.category === 'academic_inquiry') {
      recommendations.push({
        type: 'information',
        message: '📚 Request detailed academic report',
        priority: 'medium'
      });
    }
    
  } catch (error) {
    console.error('[AI] Recommendations generation error:', error);
  }
  
  return recommendations;
}

/**
 * Format insights for Telegram display
 */
function formatInsightsForTelegram(insights, recommendations) {
  let message = '🤖 **AI-Powered Student Insights**\n\n';
  
  if (insights.length === 0) {
    message += '📊 No insights available at this time.\n';
    message += 'Please ensure student data is up to date.';
    return message;
  }
  
  // Group insights by type
  const positiveInsights = insights.filter(i => i.type === 'positive');
  const concernInsights = insights.filter(i => i.type === 'concern');
  const neutralInsights = insights.filter(i => i.type === 'neutral');
  
  if (positiveInsights.length > 0) {
    message += '🌟 **Positive Highlights:**\n';
    positiveInsights.forEach(insight => {
      message += `• ${insight.message}\n`;
    });
    message += '\n';
  }
  
  if (concernInsights.length > 0) {
    message += '⚠️ **Areas for Attention:**\n';
    concernInsights.forEach(insight => {
      message += `• ${insight.message}\n`;
    });
    message += '\n';
  }
  
  if (neutralInsights.length > 0) {
    message += '📊 **General Updates:**\n';
    neutralInsights.forEach(insight => {
      message += `• ${insight.message}\n`;
    });
    message += '\n';
  }
  
  if (recommendations.length > 0) {
    message += '💡 **Recommendations:**\n';
    recommendations.forEach(rec => {
      const priority = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
      message += `${priority} ${rec.message}\n`;
    });
  }
  
  return message;
}

/**
 * Smart response generation based on user input
 */
function generateSmartResponse(userInput, studentData, context = {}) {
  const analysis = analyzeText(userInput);
  let response = '';
  
  try {
    // Handle different intents
    switch (analysis.intent.category) {
      case 'academic_inquiry':
        response = generateAcademicResponse(studentData, analysis);
        break;
      case 'attendance_inquiry':
        response = generateAttendanceResponse(studentData, analysis);
        break;
      case 'financial_inquiry':
        response = generateFinancialResponse(studentData, analysis);
        break;
      case 'communication_request':
        response = generateCommunicationResponse(analysis);
        break;
      default:
        response = generateGeneralResponse(analysis, context);
    }
    
    // Add sentiment-aware closing
    if (analysis.sentiment.score < -1) {
      response += '\n\n💬 I understand your concerns. Please don\'t hesitate to reach out for support.';
    } else if (analysis.sentiment.score > 1) {
      response += '\n\n😊 Great to hear your positive feedback!';
    }
    
  } catch (error) {
    console.error('[AI] Smart response generation error:', error);
    response = 'I\'m here to help! Please let me know how I can assist you with your child\'s school information.';
  }
  
  return response;
}

function generateAcademicResponse(studentData, analysis) {
  return `📚 **Academic Information**\n\nI can help you with:\n• Recent exam results\n• Subject performance\n• Grade trends\n• Academic recommendations\n\nUse the menu to access detailed academic reports.`;
}

function generateAttendanceResponse(studentData, analysis) {
  return `📅 **Attendance Information**\n\nI can show you:\n• Recent attendance records\n• Attendance patterns\n• Absence notifications\n• Attendance insights\n\nUse the "Attendance" button for detailed records.`;
}

function generateFinancialResponse(studentData, analysis) {
  return `💰 **Financial Information**\n\nI can help with:\n• Fee balances\n• Payment history\n• Outstanding amounts\n• Payment reminders\n\nUse the "My Fees" button for financial details.`;
}

function generateCommunicationResponse(analysis) {
  return `💬 **Communication Options**\n\nI can help you:\n• Talk to your child's teacher\n• Contact school administration\n• Schedule meetings\n• Send messages\n\nUse the communication buttons in the menu.`;
}

function generateGeneralResponse(analysis, context) {
  return `🤖 **How can I help?**\n\nI can assist you with:\n• Student academic information\n• Attendance records\n• Fee balances\n• Communication with teachers\n• School events\n\nPlease use the menu buttons or ask me specific questions!`;
}

module.exports = {
  analyzeText,
  generateStudentInsights,
  generateRecommendations,
  formatInsightsForTelegram,
  generateSmartResponse,
  initializeClassifiers
};
