import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Copy,
  Check,
  Send,
  MessageSquare,
  ExternalLink,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('sending');
    setErrorMessage('');

    try {
      const accessKey =
        (typeof import.meta !== 'undefined' && import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY) ||
        '50983918-2ffd-4973-bdd4-86c786f66c79';

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Message from ${formData.name}`,
          message: formData.message,
          from_name: `${formData.name} (Portfolio Inquiry)`,
        }),
      });

      if (!response.ok) {
        console.error('Web3Forms fetch error:', response.status, response.statusText);
      }

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Web3Forms API rejected submission:', result);
        setFormStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Web3Forms network/submission error:', err);
      setFormStatus('error');
      setErrorMessage('Network error occurred while submitting message. Please try again or reach out directly.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 scroll-mt-20 relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/50 border border-cyan-300 dark:border-cyan-800/50 text-cyan-700 dark:text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
            Have an open software engineering role, backend collaboration, or technical inquiry? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 backdrop-blur-xl shadow-lg shadow-zinc-200/50 dark:shadow-xl hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  <span>Primary Email</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800/50 px-2 py-0.5 rounded">
                  Fastest
                </span>
              </div>
              <p className="text-sm font-semibold font-mono text-zinc-900 dark:text-zinc-100 select-all mb-3 bg-zinc-50 dark:bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {PERSONAL_INFO.email}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-750 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Compose Mail</span>
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 backdrop-blur-xl shadow-lg shadow-zinc-200/50 dark:shadow-xl hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  <span>Phone Contact</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                  Direct Line
                </span>
              </div>
              <p className="text-sm font-semibold font-mono text-zinc-900 dark:text-zinc-100 select-all mb-3 bg-zinc-50 dark:bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                {PERSONAL_INFO.phone}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-750 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 transition-colors"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-zinc-800 dark:text-white bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Direct</span>
                </a>
              </div>
            </div>

            {/* Address & LinkedIn Card */}
            <div className="bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-5 backdrop-blur-xl shadow-lg shadow-zinc-200/50 dark:shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Location
                  </span>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {PERSONAL_INFO.address}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    LinkedIn Network
                  </span>
                </div>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800/50 hover:bg-cyan-200 dark:hover:bg-cyan-900/70 transition-colors"
                >
                  <span>linkedin.com/in/alexyadao</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    GitHub Profile
                  </span>
                </div>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-300 dark:border-indigo-800/50 hover:bg-indigo-200 dark:hover:bg-indigo-900/70 transition-colors"
                >
                  <span>github.com/alexyadao</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Instagram Profile
                  </span>
                </div>
                <a
                  href="https://instagram.com/itz.xandrel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-950/60 border border-pink-300 dark:border-pink-800/50 hover:bg-pink-200 dark:hover:bg-pink-900/70 transition-colors"
                >
                  <span>instagram.com/itz.xandrel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Spatial Message Portal */}
          <div className="lg:col-span-7 bg-white/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 backdrop-blur-xl shadow-lg shadow-zinc-200/50 dark:shadow-xl">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Send a Direct Message
              </h3>
            </div>

            {formStatus === 'success' ? (
              <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Message Transmitted!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Alexander Christian R. Yadao. Your inquiry will receive a prompt reply at your email address.
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="mt-3 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700/50 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/70 transition-colors"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 dark:text-zinc-400 font-medium mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-600 dark:text-zinc-400 font-medium mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@organization.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 dark:text-zinc-400 font-medium mb-1.5">
                    Subject / Project Context
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Software Engineering Opportunity / Backend Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 dark:text-zinc-400 font-medium mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe your engineering role, project, or collaboration details..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>

                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{errorMessage || 'Failed to send message. Please try again or reach out directly via email.'}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    Direct notification to Alexander
                  </span>

                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
