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
          Request an installation appointment for your QRS Player Piano System. We'll contact you to confirm details and schedule your piano pickup.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md border border-border p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label htmlFor="pianoType" className="block text-sm font-medium mb-1">
              Piano Type
            </label>
            <select
              id="pianoType"
              name="pianoType"
              value={formData.pianoType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select your piano type</option>
              <option value="Grand">Grand Piano</option>
              <option value="Baby Grand">Baby Grand Piano</option>
              <option value="Upright">Upright Piano</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium mb-1">
              Preferred Pickup Date
            </label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Please share any additional details about your piano or installation needs..."
          />
        </div>

        <input name="form_name" type="hidden" value={formData.form_name} />
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-lg"
        >
          {isSubmitting ? "Submitting..." : "Schedule Installation"}
        </Button>

        {submitStatus === "success" && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Thank you for your request! We'll contact you shortly to confirm your installation details.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            There was an error submitting the form. Please try again or contact us directly.
          </div>
        )}
      </form>
    </div>
  );
}