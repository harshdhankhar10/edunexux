"use client"

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge"; // Make sure this import is correct
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Check, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";


const assessmentSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  dueDate: z.date({
    required_error: "A date of birth is required.",
  }),
  type: z.string({
    required_error: "Please select an assessment type.",
  }),
  questions: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(5, {
        message: "Question must be at least 5 characters.",
      }),
      options: z.array(
        z.object({
          id: z.string(),
          text: z.string().min(2, {
            message: "Option must be at least 2 characters.",
          }),
          isCorrect: z.boolean().default(false),
        })
      ),
    })
  ),
});

type AssessmentValues = z.infer<typeof assessmentSchema>;

const AssessmentForm = () => {
  const [questions, setQuestions] = useState([
    {
      id: "1",
      text: "What is the capital of France?",
      options: [
        { id: "1", text: "London", isCorrect: false },
        { id: "2", text: "Paris", isCorrect: true },
        { id: "3", text: "Berlin", isCorrect: false },
      ],
    },
  ]);

  const form = useForm<AssessmentValues>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      type: "",
      questions: questions,
    },
  });

  function onSubmit(values: AssessmentValues) {
    toast("Assessment created successfully.");
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: String(questions.length + 1),
        text: "",
        options: [
          { id: "1", text: "", isCorrect: false },
          { id: "2", text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const updateQuestionText = (id: string, text: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, text } : question
      )
    );
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [
                ...question.options,
                { id: String(question.options.length + 1), text: "", isCorrect: false },
              ],
            }
          : question
      )
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter((option) => option.id !== optionId),
            }
          : question
      )
    );
  };

  const updateOptionText = (questionId: string, optionId: string, text: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId ? { ...option, text } : option
              ),
            }
          : question
      )
    );
  };

  const toggleCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId ? { ...option, isCorrect: !option.isCorrect } : option
              ),
            }
          : question
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Assessment</CardTitle>
        <CardDescription>
          Create a new assessment for your students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Assessment Title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the title of the assessment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="quiz">Quiz</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is the type of the assessment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Assessment Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a brief description of the assessment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2023-01-01")
                      }
                      initialFocus
                    />
                  </FormControl>
                  <FormDescription>
                    Please select the due date for this assessment.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Tabs defaultValue="questions" className="w-full">
              <TabsList>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="questions">
                <div className="space-y-4">
                  {questions.map((question) => (
                    <Card key={question.id}>
                      <CardHeader>
                        <CardTitle>Question {question.id}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center space-x-2">
                            Edit question {question.id}'s details.
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => removeQuestion(question.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <FormItem>
                          <FormLabel>Question Text</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Question Text"
                              value={question.text}
                              onChange={(e) =>
                                updateQuestionText(question.id, e.target.value)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        <div className="space-y-2">
                          {question.options.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2">
                              <Input
                                placeholder="Option Text"
                                value={option.text}
                                onChange={(e) =>
                                  updateOptionText(question.id, option.id, e.target.value)
                                }
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => toggleCorrectOption(question.id, option.id)}
                              >
                                {option.isCorrect ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <></>
                                )}
                              </Button>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => removeOption(question.id, option.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => addOption(question.id)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Option
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="secondary" onClick={addQuestion}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div>Settings Content</div>
              </TabsContent>
            </Tabs>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Badge variant="outline">Mandatory</Badge>
      </CardFooter>
    </Card>
  );
};

export default AssessmentForm;
