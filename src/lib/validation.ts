export interface RSVPFormData {
  fullName: string;
  guestCount: number;
  attendingMehndi: boolean;
  attendingBaraat: boolean;
  attendingWalima: boolean;
  isDeclining: boolean;
  message: string;
  contactInfo?: string;
}

export interface RSVPValidationErrors {
  fullName?: string;
  events?: string;
  guestCount?: string;
  message?: string;
}

export function validateRSVP(data: RSVPFormData): {
  isValid: boolean;
  errors: RSVPValidationErrors;
} {
  const errors: RSVPValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  } else if (data.fullName.trim().length > 70) {
    errors.fullName = "Name is too long (maximum 70 characters).";
  }

  if (data.guestCount < 1 || data.guestCount > 10) {
    errors.guestCount = "Guest count must be between 1 and 10.";
  }

  if (
    !data.isDeclining &&
    !data.attendingMehndi &&
    !data.attendingBaraat &&
    !data.attendingWalima
  ) {
    errors.events = "Please select at least one event you will attend, or select 'Regretfully Decline'.";
  }

  if (data.message && data.message.length > 500) {
    errors.message = "Message must not exceed 500 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
