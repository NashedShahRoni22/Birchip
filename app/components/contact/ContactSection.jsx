export default function ContactPage() {
  return (
    <section className="relative py-20 px-6 bg-secondary/30 backdrop-blur-md">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Glassmorphic Contact Form */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-line p-8 md:p-10 shadow-xl">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-primary mb-2">Contact Birchip</h2>
            <p className="text-muted text-lg">
              Reach out with any questions or booking inquiries. We're happy to help!
            </p>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-text font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-lg border border-line bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
            <div>
              <label className="block text-text font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg border border-line bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary text-text"
              />
            </div>
            <div>
              <label className="block text-text font-medium mb-1">Message</label>
              <textarea
                rows={5}
                placeholder="Type your message..."
                className="w-full px-4 py-3 rounded-lg border border-line bg-white/70 focus:outline-none focus:ring-2 focus:ring-primary text-text resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-button hover:bg-[#a23753] text-white font-semibold py-3 rounded-full transition-all duration-200 shadow"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Address + Map Section */}
        <div className="flex flex-col justify-between gap-6">
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-line p-6 shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-2">Birchip HQ</h3>
            <p className="text-muted mb-1">123 Rural Road</p>
            <p className="text-muted mb-1">Birchip, Victoria 3483</p>
            <p className="text-muted mb-1">Australia</p>
            <p className="text-muted mt-4">Phone: +61 3 9123 4567</p>
            <p className="text-muted">Email: contact@birchip.com.au</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-line shadow-md">
            <iframe
              src="https://www.google.com/maps?q=Birchip,+Victoria,+Australia&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
