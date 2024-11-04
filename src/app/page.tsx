'use client'

import {ChangeEvent, useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import ThreeBackground from "@/components/ThreeBackground";


type Question = {
  question: string;
  scale: string;
  example?: string;
};

const questions: Question[] = [
  { question: "How clearly are the course outcomes defined and communicated to you?",
    scale: "(1 = very unclear, 10 = extremely clear)",
    example: "You are a first-year engineering student. At the start of your course, you receive a list of outcomes but feel unsure about what each outcome really means in practice. You wonder if each outcome will be addressed in assignments or exams."
  },
  { question: "How relevant do you find the course outcomes to your career or academic goals?",
    scale: "(1 = very low relevance, 10 = extremely relevant)",
    example: "You want to pursue a career in data science and are enrolled in a mathematics course. You hope that the course outcomes will cover skills you need for data analysis, such as statistics and probability.  "
  },
  { question: "How practical and achievable do you think the course outcomes are within the course duration?",
    scale: "(1 = very difficult, 10 = easily achievable)",
    example: "You balance your studies with a part-time job and are concerned about whether you’ll be able to meet all the course outcomes given your time constraints. Some outcomes feel very ambitious for a single semester"
  },
  { question: "How well do the course outcomes align with current industry or academic standards?",
    scale: "(1 = not aligned, 10 = fully aligned)",
    example: "As a computer science student, you notice that many job listings ask for knowledge in current programming languages, but your course outcomes focus more on older programming techniques. "
  },
  { question: "How impactful do you think achieving the course outcomes will be for your skill development?",
    scale: "(1 = little impact, 10 = highly impactful)",
    example: "You are aiming to gain practical skills that you can use in internships. You wonder if meeting the course outcomes will help you develop real-world skills you can apply right away. "
  },
  { question: "How well do you feel the program outcomes prepare you for your career path or further education?",
    scale: "(1 = minimal preparation, 10 = excellent preparation)",
    example: "You are a final-year engineering student applying for jobs. You hope that your program outcomes have given you the core engineering skills needed for entry-level positions."
  },
  { question: "How valuable do you find the program outcomes in building transferable skills?",
    scale: "(1 = low value, 10 = high value)",
    example: "As a business student, you are interested in learning communication and teamwork skills that are useful across many industries, not just in business.  "
  },
  { question: "To what extent do you feel program outcomes are consistently reinforced across various courses in the program?",
    scale: "(1 = low consistency, 10 = high consistency)",
    example: "You notice that in some courses, the outcomes seem to overlap and build on one another, but in others, they feel disconnected from the overall program goals."
  },
  { question: "How relevant do you think the program outcomes are to evolving industry demands or research trends?",
    scale: "(1 = outdated, 10 = highly relevant)",
    example: "You are studying environmental science and see growing opportunities in renewable energy. You wonder if your program outcomes will make you competitive in this field."
  },
  { question: "How likely are you to achieve the program outcomes upon completion of all required courses?",
    scale: "(1 = unlikely, 10 = highly likely)",
    example: "You are finishing your studies in social work and feel that the program outcomes have been covered well throughout, giving you confidence that you’re ready to apply them in your career."
  },
];


export default function Home() {
  const [responses, setResponses] = useState<Record<number, number | undefined>>({});

  const handleSliderChange = (index: number, value: number) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [index]: value,
    }));
  };

  const handleSubmit = () => {
    alert("Thank you for completing the questionnaire!");
    console.log(responses);
    setResponses({});
  };


  return (
      <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden bg-gray-50">
        <ThreeBackground />
        <Card className="w-full max-w-5xl h-full p-8 bg-gray-50 shadow-2xl rounded-lg flex flex-col relative z-10">
          <CardHeader className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-700">Course and Program Outcomes Evaluation</h2>
            <p className="text-md text-gray-600">Your feedback is important! Please rate each question on a scale of 1
              to 10.</p>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((q, index) => (
                <div
                    key={index}
                    className="flex flex-col space-y-3 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm transition-shadow duration-300 ease-in-out"
                >
                  <h3 className="text-md font-semibold text-gray-800">{index + 1}. {q.question}</h3>
                  <p className="text-sm text-gray-600">{q.scale}</p>
                  {q.example && <p className="text-xs italic text-gray-500">Example: {q.example}</p>}
                  <div className="flex items-center mt-2 space-x-3">
                    <span className="text-xs text-gray-500">1</span>
                    <Input
                        type="range"
                        min="1"
                        max="10"
                        value={responses[index] || 5}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleSliderChange(index, Number(e.target.value))
                        }
                        className="flex-grow h-2 rounded-full bg-gray-300 accent-gray-500 hover:accent-gray-600 transition duration-150 ease-in-out"
                    />
                    <span className="text-xs text-gray-500">10</span>
                  </div>
                  <p className="text-center text-xs text-gray-600">Your rating: {responses[index] || 5}</p>
                </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-center pt-8">
            <Button
                onClick={handleSubmit}
                className="px-6 py-2 text-md font-medium text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
            >
              Submit Your Feedback
            </Button>
          </CardFooter>
        </Card>
      </div>
  );
}