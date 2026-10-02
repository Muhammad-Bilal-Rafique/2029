'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { RSVPFormData, validateRSVP, RSVPValidationErrors } from '@/lib/validation';
import { CheckCircle2, AlertCircle, Info, Send, UserCheck, ShieldCheck } from 'lucide-react';

export const RSVPSection: React.FC = () => {
  const { rsvp, events } = weddingConfig;

  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    guestCount: 1,
    attendingMehndi: true,
    attendingBaraat: true,
    attendingWalima: true,
    isDeclining: false,
    message: '',
  });

  const [errors, setErrors] = useState<RSVPValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewResult, setPreviewResult] = useState<RSVPFormData | null>(null);
  const [submittedLive, setSubmittedLive] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleDeclineToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      isDeclining: checked,
      attendingMehndi: checked ? false : prev.attendingMehndi,
      attendingBaraat: checked ? false : prev.attendingBaraat,
      attendingWalima: checked ? false : prev.attendingWalima,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    const validation = validateRSVP(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // If destination is configured, submit to live endpoint
    if (rsvp.isConfigured && rsvp.endpointUrl) {
      try {
        const response = await fetch(rsvp.endpointUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmittedLive(true);
        } else {
          setSubmissionError(
            'Unable to submit RSVP. Please try again or contact the couple directly.'
          );
        }
      } catch {
        setSubmissionError(
          'Network connection error. Please contact the couple directly.'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Honest preview mode: show demo modal explaining preview state
      setTimeout(() => {
        setIsSubmitting(false);
        setPreviewResult({ ...formData });
      }, 400);
    }
  };

  return (
    <section
      id="rsvp"
      aria-label="RSVP Form"
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-8 bg-ivory relative"
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          eyebrow="Response Requested"
          title={rsvp.heading}
          subtitle={rsvp.subtitle}
          dividerVariant="arch"
        />

        {/* Honest Configuration / Preview Badge */}
        {!rsvp.isConfigured && (
          <div className="mb-8 p-4 rounded-md border border-amber-400/60 bg-amber-50/80 text-amber-900 text-xs sm:text-sm flex items-start space-x-3">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold block uppercase tracking-wider text-[11px] text-amber-800">
                Notice: RSVP Preview Mode
              </span>
              <p className="font-light">
                {rsvp.previewNotice}
              </p>
              <p className="text-[11px] text-amber-700/80 pt-1">
                Preferred Direct RSVP: {rsvp.contactPlaceholder}
              </p>
            </div>
          </div>
        )}

        {/* Live Submission Confirmation */}
        {submittedLive ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-lg bg-green-50 border border-green-300 text-center space-y-3"
          >
            <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto" />
            <h3 className="font-serif text-2xl text-green-900">
              Thank You for Your Response
            </h3>
            <p className="text-sm text-green-800 max-w-md mx-auto">
              Your RSVP has been submitted successfully to the wedding registry. We eagerly anticipate celebrating with you!
            </p>
          </motion.div>
        ) : (
          /* RSVP Form */
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="relative rounded-lg paper-card bg-ivory-light border border-gold/40 p-6 sm:p-10 shadow-md space-y-6"
          >
            {/* Guest Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs uppercase tracking-wider text-burgundy font-semibold mb-2"
              >
                Full Name <span className="text-rose-dark">*</span>
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="e.g. Dr. Salman &amp; Family"
                className={`w-full px-4 py-3 rounded-sm bg-ivory border ${
                  errors.fullName ? 'border-red-500' : 'border-gold/40'
                } text-plum focus:border-gold focus:ring-1 focus:ring-gold text-sm transition-colors`}
                aria-required="true"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1.5 text-xs text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Guest Count */}
            <div>
              <label
                htmlFor="guestCount"
                className="block text-xs uppercase tracking-wider text-burgundy font-semibold mb-2"
              >
                Number of Guests Attending <span className="text-rose-dark">*</span>
              </label>
              <select
                id="guestCount"
                value={formData.guestCount}
                disabled={formData.isDeclining}
                onChange={(e) =>
                  setFormData({ ...formData, guestCount: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-sm bg-ivory border border-gold/40 text-plum focus:border-gold focus:ring-1 focus:ring-gold text-sm disabled:opacity-50 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            {/* Events Attendance Checkboxes */}
            <div className="pt-2">
              <fieldset aria-describedby={errors.events ? 'events-error' : undefined}>
                <legend className="block text-xs uppercase tracking-wider text-burgundy font-semibold mb-3">
                  Events You Will Attend <span className="text-rose-dark">*</span>
                </legend>

                <div className="space-y-3">
                  {/* Mehndi */}
                  <label className="flex items-center space-x-3 p-3 rounded bg-ivory border border-gold/30 hover:border-gold cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.attendingMehndi}
                      disabled={formData.isDeclining}
                      onChange={(e) => {
                        setFormData({ ...formData, attendingMehndi: e.target.checked });
                        if (errors.events) setErrors({ ...errors, events: undefined });
                      }}
                      className="w-4 h-4 text-gold-dark rounded border-gold/60 focus:ring-gold"
                    />
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium text-burgundy">Mehndi</span>
                      <span className="text-plum/70 ml-2">({events[0].displayDate})</span>
                    </div>
                  </label>

                  {/* Baraat */}
                  <label className="flex items-center space-x-3 p-3 rounded bg-ivory border border-gold/30 hover:border-gold cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.attendingBaraat}
                      disabled={formData.isDeclining}
                      onChange={(e) => {
                        setFormData({ ...formData, attendingBaraat: e.target.checked });
                        if (errors.events) setErrors({ ...errors, events: undefined });
                      }}
                      className="w-4 h-4 text-gold-dark rounded border-gold/60 focus:ring-gold"
                    />
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium text-burgundy">Baraat</span>
                      <span className="text-plum/70 ml-2">({events[1].displayDate} · Karachi)</span>
                    </div>
                  </label>

                  {/* Walima */}
                  <label className="flex items-center space-x-3 p-3 rounded bg-ivory border border-gold/30 hover:border-gold cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.attendingWalima}
                      disabled={formData.isDeclining}
                      onChange={(e) => {
                        setFormData({ ...formData, attendingWalima: e.target.checked });
                        if (errors.events) setErrors({ ...errors, events: undefined });
                      }}
                      className="w-4 h-4 text-gold-dark rounded border-gold/60 focus:ring-gold"
                    />
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium text-burgundy">Walima</span>
                      <span className="text-plum/70 ml-2">({events[2].displayDate})</span>
                    </div>
                  </label>

                  {/* Regretfully Decline */}
                  <label className="flex items-center space-x-3 p-3 rounded bg-rose-50/50 border border-rose-300/60 hover:border-rose-400 cursor-pointer transition-colors mt-2">
                    <input
                      type="checkbox"
                      checked={formData.isDeclining}
                      onChange={handleDeclineToggle}
                      className="w-4 h-4 text-rose-800 rounded border-rose-400 focus:ring-rose-800"
                    />
                    <div className="text-xs sm:text-sm">
                      <span className="font-medium text-rose-950">Regretfully Decline</span>
                      <span className="text-rose-900/70 ml-2">(Unable to attend celebrations)</span>
                    </div>
                  </label>
                </div>

                {errors.events && (
                  <p id="events-error" className="mt-2 text-xs text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.events}</span>
                  </p>
                )}
              </fieldset>
            </div>

            {/* Optional Personal Note / Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs uppercase tracking-wider text-burgundy font-semibold mb-2"
              >
                Warm Wishes or Special Notes <span className="text-plum/50 font-normal">(Optional)</span>
              </label>
              <textarea
                id="message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your prayers or blessings for Bilal &amp; Maria..."
                maxLength={500}
                className="w-full px-4 py-3 rounded-sm bg-ivory border border-gold/40 text-plum focus:border-gold focus:ring-1 focus:ring-gold text-sm transition-colors"
              />
              <span className="text-[10px] text-plum/50 tracking-wider">
                {formData.message.length}/500 characters
              </span>
            </div>

            {submissionError && (
              <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
                {submissionError}
              </div>
            )}

            {/* Privacy note */}
            <div className="flex items-center space-x-2 text-[11px] text-plum/60 border-t border-gold/20 pt-4">
              <ShieldCheck className="w-4 h-4 text-gold-dark shrink-0" />
              <span>
                Your response is confidential and will only be shared with the couple and their immediate families.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={isSubmitting}
                icon={<Send className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {isSubmitting
                  ? 'Verifying...'
                  : rsvp.isConfigured
                  ? 'Submit RSVP'
                  : 'Test RSVP Form (Preview)'}
              </Button>
            </div>
          </motion.form>
        )}

        {/* Demo Mode Result Modal */}
        <AnimatePresence>
          {previewResult && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="preview-modal-title"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-ivory rounded-lg max-w-md w-full p-6 sm:p-8 border-2 border-gold/60 shadow-2xl relative"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center mx-auto mb-4 text-amber-800">
                  <UserCheck className="w-6 h-6" />
                </div>

                <h3
                  id="preview-modal-title"
                  className="font-serif text-2xl text-burgundy text-center font-normal"
                >
                  RSVP Preview Validation
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-plum/80 text-center leading-relaxed font-light">
                  Form validation was successful! Below is the preview of the payload:
                </p>

                <div className="my-4 p-4 rounded bg-champagne-light border border-gold/30 text-xs space-y-1.5 font-sans">
                  <div>
                    <span className="font-semibold text-burgundy">Guest Name:</span>{' '}
                    {previewResult.fullName}
                  </div>
                  <div>
                    <span className="font-semibold text-burgundy">Status:</span>{' '}
                    {previewResult.isDeclining ? 'Regretfully Declining' : 'Attending'}
                  </div>
                  {!previewResult.isDeclining && (
                    <>
                      <div>
                        <span className="font-semibold text-burgundy">Guests:</span>{' '}
                        {previewResult.guestCount}
                      </div>
                      <div>
                        <span className="font-semibold text-burgundy">Attending:</span>{' '}
                        {[
                          previewResult.attendingMehndi && 'Mehndi',
                          previewResult.attendingBaraat && 'Baraat',
                          previewResult.attendingWalima && 'Walima',
                        ]
                          .filter(Boolean)
                          .join(', ')}
                      </div>
                    </>
                  )}
                  {previewResult.message && (
                    <div>
                      <span className="font-semibold text-burgundy">Message:</span>{' '}
                      “{previewResult.message}”
                    </div>
                  )}
                </div>

                <div className="p-3 bg-amber-50 rounded border border-amber-200 text-[11px] text-amber-900 leading-tight">
                  <span className="font-semibold block mb-0.5">Honest Developer Note:</span>
                  Because no backend destination has been configured in <code>config/wedding.ts</code>, this data was not transmitted anywhere. Update the endpoint to enable live submissions.
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setPreviewResult(null)}
                  >
                    Close Preview
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
