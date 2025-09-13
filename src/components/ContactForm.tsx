import React, { useState } from "react";
import { Button } from "./ui/button";

export default function ContactForm() {
  const defaultFormData = {
    name: "", 
    email: "", 
    phone: "",
    pianoType: "",
    preferredDate: "",
    message: "", 
    form_name: "Piano Installation Request"
  };
  
  const [formData, setFormData] = useState(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.new.website/api/submit-form/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData(defaultFormData);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="w-full max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Schedule Your Installation</h2>
        <p className="text-foreground/80">
          Request an installation appointment for your QRS Player Piano System
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-lg border border-border p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-foreground/90">
              Full Name <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground/90">
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1 text-foreground/90">
              Phone Number <span className="text-accent">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label htmlFor="pianoType" className="block text-sm font-medium mb-1 text-foreground/90">
              Piano Type
            </label>
            <select
              id="pianoType"
              name="pianoType"
              value={formData.pianoType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground"
            >
              <option value="">Select your piano type</option>
              <option value="Grand">Grand Piano</option>
              <option value="Baby Grand">Baby Grand Piano</option>
              <option value="Upright">Upright Piano</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium mb-1 text-foreground/90">
            Preferred Pickup Date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1 text-foreground/90">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-foreground"
            placeholder="Please share any details about your piano..."
          />
        </div>

        <input name="form_name" type="hidden" value={formData.form_name} />
        
        <Button
          type="submit"
          variant="accent"
          disabled={isSubmitting}
          className="w-full py-3"
        >
          {isSubmitting ? "Submitting..." : "Schedule Installation"}
        </Button>

        {submitStatus === "success" && (
          <div className="p-3 bg-background/50 border border-accent text-foreground rounded">
            Thank you for your request! We'll contact you shortly to confirm your installation details.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 bg-background/50 border border-destructive text-foreground rounded">
            There was an error submitting the form. Please try again or contact us directly.
          </div>
        )}
      </form>
    </div>
  );
}