export default function Contact() {
  return (
    <section className="bg-secondary/30 relative px-6 py-20 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        {/* Glassmorphic Contact Form */}
        <div className="border-line rounded-2xl border bg-white/60 p-8 shadow-lg backdrop-blur-lg md:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-primary mb-2 text-4xl font-bold">
              Contact Birchip
            </h2>
            <p className="text-muted text-lg">
              Reach out with any questions or booking inquiries. We're happy to
              help!
            </p>
          </div>
          <form className="space-y-6">
            <div>
              <label className="text-text mb-1 block font-medium">Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="border-line focus:ring-primary text-text w-full rounded-lg border bg-white/70 px-4 py-3 focus:ring-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-text mb-1 block font-medium">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="border-line focus:ring-primary text-text w-full rounded-lg border bg-white/70 px-4 py-3 focus:ring-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-text mb-1 block font-medium">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Type your message..."
                className="border-line focus:ring-primary text-text w-full resize-none rounded-lg border bg-white/70 px-4 py-3 focus:ring-2 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-button w-full rounded-full py-3 font-semibold text-white shadow transition-all duration-200 hover:bg-[#a23753]"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Address + Map Section */}
        <div className="flex flex-col justify-between gap-6">
          <div className="border-line rounded-2xl border bg-white/60 p-6 shadow-md backdrop-blur-lg">
            <h3 className="text-primary mb-2 text-2xl font-bold">Birchip HQ</h3>
            <p className="text-muted mb-1">123 Rural Road</p>
            <p className="text-muted mb-1">Birchip, Victoria 3483</p>
            <p className="text-muted mb-1">Australia</p>
            <p className="text-muted mt-4">Phone: +61 3 9123 4567</p>
            <p className="text-muted">Email: contact@birchip.com.au</p>
          </div>

          <div className="border-line overflow-hidden rounded-2xl border shadow-md">
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
