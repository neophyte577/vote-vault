import { useState } from "react";
import { RevealOnScroll } from "../animations/RevealOnScroll";
import emailjs from "emailjs-com";
import { InteractiveHoverButton } from "../animations/InteractiveHoverButton";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then((result) => {
        alert("Message Sent!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert("Oops! Something went wrong. Please try again."));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="w-full max-w-md px-6 sm:px-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r text-paleHoney bg-clip-text text-center">
            {" "}
            Questions? Concerns? Compliments?
          </h2>
          <h3 className="text-2xl font-bold  bg-gradient-to-r text-paleHoney bg-clip-text text-center">
            We'd love to hear from you.
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="relative mt-5">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-paleHoney focus:bg-blue-500/5"
                placeholder="Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="relative mt-5">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-paleHoney focus:bg-blue-500/5"
                placeholder="example@gmail.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative mt-5">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-paleHoney focus:bg-blue-500/5"
                placeholder="Your Message..."
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
            <div className="flex justify-center mt-3">
              <InteractiveHoverButton
                type="submit"
                className="w-auto min-w-30 max-w-30 text-md bg-paleHoney text-black py-3 px-6 rounded font-medium transition-colors duration-250 relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)] hover:bg-black hover:text-paleHoney active:bg-paleHoney"
              >
                Submit
              </InteractiveHoverButton>
            </div>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};
