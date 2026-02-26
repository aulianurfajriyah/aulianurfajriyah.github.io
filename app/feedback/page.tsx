"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Loader2, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

const formSchema = z.object({
  name: z.string().optional(),
  role: z.string().min(1, "Please select your role/relationship."),
  rating: z.string().min(1, "Please provide a rating."),
  strength: z.string().min(2, "Please share what went well."),
  improvement: z.string().min(2, "Please share what can be improved."),
});

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      rating: "",
      strength: "",
      improvement: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedback"), {
        ...values,
        createdAt: new Date(),
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(
        "Failed to submit feedback. Please check your internet connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-background relative overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 p-4">
        <ModeToggle />
      </div>

      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-2xl mx-auto w-full space-y-8 relative z-10 flex-grow flex flex-col justify-center">
        <Button
          variant="ghost"
          className="w-fit pl-0 hover:bg-transparent hover:text-primary mb-6"
          asChild
        >
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-base font-medium">Back to Profile</span>
          </Link>
        </Button>

        {submitted ? (
          <Card className="glass-card border-primary/20 animate-fade-in-up">
            <CardHeader className="text-center py-16">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-primary/30">
                <Star className="w-10 h-10 text-white fill-white animate-pulse" />
              </div>
              <CardTitle className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
                Thank You!
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-sm mx-auto">
                Your feedback means the world to me. I'll read it carefully to
                improve my work.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-12">
              <Link href="/">
                <Button variant="outline" className="rounded-full px-8">
                  Return Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass-card overflow-hidden animate-fade-in-up">
            <div className="h-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
            <CardHeader className="pb-8">
              <CardTitle className="text-3xl font-bold text-center">
                Performance Feedback
              </CardTitle>
              <CardDescription className="text-center text-lg">
                Your honest feedback helps me grow as a professional.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="bg-background/50 h-12"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-background/50 h-12">
                                <SelectValue placeholder="How do you know me?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Boss">
                                Boss / Supervisor
                              </SelectItem>
                              <SelectItem value="Partner">
                                Partner / Colleague
                              </SelectItem>
                              <SelectItem value="Client">Client</SelectItem>
                              <SelectItem value="Mentor">Mentor</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem className="text-center py-4 bg-primary/5 rounded-xl border border-primary/5">
                        <FormLabel className="text-lg font-semibold text-primary">
                          How would you rate my performance?
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-center space-x-2 pt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className={cn(
                                  "p-2 transition-all hover:scale-125 focus:outline-none",
                                  star <= ratingValue
                                    ? "text-yellow-400 drop-shadow-md"
                                    : "text-muted-foreground/20"
                                )}
                                onClick={() => {
                                  setRatingValue(star);
                                  field.onChange(star.toString());
                                }}
                              >
                                <Star
                                  className={cn(
                                    "w-10 h-10",
                                    star <= ratingValue && "fill-current"
                                  )}
                                />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="strength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />{" "}
                            What am I doing well?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="e.g., Technical skills, Communication, Leadership..."
                              className="min-h-[120px] bg-background/50 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="improvement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500" />{" "}
                            What can I improve?
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Constructive feedback is very welcome..."
                              className="min-h-[120px] bg-background/50 resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg h-14 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Saving feedback...
                      </>
                    ) : (
                      <>
                        Submit Feedback <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
