'use client'

import {ChangeEvent, useState} from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


type Question = {
  question: string;
  scale: string;
};

const questions: Question[] = [
  { question: "How clearly are the course outcomes defined and communicated to you?", scale: "(1 = very unclear, 10 = extremely clear)" },
  { question: "How relevant do you find the course outcomes to your career or academic goals?", scale: "(1 = very low relevance, 10 = extremely relevant)" },
  { question: "How practical and achievable do you think the course outcomes are within the course duration?", scale: "(1 = very difficult, 10 = easily achievable)" },
  { question: "How well do the course outcomes align with current industry or academic standards?", scale: "(1 = not aligned, 10 = fully aligned)" },
  { question: "How impactful do you think achieving the course outcomes will be for your skill development?", scale: "(1 = little impact, 10 = highly impactful)" },
  { question: "How well do you feel the program outcomes prepare you for your career path or further education?", scale: "(1 = minimal preparation, 10 = excellent preparation)" },
  { question: "How valuable do you find the program outcomes in building transferable skills?", scale: "(1 = low value, 10 = high value)" },
  { question: "To what extent do you feel program outcomes are consistently reinforced across various courses in the program?", scale: "(1 = low consistency, 10 = high consistency)" },
  { question: "How relevant do you think the program outcomes are to evolving industry demands or research trends?", scale: "(1 = outdated, 10 = highly relevant)" },
  { question: "How likely are you to achieve the program outcomes upon completion of all required courses?", scale: "(1 = unlikely, 10 = highly likely)" },
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-4xl p-6">
          <CardHeader className="text-center">
            <h5 className="font-bold">Course and Program Outcomes Evaluation</h5>
          </CardHeader>
          <CardContent>
            {questions.map((q, index) => (
                <div key={index} className="my-8">
                  <h3 className="mb-2">{q.question}</h3>
                  <h4 className="text-gray-500">{q.scale}</h4>
                  <div className="flex items-center mt-4">
                    <h5 className="mr-4">1</h5>
                    <Input
                        type="range"
                        min="1"
                        max="10"
                        value={responses[index] || 5}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleSliderChange(index, Number(e.target.value))
                        }
                        className="flex-grow appearance-none h-2 rounded-full bg-gray-400"
                        style={{ accentColor: 'bg-gray-100' }}
                    />
                    <h5 className="ml-4">10</h5>
                  </div>
                  <h5 className="mt-1 text-center">Your rating: {responses[index] || 5}</h5>
                </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
  );
}